import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Volume2, 
  Star, 
  Sparkles, 
  BookOpen, 
  Filter,
  RotateCcw,
  Flag,
  CheckCircle2,
  X,
  Gamepad2,
  Zap,
  Info,
  Trophy
} from 'lucide-react';
import { Slang, SLANGS } from '../constants/slangs';
import { getAllFlags, setWordFlag, resetWordFlag, getSlangRepetitions, incrementSlangRepetition, clearAllSlangPersistence, clearFlagsInRange } from '../services/dbService';

interface SlangSectionProps {
  onBack: () => void;
  speakText: (text: string) => void;
}

const SlangSection: React.FC<SlangSectionProps> = ({ onBack, speakText }) => {
  const [activeTab, setActiveTab] = useState<'STUDY' | 'PLAY'>('STUDY');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});
  const [repetitions, setRepetitions] = useState<Record<number, number>>({});
  const pageSize = 100;

  // Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
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
        for (const s of SLANGS) {
          const rep = await getSlangRepetitions(s.id);
          if (rep > 0) repMap[s.id] = rep;
        }
        setRepetitions(repMap);
      } catch (err) {
        console.error("Error loading Slang stats:", err);
      }
    };
    loadStats();
  }, []);

  const filteredSlangs = useMemo(() => {
    let base = SLANGS;
    if (showFlaggedOnly) {
      base = base.filter(s => (flags[s.id + 5000] || 0) > 0);
    }
    return base;
  }, [showFlaggedOnly, flags]);

  const totalPages = Math.ceil(filteredSlangs.length / pageSize);
  const listSlangs = useMemo(() => {
    return filteredSlangs.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [filteredSlangs, currentPage]);

  const selectedSlang = selectedIndex !== null ? filteredSlangs[selectedIndex] : null;

  const handleFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSlang) return;
    const wordId = selectedSlang.id + 5000;
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
      console.error("Failed to save slang flag:", err);
    }
  };

  const handleResetFlag = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSlang) return;
    const wordId = selectedSlang.id + 5000;
    setFlags(prev => {
      const updated = { ...prev };
      delete updated[wordId];
      return updated;
    });
    try {
      await resetWordFlag(wordId);
    } catch (err) {
      console.error("Failed to reset slang flag:", err);
    }
  };

  const handlePlay = async (word: string, id: number) => {
    speakText(word);
    await incrementSlangRepetition(id);
    const newCount = await getSlangRepetitions(id);
    setRepetitions(prev => ({ ...prev, [id]: newCount }));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    const nextIdx = selectedIndex + 1;
    if (nextIdx < filteredSlangs.length) {
      setSelectedIndex(nextIdx);
      handlePlay(filteredSlangs[nextIdx].word, filteredSlangs[nextIdx].id);
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
      handlePlay(filteredSlangs[prevIdx].word, filteredSlangs[prevIdx].id);
    } else {
      setSelectedIndex(null);
    }
  };

  const questions = useMemo(() => {
    return [...SLANGS].sort(() => Math.random() - 0.5).slice(0, 10).map(s => {
      const options = [s.meaning];
      while (options.length < 4) {
        const randomS = SLANGS[Math.floor(Math.random() * SLANGS.length)];
        if (!options.includes(randomS.meaning)) {
          options.push(randomS.meaning);
        }
      }
      return {
        id: s.id,
        word: s.word,
        correct: s.meaning,
        options: options.sort(() => Math.random() - 0.5),
        example: s.example,
        spanish: s.spanish
      };
    });
  }, [gameStarted]);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].correct) {
      setScore(score + 1);
      setShowFeedback('CORRECT');
    } else {
      setShowFeedback('WRONG');
    }

    setTimeout(() => {
      setShowFeedback('NONE');
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameStarted(false);
      }
    }, 2000);
  };

  const startNewGame = () => {
    setScore(0);
    setCurrentQuestion(0);
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
                      SLANG
                    </h2>
                    <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Informal</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    if (window.confirm('¿Deseas reiniciar todas las banderas de esta sección?')) {
                      await clearAllSlangPersistence();
                      await clearFlagsInRange(5001, 6000);
                      setFlags({});
                    }
                  }}
                  className="p-2 rounded-xl border bg-white border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                >
                  <RotateCcw size={18} />
                </button>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button 
                    onClick={() => setActiveTab('STUDY')}
                    className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === 'STUDY' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                    >
                    Study
                    </button>
                    <button 
                    onClick={() => setActiveTab('PLAY')}
                    className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === 'PLAY' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                    >
                    Play
                    </button>
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
                       {i * pageSize + 1} - {Math.min((i + 1) * pageSize, SLANGS.length)}
                     </button>
                   ))}
                 </div>
                 <button 
                    onClick={() => { setShowFlaggedOnly(!showFlaggedOnly); setCurrentPage(0); }}
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showFlaggedOnly ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
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
            {listSlangs.map((s, idx) => {
              const absoluteIdx = (currentPage * pageSize) + idx;
              return (
                <motion.button
                  key={s.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedIndex(absoluteIdx); handlePlay(s.word, s.id); }}
                  className="w-full flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-[9px] font-black text-indigo-400">
                      {absoluteIdx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base leading-none mb-1">{s.word}</h3>
                      <p className="text-slate-400 text-[10px] italic">{s.meaning}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(flags[s.id + 5000] || 0) > 0 && (
                      <div className={`w-1.5 h-1.5 rounded-full ${(flags[s.id + 5000] || 0) >= 3 ? 'bg-red-500' : 'bg-amber-500'}`} />
                    )}
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {!gameStarted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[350px]">
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <Gamepad2 size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Slang Matcher</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 px-4">
                  Match the slang to its formal meaning.
                </p>
                <button 
                  onClick={startNewGame}
                  className="w-full max-w-xs p-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 flex items-center justify-center gap-3"
                >
                  <Zap size={16} fill="currentColor" /> Play Now
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col pt-2">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Question {currentQuestion + 1}/10</span>
                    <div className="h-1 w-24 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${((currentQuestion + 1) / 10) * 100}%` }} className="h-full bg-indigo-600" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                    <p className="text-base font-black text-indigo-600 leading-none">{score}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="p-6 bg-white rounded-[2rem] border-2 border-slate-100 shadow-lg text-center">
                    <h4 className="text-2xl font-black text-slate-800 leading-tight">{questions[currentQuestion].word}</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {questions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        disabled={showFeedback !== 'NONE'}
                        onClick={() => handleAnswer(option)}
                        className={`p-4 rounded-2xl font-bold text-xs transition-all border-2 text-left flex items-center justify-between group ${
                          selectedAnswer === option 
                            ? option === questions[currentQuestion].correct 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'bg-rose-500 border-rose-500 text-white'
                            : 'bg-white border-slate-100 text-slate-700 active:bg-slate-50'
                        }`}
                      >
                        {option}
                        <ChevronRight size={14} className={selectedAnswer === option ? 'text-white' : 'text-slate-200'} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && selectedSlang && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[100] flex flex-col"
          >
            <div 
              className="w-full h-[12vh] flex flex-col items-center justify-center group cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mb-2" />
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Back</span>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="flex items-center justify-center w-full max-w-2xl gap-2 h-full">
                <motion.button onClick={goToPrevious} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                  <ChevronLeft size={24} strokeWidth={3} />
                </motion.button>

                <motion.div
                  key={selectedSlang.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[2.5rem] p-6 shadow-2xl relative flex flex-col overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-3 mb-4">
                      <div className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 font-black text-[7px] uppercase tracking-widest shadow-inner">
                        SLANG #{selectedSlang.id}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight mb-1">
                        {selectedSlang.word}
                      </h3>
                      <span className="text-indigo-600 font-black text-lg italic tracking-tight">
                        {selectedSlang.ipa}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6 overflow-y-auto max-h-[35vh] px-1 scrollbar-hide">
                      <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Meaning</h4>
                        <p className="text-slate-800 text-xl font-black tracking-tight leading-tight mb-1">{selectedSlang.meaning}</p>
                        <p className="text-[10px] text-indigo-500 font-bold">{selectedSlang.spanish}</p>
                      </div>

                      <div className="p-4 bg-indigo-50/40 rounded-[2rem] border border-indigo-100/30 relative text-left">
                        <Sparkles size={14} className="text-indigo-500/30 absolute top-3 right-3" />
                        <h4 className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Sentence</h4>
                        <p className="text-slate-700 text-xs font-semibold leading-relaxed italic">
                          "{selectedSlang.example}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => handlePlay(selectedSlang.word, selectedSlang.id)}
                        className="flex-1 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                      >
                        <Volume2 size={16} strokeWidth={2.5} /> LISTEN
                      </button>

                      <div className="flex flex-col items-center gap-1 shrink-0 relative">
                        <button
                          onClick={handleFlagPress}
                          className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-md active:scale-90 transition-all ${
                            getFlagColor(flags[selectedSlang.id + 5000] || 0)
                          }`}
                        >
                          <Flag size={18} fill={(flags[selectedSlang.id + 5000] || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        <span className="text-[8px] font-black text-slate-400">#{(flags[selectedSlang.id + 5000] || 0)}</span>
                      </div>

                      <button
                        onClick={handleResetFlag}
                        className="px-4 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center gap-2 shadow-inner active:scale-90 transition-all font-black text-[8px] uppercase tracking-widest"
                      >
                        <RotateCcw size={14} strokeWidth={3} /> RESET
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.button onClick={goToNext} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                  <ChevronRight size={24} strokeWidth={3} />
                </motion.button>
              </div>
            </div>

            <div 
              className="w-full h-[12vh] flex flex-col items-center justify-center group cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Close</span>
              <div className="w-10 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlangSection;
