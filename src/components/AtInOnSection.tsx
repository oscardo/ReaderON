import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Volume2, 
  RotateCcw,
  Flag,
  CheckCircle2,
  X,
  Gamepad2,
  Zap,
  Trophy,
  Target,
  Flame,
  ArrowRight,
  Sparkles,
  Search,
  Info
} from 'lucide-react';
import { AtInOnItem, AT_IN_ON_DATA } from '../constants/atInOn';
import { AtInOnGuide } from './AtInOnGuide';
import { 
  getAllFlags, 
  setWordFlag, 
  resetWordFlag, 
  getAtInOnRepetitions, 
  incrementAtInOnRepetition, 
  clearAllAtInOnPersistence, 
  clearFlagsInRange 
} from '../services/dbService';

interface AtInOnSectionProps {
  onBack: () => void;
  speakText: (text: string) => void;
}

const AtInOnSection: React.FC<AtInOnSectionProps> = ({ onBack, speakText }) => {
  const [activeTab, setActiveTab] = useState<'STUDY' | 'PLAY' | 'GUIDE'>('STUDY');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'AT' | 'IN' | 'ON'>('ALL');
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});
  const [repetitions, setRepetitions] = useState<Record<number, number>>({});

  // Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
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
        for (const s of AT_IN_ON_DATA) {
          const rep = await getAtInOnRepetitions(s.id);
          if (rep > 0) repMap[s.id] = rep;
        }
        setRepetitions(repMap);
      } catch (err) {
        console.error("Error loading AtInOn stats:", err);
      }
    };
    loadStats();
  }, []);

  const filteredItems = useMemo(() => {
    let base = AT_IN_ON_DATA;
    if (activeFilter !== 'ALL') {
      base = base.filter(s => s.type === activeFilter);
    }
    if (showFlaggedOnly) {
      base = base.filter(s => (flags[s.id + 19000] || 0) > 0);
    }
    return base;
  }, [showFlaggedOnly, flags, activeFilter]);

  const progress = useMemo(() => {
    const total = AT_IN_ON_DATA.length;
    const flagged = AT_IN_ON_DATA.filter(v => (flags[v.id + 19000] || 0) > 0).length;
    return Math.round((flagged / total) * 100);
  }, [flags]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const handleFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const wordId = selectedItem.id + 19000;
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
    if (!selectedItem) return;
    const wordId = selectedItem.id + 19000;
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
    speakText(word);
    await incrementAtInOnRepetition(id);
    const newCount = await getAtInOnRepetitions(id);
    setRepetitions(prev => ({ ...prev, [id]: newCount }));
  };

  const questions = useMemo(() => {
    return [...AT_IN_ON_DATA].sort(() => Math.random() - 0.5).slice(0, 10).map(s => {
      const options = [s.spanish];
      while (options.length < 4) {
        const randomS = AT_IN_ON_DATA[Math.floor(Math.random() * AT_IN_ON_DATA.length)];
        if (!options.includes(randomS.spanish)) {
          options.push(randomS.spanish);
        }
      }
      return {
        id: s.id,
        word: s.word,
        correct: s.spanish,
        options: options.sort(() => Math.random() - 0.5),
        type: s.type
      };
    });
  }, [gameStarted]);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setCombo(c => c + 1);
      if (combo + 1 > maxCombo) setMaxCombo(combo + 1);
      setShowFeedback('CORRECT');
      speakText("Correct");
    } else {
      setStreak(0);
      setCombo(0);
      setShowFeedback('WRONG');
      speakText("Incorrect");
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
    }, isCorrect ? 1200 : 2200);
  };

  const startNewGame = () => {
    setScore(0);
    setStreak(0);
    setCombo(0);
    setMaxCombo(0);
    setCurrentQuestion(0);
    setGameStarted(true);
    setGameFinished(false);
    setShowFeedback('NONE');
    setSelectedAnswer(null);
  };

  const getFlagColor = (count: number) => {
    if (count >= 3) return 'bg-rose-500 border-rose-600 text-white shadow-rose-200';
    if (count > 0) return 'bg-amber-400 border-amber-500 text-white shadow-amber-100';
    return 'bg-white border-slate-200 text-slate-300';
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] relative overflow-hidden font-sans">
      <AnimatePresence>
        {selectedIndex === null && (
          <>
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
                        IN <span className="text-indigo-400">·</span> AT <span className="text-indigo-400">·</span> ON
                      </h2>
                      <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Preposition Master</p>
                   </div>
                </div>
                <button
                    onClick={async () => {
                      if (window.confirm('¿Deseas reiniciar los datos de esta sección?')) {
                        await clearAllAtInOnPersistence();
                        await clearFlagsInRange(19000, 19999);
                        setFlags({});
                        setRepetitions({});
                        alert('Reiniciado con éxito');
                      }
                    }}
                    className="p-2.5 rounded-xl border-2 bg-white border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm"
                  >
                    <RotateCcw size={18} />
                </button>
              </div>

              <div className="mb-4">
                   <div className="flex justify-between items-end mb-1 px-1">
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Knowledge Mastery</span>
                      <span className="text-[10px] font-black text-indigo-600">{progress}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${progress}%` }} className="h-full bg-indigo-500 rounded-full" />
                   </div>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 px-1">
                  {(['ALL', 'AT', 'IN', 'ON'] as const).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-5 py-2 rounded-full text-[8px] font-black whitespace-nowrap uppercase tracking-widest transition-all border ${
                        activeFilter === filter 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                          : 'bg-white border-slate-100 text-slate-400'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
              </div>

              <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner mt-1">
                  {(['GUIDE', 'STUDY', 'PLAY'] as const).map(tab => (
                      <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                      >
                          {tab}
                      </button>
                  ))}
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 pb-24">
              {activeTab === 'STUDY' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Context Dictionary</h3>
                    <button onClick={() => setShowFlaggedOnly(!showFlaggedOnly)} className={`p-2 rounded-lg transition-all ${showFlaggedOnly ? 'bg-amber-100 text-amber-600' : 'text-slate-300'}`}>
                        <Flag size={14} fill={showFlaggedOnly ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {filteredItems.map((s, idx) => (
                      <motion.button
                        key={s.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setSelectedIndex(idx); handlePlay(s.word, s.id); }}
                        className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group"
                      >
                        <div className="flex items-center gap-4 text-left">
                          <div className={`w-9 h-9 rounded-2xl ${s.type === 'AT' ? 'bg-rose-50 text-rose-500' : s.type === 'IN' ? 'bg-indigo-50 text-indigo-500' : 'bg-amber-50 text-amber-500'} flex items-center justify-center text-[10px] font-black shadow-inner`}>
                            {s.type}
                          </div>
                          <div>
                            <h3 className="font-black text-slate-800 text-sm leading-none mb-1 tracking-tight">{s.word}</h3>
                            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest opacity-70">{s.spanish}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {(flags[s.id + 19000] || 0) > 0 && (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black ${(flags[s.id + 19000] || 0) >= 3 ? 'bg-rose-500 text-white' : 'bg-amber-400 text-white'}`}>
                              <Flag size={8} fill="currentColor" />
                              <span>{(flags[s.id + 19000] || 0)}</span>
                            </div>
                          )}
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'PLAY' && (
                <div className="h-full flex flex-col pt-4">
                  {!gameStarted ? (
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
                        <div className="w-20 h-20 rounded-[2rem] bg-slate-900 flex items-center justify-center text-white mb-8 relative z-10">
                           <Target size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2 relative z-10 uppercase tracking-tight">Preposition Race</h3>
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-10 relative z-10">Match contexts with precision</p>
                        <button 
                            onClick={startNewGame}
                            className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-[12px] uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
                        >
                           LAUNCH MISSION <ArrowRight size={18} />
                        </button>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      {gameFinished ? (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
                          <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8">
                            <Trophy size={48} />
                          </div>
                          <h3 className="text-3xl font-black text-slate-800 mb-2">Well Done!</h3>
                          <div className="flex gap-4 mb-10">
                            <div className="bg-slate-100 px-6 py-2 rounded-2xl flex flex-col items-center">
                               <span className="text-slate-400 font-black uppercase tracking-widest text-[7px]">Score</span>
                               <span className="text-indigo-600 font-black text-lg">{score}/10</span>
                            </div>
                            <div className="bg-amber-50 px-6 py-2 rounded-2xl flex flex-col items-center">
                               <span className="text-amber-500 font-black uppercase tracking-widest text-[7px]">Max Combo</span>
                               <span className="text-amber-600 font-black text-lg">x{maxCombo}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setGameStarted(false)}
                            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                          >
                            <RotateCcw size={18} /> NEW SESSION
                          </button>
                        </motion.div>
                      ) : (
                        <div className="space-y-6">
                           <div className="flex items-center justify-between px-2">
                              <div className="flex flex-col gap-1">
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Round {currentQuestion + 1}/10</span>
                                 </div>
                                 <div className="h-1 w-32 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div animate={{ width: `${((currentQuestion + 1) / 10) * 100}%` }} className="h-full bg-indigo-500" />
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 {combo > 1 && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-amber-200">
                                       COMBO x{combo}
                                    </motion.div>
                                 )}
                                 <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                                    <Flame size={14} className={streak > 0 ? "text-orange-500" : "text-slate-300"} fill={streak > 0 ? "currentColor" : "none"} />
                                    <span className="text-[11px] font-black text-slate-800">{streak}</span>
                                 </div>
                              </div>
                           </div>

                           <AnimatePresence mode="wait">
                              <motion.div 
                                key={currentQuestion}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="p-10 bg-white rounded-[3rem] border-2 border-slate-100 shadow-xl text-center relative overflow-hidden"
                              >
                                 <div className={`absolute top-0 left-0 w-full h-2 ${questions[currentQuestion].type === 'AT' ? 'bg-rose-500' : questions[currentQuestion].type === 'IN' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                                 <div className="inline-block px-3 py-1 bg-slate-50 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                    Define this term
                                 </div>
                                 <h4 className="text-3xl font-black text-slate-800 tracking-tight leading-tight mb-2">"{questions[currentQuestion].word}"</h4>
                              </motion.div>
                           </AnimatePresence>

                           <div className="grid grid-cols-1 gap-2.5">
                              {questions[currentQuestion].options.map((opt, idx) => {
                                 const isSelected = selectedAnswer === opt;
                                 const isCorrect = opt === questions[currentQuestion].correct;
                                 const showRes = showFeedback !== 'NONE';

                                 return (
                                    <motion.button
                                       key={idx}
                                       disabled={showRes}
                                       onClick={() => handleAnswer(opt)}
                                       className={`p-5 rounded-[1.5rem] font-black text-[12px] text-left transition-all border-2 flex items-center justify-between ${
                                          showRes && isCorrect 
                                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
                                          : showRes && isSelected && !isCorrect
                                          ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-100'
                                          : isSelected
                                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.02]'
                                          : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
                                       }`}
                                    >
                                       <span>{opt}</span>
                                       {showRes && isCorrect && <CheckCircle2 size={18} />}
                                       {showRes && isSelected && !isCorrect && <X size={18} />}
                                    </motion.button>
                                 );
                              })}
                           </div>
                           
                           <div className="flex justify-center pt-6">
                              <button onClick={() => setGameStarted(false)} className="px-6 py-2 rounded-full bg-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Abondon Training</button>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'GUIDE' && <AtInOnGuide />}
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedIndex !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/98 backdrop-blur-2xl z-[100] flex flex-col"
          >
            <div className="w-full h-[12vh] flex flex-col items-center justify-center cursor-pointer" onClick={() => setSelectedIndex(null)}>
               <div className="w-12 h-1.5 bg-white/20 rounded-full mb-3" />
               <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.5em]">Minimize</span>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
               <div className="w-full max-w-sm bg-white rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col">
                  <div className={`absolute top-0 left-0 w-full h-2 ${selectedItem.type === 'AT' ? 'bg-rose-500' : selectedItem.type === 'IN' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                  
                  <div className="flex items-center justify-between mb-10">
                     <div className={`px-4 py-1.5 rounded-full ${selectedItem.type === 'AT' ? 'bg-rose-50 text-rose-500' : selectedItem.type === 'IN' ? 'bg-indigo-50 text-indigo-500' : 'bg-amber-50 text-amber-500'} font-black text-[8px] uppercase tracking-widest border border-slate-100 shadow-sm`}>
                        {selectedItem.type} PREPOSITION
                     </div>
                     <div className="flex gap-2.5">
                        <button onClick={handleFlagPress} className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${getFlagColor(flags[selectedItem.id + 19000] || 0)} shadow-sm border-2`}>
                           <Flag size={18} fill={(flags[selectedItem.id + 19000] || 0) > 0 ? "currentColor" : "none"} />
                        </button>
                        <button onClick={handleResetFlag} className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center border-2 border-transparent">
                           <RotateCcw size={18} />
                        </button>
                     </div>
                  </div>

                  <div className="text-center space-y-4 mb-10">
                     <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight uppercase italic">{selectedItem.word}</h3>
                     <div className="inline-flex items-center gap-2 px-5 py-2 bg-slate-100 rounded-full text-slate-500 font-black text-[10px] tracking-[0.1em] uppercase shadow-inner">
                        <Search size={14} className="text-slate-400" />
                        {selectedItem.category}
                     </div>
                  </div>

                  <div className="space-y-4 flex-1">
                     <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Meaning</p>
                        <p className="text-2xl font-black text-slate-800 leading-tight">{selectedItem.spanish}</p>
                     </div>
                     <div className="p-6 bg-indigo-50/30 rounded-[2rem] border border-indigo-100/30">
                        <div className="flex items-center gap-2 mb-2">
                           <Info size={14} className="text-indigo-400" />
                           <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Master Context</p>
                        </div>
                        <p className="text-[13px] font-bold text-slate-600 leading-relaxed italic">{selectedItem.context}</p>
                     </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-50 flex gap-4">
                     <button onClick={() => setSelectedIndex(prev => prev! > 0 ? prev! - 1 : prev)} className="w-14 h-14 rounded-[1.5rem] bg-slate-100 text-slate-400 flex items-center justify-center active:scale-90 transition-all border border-slate-200 shadow-sm">
                        <ChevronLeft size={24} />
                     </button>
                     <button 
                        onClick={() => handlePlay(selectedItem.word, selectedItem.id)}
                        className="flex-1 h-14 bg-slate-900 text-white rounded-[1.5rem] font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                     >
                        <Volume2 size={22} /> LISTEN
                     </button>
                     <button onClick={() => setSelectedIndex(prev => prev! < filteredItems.length - 1 ? prev! + 1 : prev)} className="w-14 h-14 rounded-[1.5rem] bg-slate-100 text-slate-400 flex items-center justify-center active:scale-90 transition-all border border-slate-200 shadow-sm">
                        <ChevronRight size={24} />
                     </button>
                  </div>
               </div>
            </div>

            <div className="w-full h-[12vh] flex flex-col items-center justify-center cursor-pointer" onClick={() => setSelectedIndex(null)}>
               <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.5em] mb-3">Dismiss Sheet</span>
               <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AtInOnSection;
