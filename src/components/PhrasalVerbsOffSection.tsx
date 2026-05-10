import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Volume2, 
  Sparkles, 
  RotateCcw,
  Flag,
  CheckCircle2,
  X,
  Gamepad2,
  Zap,
  Trophy,
  Target,
  Flame
} from 'lucide-react';
import { PhrasalVerbOff, PHRASAL_VERBS_OFF } from '../constants/phrasalVerbsOff';
import { PhrasalVerbsOffGuide } from './PhrasalVerbsOffGuide';
import { getAllFlags, setWordFlag, resetWordFlag, getPhrasalVerbOffRepetitions, incrementPhrasalVerbOffRepetition, clearAllPhrasalVerbOffPersistence, clearFlagsInRange } from '../services/dbService';

interface PhrasalVerbsOffSectionProps {
  onBack: () => void;
  speakText: (text: string) => void;
}

const PhrasalVerbsOffSection: React.FC<PhrasalVerbsOffSectionProps> = ({ onBack, speakText }) => {
  const [activeTab, setActiveTab] = useState<'STUDY' | 'PLAY' | 'GUIDE'>('GUIDE');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});
  const [repetitions, setRepetitions] = useState<Record<number, number>>({});
  const pageSize = 100;

  // Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'NONE' | 'CORRECT' | 'WRONG'>('NONE');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const allFlags = await getAllFlags();
        const flagMap: Record<number, number> = {};
        allFlags.forEach(f => {
          if (f.count > 0) flagMap[f.wordId] = f.count;
        });
        setFlags(flagMap);

        const repMap: Record<number, number> = {};
        for (const s of PHRASAL_VERBS_OFF) {
          const rep = await getPhrasalVerbOffRepetitions(s.id);
          if (rep > 0) repMap[s.id] = rep;
        }
        setRepetitions(repMap);
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    };
    loadStats();
  }, []);

  const filteredPhrasalVerbsOff = useMemo(() => {
    let base = PHRASAL_VERBS_OFF;
    if (showFlaggedOnly) {
      base = base.filter(s => (flags[s.id + 8000] || 0) > 0);
    }
    return base;
  }, [showFlaggedOnly, flags]);

  const totalPages = Math.ceil(filteredPhrasalVerbsOff.length / pageSize);
  const listPhrasalVerbsOff = useMemo(() => {
    return filteredPhrasalVerbsOff.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [filteredPhrasalVerbsOff, currentPage]);

  const selectedPhrasalVerbOff = selectedIndex !== null ? filteredPhrasalVerbsOff[selectedIndex] : null;

  const handleFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhrasalVerbOff) return;
    const wordId = selectedPhrasalVerbOff.id + 8000;
    const currentCount = flags[wordId] || 0;
    const newCount = currentCount >= 5 ? 0 : currentCount + 1;
    
    setFlags(prev => {
      const updated = { ...prev };
      if (newCount === 0) delete updated[wordId];
      else updated[wordId] = newCount;
      return updated;
    });

    try {
      await setWordFlag(wordId, newCount);
    } catch (err) {
      console.error("Failed to save flag:", err);
    }
  };

  const handleResetFlag = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhrasalVerbOff) return;
    const wordId = selectedPhrasalVerbOff.id + 8000;
    setFlags(prev => {
      const updated = { ...prev };
      delete updated[wordId];
      return updated;
    });
    try {
      await resetWordFlag(wordId);
    } catch (err) {
      console.error("Failed to reset flag:", err);
    }
  };

  const handlePlay = async (word: string, id: number) => {
    const cleanWord = word.replace(/[\/\(\)]/g, '');
    speakText(cleanWord);
    await incrementPhrasalVerbOffRepetition(id);
    const newCount = await getPhrasalVerbOffRepetitions(id);
    setRepetitions(prev => ({ ...prev, [id]: newCount }));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    const nextIdx = selectedIndex + 1;
    if (nextIdx < filteredPhrasalVerbsOff.length) {
      setSelectedIndex(nextIdx);
      handlePlay(filteredPhrasalVerbsOff[nextIdx].word, filteredPhrasalVerbsOff[nextIdx].id);
    } else {
      setSelectedIndex(null);
    }
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    const prevIdx = selectedIndex - 1;
    if (prevIdx >= 0) {
      setSelectedIndex(prevIdx);
      handlePlay(filteredPhrasalVerbsOff[prevIdx].word, filteredPhrasalVerbsOff[prevIdx].id);
    } else {
      setSelectedIndex(null);
    }
  };

  const questions = useMemo(() => {
    return [...PHRASAL_VERBS_OFF].sort(() => Math.random() - 0.5).slice(0, 10).map(s => {
      const options = [s.meaning];
      while (options.length < 4) {
        const randomS = PHRASAL_VERBS_OFF[Math.floor(Math.random() * PHRASAL_VERBS_OFF.length)];
        if (!options.includes(randomS.meaning)) {
          options.push(randomS.meaning);
        }
      }
      return {
        id: s.id,
        word: s.word,
        correct: s.meaning,
        options: options.sort(() => Math.random() - 0.5),
        spanish: s.spanish
      };
    });
  }, [gameStarted]);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      if (streak + 1 > maxStreak) setMaxStreak(streak + 1);
      setShowFeedback('CORRECT');
    } else {
      setStreak(0);
      setShowFeedback('WRONG');
    }

    setTimeout(() => {
      setShowFeedback('NONE');
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 7) {
          import('canvas-confetti').then(confetti => {
            confetti.default({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
          });
        }
      }
    }, 1200);
  };

  const startNewGame = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCurrentQuestion(0);
    setGameFinished(false);
    setGameStarted(true);
  };

  const getFlagColor = (count: number) => {
    if (count === 0) return 'text-slate-200 bg-white border-slate-100';
    if (count === 1) return 'text-emerald-500 bg-emerald-50 border-emerald-100'; 
    if (count === 2) return 'text-amber-500 bg-amber-50 border-amber-100'; 
    return 'text-red-500 bg-red-50 border-red-100'; 
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <AnimatePresence>
        {selectedIndex === null && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="bg-white px-6 pt-12 pb-4 border-b border-slate-100 shadow-sm z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                    <ChevronLeft size={20} className="text-slate-400" />
                 </button>
                 <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2 uppercase">
                      Phrasal Verbs <span className="text-amber-600">OFF</span>
                    </h2>
                    <p className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Interactive Learning</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    if (window.confirm('¿Deseas reiniciar todas las banderas y repeticiones de esta sección?')) {
                      await clearAllPhrasalVerbOffPersistence();
                      await clearFlagsInRange(8000, 8999);
                      setFlags({});
                      setRepetitions({});
                      alert('Reiniciado con éxito');
                    }
                  }}
                  className="p-2.5 rounded-xl border-2 bg-white border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm"
                >
                  <RotateCcw size={18} />
                </button>

                <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
                    {(['GUIDE', 'STUDY', 'PLAY'] as const).map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
              </div>
            </div>

            {activeTab === 'STUDY' && (
              <div className="flex items-center gap-2 mt-2">
                 <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide flex gap-2">
                   {totalPages > 1 && !showFlaggedOnly && Array.from({ length: totalPages }).map((_, i) => (
                     <button
                       key={i}
                       onClick={() => setCurrentPage(i)}
                       className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                         currentPage === i 
                           ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                           : 'bg-white border-slate-100 text-slate-400'
                       }`}
                     >
                       {i * pageSize + 1} - {Math.min((i + 1) * pageSize, PHRASAL_VERBS_OFF.length)}
                     </button>
                   ))}
                 </div>
                 <button 
                    onClick={() => { setShowFlaggedOnly(!showFlaggedOnly); setCurrentPage(0); }}
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showFlaggedOnly ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400 shadow-inner'}`}
                  >
                    <Flag size={16} fill={showFlaggedOnly ? "currentColor" : "none"} />
                  </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 pb-24">
        {activeTab === 'STUDY' ? (
          <div className="space-y-2">
            {listPhrasalVerbsOff.map((s, idx) => {
              const absoluteIdx = (currentPage * pageSize) + idx;
              return (
                <motion.button
                  key={s.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedIndex(absoluteIdx); handlePlay(s.word, s.id); }}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-amber-200 transition-all group"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[10px] font-black text-amber-500 shadow-inner">
                      {absoluteIdx + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-base leading-none mb-1 tracking-tight">{s.word}</h3>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-70">{s.spanish}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(flags[s.id + 8000] || 0) > 0 && (
                      <div className={`w-2 h-2 rounded-full shadow-sm ${(flags[s.id + 8000] || 0) >= 3 ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    )}
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : activeTab === 'PLAY' ? (
          <div className="h-full flex flex-col">
            {!gameStarted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl min-h-[450px] relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50" />
                
                {gameFinished ? (
                   <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center relative z-10">
                      <div className="w-24 h-24 rounded-[2rem] bg-amber-50 flex items-center justify-center text-amber-500 mb-6 shadow-xl border border-amber-100/50">
                        <Trophy size={48} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Challenge Results</h3>
                      <p className="text-slate-500 font-black mb-8 uppercase tracking-[0.2em] text-xs">Score: <span className="text-amber-600">{score}/10</span> • Max Streak: <span className="text-amber-500">{maxStreak}</span></p>
                      
                      <div className="w-full space-y-3 mb-10 max-w-sm">
                         {score === 10 ? (
                           <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl text-white font-black text-sm shadow-lg">
                             🏆 PERFECT! You've mastered "OFF"!
                           </div>
                         ) : score >= 7 ? (
                           <div className="p-5 bg-amber-50 rounded-3xl border-2 border-amber-100 text-amber-700 font-black text-sm">
                             🌟 EXCELLENT! Almost there!
                           </div>
                         ) : (
                           <div className="p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 text-slate-500 font-black text-sm">
                             Keep practicing to reach the top!
                           </div>
                         )}
                      </div>

                      <button 
                        onClick={startNewGame}
                        className="w-full max-w-xs py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                      >
                        <RotateCcw size={16} strokeWidth={3} /> Try Again
                      </button>
                   </motion.div>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-amber-100">
                      <Gamepad2 size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-3">Vocabulary Matcher</h3>
                    <p className="text-slate-400 text-xs font-bold leading-relaxed mb-10 px-8 uppercase tracking-widest">
                      Match the phrasal verb with its formal definition. Precision is key!
                    </p>
                    <button 
                      onClick={startNewGame}
                      className="w-full max-w-xs py-5 bg-amber-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-amber-100 active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Zap size={18} fill="currentColor" /> Start Training
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col pt-2">
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Progress {currentQuestion + 1}/10</span>
                    </div>
                    <div className="h-2 w-40 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div animate={{ width: `${((currentQuestion + 1) / 10) * 100}%` }} className="h-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 mb-1">
                            <Flame size={14} className={streak > 0 ? "text-orange-500" : "text-slate-200"} fill={streak > 0 ? "currentColor" : "none"} />
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Streak</span>
                        </div>
                        <p className={`text-xl font-black leading-none ${streak > 2 ? "text-orange-500" : "text-slate-400"}`}>{streak}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                        <p className="text-xl font-black text-amber-600 leading-none">{score}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-4">
                  <motion.div 
                    key={currentQuestion}
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />
                    <h4 className="text-3xl font-black text-slate-800 tracking-tighter leading-tight mb-2">{questions[currentQuestion].word}</h4>
                    <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] opacity-50">Select the meaning</p>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestion].options.map((option, idx) => {
                      const isCorrect = option === questions[currentQuestion].correct;
                      const isSelected = selectedAnswer === option;
                      
                      return (
                        <motion.button
                          key={idx}
                          whileTap={{ scale: 0.97 }}
                          disabled={showFeedback !== 'NONE'}
                          onClick={() => handleAnswer(option)}
                          className={`p-6 rounded-[1.8rem] font-black text-[13px] transition-all border-2 text-left flex items-center justify-between group relative overflow-hidden ${
                            isSelected 
                              ? isCorrect 
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-100' 
                                : 'bg-rose-500 border-rose-500 text-white shadow-xl shadow-rose-100'
                              : 'bg-white border-slate-100 text-slate-700 active:bg-slate-50 hover:border-amber-300 shadow-sm'
                          }`}
                        >
                          <span className="relative z-10 leading-tight pr-8">{option}</span>
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }} className="absolute right-6 opacity-30">
                               {isCorrect ? <CheckCircle2 size={40} /> : <X size={40} />}
                            </motion.div>
                          )}
                          {!isSelected && <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all shrink-0">
                             <ChevronRight size={16} />
                          </div>}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-auto py-8 flex justify-center">
                  <button onClick={() => setGameStarted(false)} className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] hover:text-rose-400 transition-colors">Terminate Mission</button>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'GUIDE' ? (
          <PhrasalVerbsOffGuide />
        ) : null}
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && selectedPhrasalVerbOff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-[100] flex flex-col"
          >
            <div 
              className="w-full h-[12vh] flex flex-col items-center justify-center group cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-all mb-3" />
              <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.5em] group-hover:text-white/60 transition-colors">Minimize</span>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
              <div className="flex items-center justify-center w-full max-w-3xl gap-4 h-full">
                <motion.button whileTap={{ scale: 0.8 }} onClick={goToPrevious} className="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors">
                  <ChevronLeft size={28} strokeWidth={3} />
                </motion.button>

                <motion.div
                  key={selectedPhrasalVerbOff.id}
                  initial={{ scale: 0.9, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -30 }}
                  className="w-full max-w-md bg-white rounded-[3.5rem] p-8 shadow-2xl relative flex flex-col overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
                  
                  <div className="text-center flex-1 flex flex-col pt-4">
                    <div className="flex flex-col items-center gap-4 mb-8">
                      <div className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 font-black text-[8px] uppercase tracking-[0.2em] shadow-inner border border-amber-100/50">
                        OFF MODULE • UNIT {selectedPhrasalVerbOff.id}
                      </div>
                      <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                        {selectedPhrasalVerbOff.word}
                      </h3>
                      <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                        <span className="text-indigo-500 font-black text-xl italic tracking-tight">
                            {selectedPhrasalVerbOff.pronunciation}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10 overflow-y-auto max-h-[30vh] px-2 scrollbar-hide">
                      <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner text-left">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Traducción Principal</h4>
                        <p className="text-slate-900 text-3xl font-black tracking-tighter leading-tight mb-2">{selectedPhrasalVerbOff.spanish}</p>
                        <div className="inline-block px-3 py-1 rounded-lg bg-amber-100/50 text-amber-700 font-black text-[9px] uppercase tracking-widest">
                           {selectedPhrasalVerbOff.category}
                        </div>
                      </div>

                      <div className="p-6 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100/20 relative text-left">
                        <Sparkles size={18} className="text-indigo-500/20 absolute top-5 right-5" />
                        <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Conceptual Meaning</h4>
                        <p className="text-slate-700 text-sm font-bold leading-relaxed">
                          "{selectedPhrasalVerbOff.meaning}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-50">
                      <button
                        onClick={() => handlePlay(selectedPhrasalVerbOff.word, selectedPhrasalVerbOff.id)}
                        className="flex-1 py-5 rounded-[1.8rem] bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                      >
                        <Volume2 size={20} strokeWidth={3} /> LISTEN
                      </button>

                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <button
                          onClick={handleFlagPress}
                          className={`w-14 h-14 rounded-[1.8rem] border-2 flex items-center justify-center shadow-lg active:scale-90 transition-all ${
                            getFlagColor(flags[selectedPhrasalVerbOff.id + 8000] || 0)
                          }`}
                        >
                          <Flag size={24} fill={(flags[selectedPhrasalVerbOff.id + 8000] || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={3} />
                        </button>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-50">Flag Lv {(flags[selectedPhrasalVerbOff.id + 8000] || 0)}</span>
                      </div>

                      <button
                        onClick={handleResetFlag}
                        className="w-14 h-14 rounded-[1.8rem] bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner active:scale-90 transition-all"
                      >
                        <RotateCcw size={20} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.button whileTap={{ scale: 0.8 }} onClick={goToNext} className="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors">
                  <ChevronRight size={28} strokeWidth={3} />
                </motion.button>
              </div>
            </div>

            <div 
              className="w-full h-[12vh] flex flex-col items-center justify-center group cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.5em] mb-3 group-hover:text-white/60 transition-colors">Dismiss</span>
              <div className="w-12 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-all" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhrasalVerbsOffSection;
