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
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VerbGenerally, GENERALLY_VERBS } from '../constants/generally';
import { GenerallyGuide } from './GenerallyGuide';
import { 
  getAllFlags, 
  setWordFlag, 
  resetWordFlag, 
  getGenerallyRepetitions, 
  incrementGenerallyRepetition, 
  clearAllGenerallyPersistence, 
  clearFlagsInRange 
} from '../services/dbService';

interface GenerallySectionProps {
  onBack: () => void;
  speakText: (text: string) => void;
}

const GenerallySection: React.FC<GenerallySectionProps> = ({ onBack, speakText }) => {
  const [activeTab, setActiveTab] = useState<'STUDY' | 'PLAY' | 'GUIDE'>('STUDY');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
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
        for (const s of GENERALLY_VERBS) {
          const rep = await getGenerallyRepetitions(s.id);
          if (rep > 0) repMap[s.id] = rep;
        }
        setRepetitions(repMap);
      } catch (err) {
        console.error("Error loading Generally stats:", err);
      }
    };
    loadStats();
  }, []);

  const filteredVerbs = useMemo(() => {
    let base = GENERALLY_VERBS;
    if (activeCategory !== 'ALL') {
      base = base.filter(s => s.category === activeCategory);
    }
    if (showFlaggedOnly) {
      base = base.filter(s => (flags[s.id + 21000] || 0) > 0);
    }
    return base;
  }, [showFlaggedOnly, flags, activeCategory]);

  const categories = ['ALL', 'BE', 'GET', 'HAVE', 'DO'];

  const progress = useMemo(() => {
    const total = GENERALLY_VERBS.length;
    const flagged = GENERALLY_VERBS.filter(v => (flags[v.id + 21000] || 0) > 0).length;
    return Math.round((flagged / total) * 100);
  }, [flags]);

  const selectedVerb = selectedIndex !== null ? filteredVerbs[selectedIndex] : null;

  const handleFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedVerb) return;
    const wordId = selectedVerb.id + 21000;
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
    if (!selectedVerb) return;
    const wordId = selectedVerb.id + 21000;
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

  const handlePlay = async (text: string, id: number) => {
    speakText(text);
    await incrementGenerallyRepetition(id);
    const newCount = await getGenerallyRepetitions(id);
    setRepetitions(prev => ({ ...prev, [id]: newCount }));
  };

  const questions = useMemo(() => {
    return [...GENERALLY_VERBS].sort(() => Math.random() - 0.5).map(s => {
      const options = [s.form];
      while (options.length < 4) {
        const randomS = GENERALLY_VERBS[Math.floor(Math.random() * GENERALLY_VERBS.length)];
        if (!options.includes(randomS.form)) {
          options.push(randomS.form);
        }
      }
      return {
        id: s.id,
        verb: s.verb,
        tense: s.tense,
        correct: s.form,
        options: options.sort(() => Math.random() - 0.5),
        example: s.example
      };
    }).slice(0, 10);
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
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#10b981', '#f59e0b']
      });
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

  const getVerbColor = (cat: string) => {
    switch(cat) {
      case 'BE': return 'indigo';
      case 'GET': return 'emerald';
      case 'HAVE': return 'amber';
      case 'DO': return 'rose';
      default: return 'slate';
    }
  };

  const getFlagColor = (count: number) => {
    if (count === 0) return 'text-slate-300 bg-white border-slate-100';
    if (count === 1) return 'text-emerald-500 bg-emerald-50 border-emerald-100'; 
    if (count === 2) return 'text-amber-500 bg-amber-50 border-amber-100'; 
    return 'text-red-500 bg-red-50 border-red-100'; 
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
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
                      <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2 uppercase">
                        Core <span className="text-indigo-600">Verbs</span>
                      </h2>
                      <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">BE GET HAVE DO</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      if (window.confirm('¿Deseas reiniciar todas las banderas y repeticiones de esta sección?')) {
                        await clearAllGenerallyPersistence();
                        await clearFlagsInRange(21000, 21999);
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
              </div>
              <div className="flex-1 mb-4">
                   <div className="flex justify-between items-end mb-1 px-1">
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                      <span className="text-[10px] font-black text-indigo-600">{progress}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${progress}%` }} className="h-full bg-indigo-500 rounded-full" />
                   </div>
              </div>
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-3 px-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); }}
                      className={`px-3 py-1 rounded-full text-[7px] font-black whitespace-nowrap uppercase tracking-tighter transition-all border ${
                        activeCategory === cat 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                          : 'bg-white border-slate-100 text-slate-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner mt-1">
                  {(['GUIDE', 'STUDY', 'PLAY'] as const).map(tab => (
                      <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
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
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Form Explorer</h3>
                    <button onClick={() => setShowFlaggedOnly(!showFlaggedOnly)} className={`p-2 rounded-lg transition-all ${showFlaggedOnly ? 'bg-amber-100 text-amber-600' : 'text-slate-300'}`}>
                        <Flag size={14} fill={showFlaggedOnly ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {filteredVerbs.map((s) => {
                      const absoluteIdx = GENERALLY_VERBS.findIndex(v => v.id === s.id);
                      const color = getVerbColor(s.category);
                      return (
                        <motion.button
                          key={s.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelectedIndex(absoluteIdx); handlePlay(s.form, s.id); }}
                          className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group"
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className={`w-12 h-12 rounded-2xl bg-${color}-50 text-${color}-600 flex flex-col items-center justify-center shadow-inner`}>
                              <span className="text-[7px] font-black uppercase">{s.verb.replace('To ', '')}</span>
                              <span className="text-[10px] font-black tracking-tighter">{s.tense}</span>
                            </div>
                            <div>
                              <h3 className="font-black text-slate-800 text-sm leading-none mb-1 tracking-tight">{s.form}</h3>
                              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest opacity-70">{s.translation}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {(flags[s.id + 21000] || 0) > 0 && (
                              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black ${(flags[s.id + 21000] || 0) >= 3 ? 'bg-rose-500 text-white' : 'bg-amber-400 text-white'}`}>
                                <Flag size={8} fill="currentColor" />
                                <span>{(flags[s.id + 21000] || 0)}</span>
                              </div>
                            )}
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'PLAY' && (
                <div className="h-full flex flex-col space-y-4">
                  {!gameStarted ? (
                    <div className="flex-1 flex flex-col items-center justify-center pt-10">
                      <motion.button 
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startNewGame}
                        className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center text-center group w-full max-w-sm"
                      >
                        <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                           <Gamepad2 size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Form Master</h3>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">Match the verb forms to their tenses</p>
                        <div className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-slate-200">
                           START MISSION <ArrowRight size={16} />
                        </div>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      {gameFinished ? (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
                          <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6">
                            <Trophy size={48} />
                          </div>
                          <h3 className="text-3xl font-black text-slate-800 mb-2">Mastery Unlocked!</h3>
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
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
                          >
                            <RotateCcw size={16} /> Back to Menu
                          </button>
                        </motion.div>
                      ) : (
                        <div className="space-y-6">
                           <div className="flex items-center justify-between px-2">
                              <div className="flex flex-col gap-1">
                                 <div className="flex items-center gap-2">
                                    <Target size={12} className="text-slate-400" />
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Target {currentQuestion + 1}/10</span>
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
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                className="p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl text-center relative overflow-hidden"
                              >
                                 <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                                 <h4 className="text-lg font-black text-slate-400 tracking-[0.2em] mb-2 uppercase">{questions[currentQuestion].verb} ({questions[currentQuestion].tense})</h4>
                                 <h3 className="text-xl font-black text-slate-800 tracking-tight italic">"{questions[currentQuestion].example}"</h3>
                              </motion.div>
                           </AnimatePresence>

                           <div className="grid grid-cols-1 gap-2">
                              {questions[currentQuestion].options.map((opt, idx) => {
                                 const isSelected = selectedAnswer === opt;
                                 const isCorrect = opt === questions[currentQuestion].correct;
                                 const showRes = showFeedback !== 'NONE';

                                 return (
                                    <motion.button
                                       key={idx}
                                       disabled={showRes}
                                       onClick={() => handleAnswer(opt)}
                                       className={`p-5 rounded-2xl font-bold text-[11px] text-left transition-all border-2 flex items-center justify-between ${
                                          showRes && isCorrect 
                                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-100'
                                          : showRes && isSelected && !isCorrect
                                          ? 'bg-rose-500 border-rose-500 text-white shadow-rose-100'
                                          : isSelected
                                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                          : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
                                       }`}
                                    >
                                       <span>{opt}</span>
                                       {showRes && isCorrect && <CheckCircle2 size={16} />}
                                       {showRes && isSelected && !isCorrect && <X size={16} />}
                                    </motion.button>
                                 );
                              })}
                           </div>
                           
                           <div className="flex justify-center pt-4">
                              <button onClick={() => setGameStarted(false)} className="text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors">Abort Session</button>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'GUIDE' && <GenerallyGuide />}
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedIndex !== null && selectedVerb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-[100] flex flex-col"
          >
            <div className="w-full h-[10vh] flex flex-col items-center justify-center cursor-pointer" onClick={() => setSelectedIndex(null)}>
               <div className="w-10 h-1 bg-white/20 rounded-full mb-2" />
               <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Minimize</span>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
               <div className="w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 to-purple-600" />
                  
                  <div className="flex items-center justify-between mb-8">
                     <div className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 font-black text-[7px] uppercase tracking-widest border border-slate-100">
                        {selectedVerb.verb} • {selectedVerb.tense}
                     </div>
                     <div className="flex gap-2">
                        <button onClick={handleFlagPress} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${getFlagColor(flags[selectedVerb.id + 21000] || 0)}`}>
                           <Flag size={14} fill={(flags[selectedVerb.id + 21000] || 0) > 0 ? "currentColor" : "none"} />
                        </button>
                        <button onClick={handleResetFlag} className="w-8 h-8 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center">
                           <RotateCcw size={14} />
                        </button>
                     </div>
                  </div>

                  <div className="text-center space-y-4 mb-8">
                     <h3 className="text-4xl font-black text-slate-900 tracking-tight">{selectedVerb.form}</h3>
                     <p className="text-indigo-500 font-black text-sm uppercase tracking-widest">{selectedVerb.translation}</p>
                  </div>

                  <div className="space-y-4 flex-1">
                     <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Example Sentence</p>
                        <p className="text-xl font-black text-slate-800 leading-tight italic">"{selectedVerb.example}"</p>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
                     <button onClick={() => setSelectedIndex(prev => prev! > 0 ? prev! - 1 : prev)} className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center active:scale-90 transition-all">
                        <ChevronLeft size={20} />
                     </button>
                     <button 
                        onClick={() => handlePlay(selectedVerb.example, selectedVerb.id)}
                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                     >
                        <Volume2 size={18} /> LISTEN
                     </button>
                     <button onClick={() => setSelectedIndex(prev => prev! < filteredVerbs.length - 1 ? prev! + 1 : prev)} className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center active:scale-90 transition-all">
                        <ChevronRight size={20} />
                     </button>
                  </div>
               </div>
            </div>

            <div className="w-full h-[10vh] flex flex-col items-center justify-center cursor-pointer" onClick={() => setSelectedIndex(null)}>
               <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">Dismiss</span>
               <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenerallySection;
