import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  Target, 
  Sparkles, 
  Search,
  BookOpen,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { COGNATES_DATA } from '../constants/cognatesData';
import { Cognate } from '../types';

interface CognateSectionProps {
  onBack: () => void;
  speakText: (text: string) => void;
}

type Tab = 'LIST' | 'GAME';

export const CognateSection: React.FC<CognateSectionProps> = ({ onBack, speakText }) => {
  const [tab, setTab] = useState<Tab>('LIST');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'COGNATE' | 'FALSE_COGNATE'>('ALL');
  const [itemsToShow, setItemsToShow] = useState(50);
  
  // Game State
  const [gameLevel, setGameLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'START' | 'PLAYING' | 'RESULT'>('START');
  const [feedback, setFeedback] = useState<{ correct: boolean, message: string } | null>(null);
  const [gameData, setGameData] = useState<Cognate[]>([]);

  const filteredData = useMemo(() => {
    return COGNATES_DATA.filter(item => {
      const matchesSearch = item.english.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.spanish.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'ALL' || item.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  // Reset pagination when searching or filtering
  useEffect(() => {
    setItemsToShow(50);
  }, [searchQuery, filter]);

  const startGame = () => {
    // Shuffle and pick 10 random words
    const shuffled = [...COGNATES_DATA].sort(() => Math.random() - 0.5);
    setGameData(shuffled.slice(0, 10));
    setGameLevel(0);
    setScore(0);
    setGameStatus('PLAYING');
    setFeedback(null);
  };

  const handleAnswer = (isCognate: boolean) => {
    if (feedback) return;

    const current = gameData[gameLevel];
    const correct = (current.type === 'COGNATE' && isCognate) || (current.type === 'FALSE_COGNATE' && !isCognate);

    if (correct) {
      setScore(s => s + 1);
      setFeedback({ correct: true, message: '¡Correcto!' });
    } else {
      setFeedback({ 
        correct: false, 
        message: current.type === 'COGNATE' ? 'Es un Cognado Real' : 'Es un Falso Cognado' 
      });
    }

    speakText(current.english);

    setTimeout(() => {
      if (gameLevel < gameData.length - 1) {
        setGameLevel(l => l + 1);
        setFeedback(null);
      } else {
        setGameStatus('RESULT');
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 flex-1 flex flex-col w-full h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-50 rounded-xl transition-all"
          >
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none mb-1">
                Linguistic Explorer
            </span>
            <h3 className="text-lg font-black text-slate-800 leading-none">
                Cognates & False Friends
            </h3>
          </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setTab('LIST')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${tab === 'LIST' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            LIST
          </button>
          <button 
            onClick={() => setTab('GAME')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${tab === 'GAME' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            GAME
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-1 pb-10">
        {tab === 'LIST' ? (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search in English or Spanish..."
                  className="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 text-sm font-semibold outline-none focus:border-purple-500 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {['ALL', 'COGNATE', 'FALSE_COGNATE'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                      filter === f ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100' : 'bg-white text-slate-500 border-slate-100 hover:border-purple-200'
                    }`}
                  >
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="grid gap-4">
              {filteredData.slice(0, itemsToShow).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 50) * 0.01 }}
                  className={`bg-white p-6 rounded-[2rem] border shadow-sm group relative overflow-hidden ${
                    item.type === 'COGNATE' ? 'border-slate-100 hover:border-emerald-200' : 'border-slate-100 hover:border-red-200'
                  }`}
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-black text-slate-800">{item.english}</h4>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                          item.type === 'COGNATE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {item.type.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Significado Real</p>
                          <p className="text-slate-700 font-bold">{item.spanish}</p>
                        </div>
                        {item.type === 'FALSE_COGNATE' && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Parece decir</p>
                            <p className="text-red-500 font-bold line-through opacity-60">{item.appearsToSay}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span className="text-xs font-mono text-slate-400">/{item.pronunciation}/</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-xs font-bold text-slate-500">{item.intonation} Intonation</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => speakText(item.english)}
                      className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>

                  {item.meaningActual && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <div className="mt-1">
                        <Info size={14} className="text-indigo-500" />
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        <span className="font-black text-slate-700 uppercase tracking-tighter mr-1">Context:</span>
                        {item.meaningActual}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredData.length > itemsToShow && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setItemsToShow(prev => prev + 50)}
                  className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-sm uppercase tracking-widest hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  Load 50 More
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-400 ml-1">
                    {filteredData.length - itemsToShow} remaining
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* GAME MODE */
          <div className="h-full flex flex-col justify-center py-10 px-4">
            <AnimatePresence mode="wait">
              {gameStatus === 'START' && (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Target size={40} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-900">Cognate Challenge</h2>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                      Will you be fooled by these "False Friends"? Test your knowledge of 10 random words.
                    </p>
                  </div>
                  <button 
                    onClick={startGame}
                    className="w-full py-5 bg-purple-600 text-white rounded-3xl font-black shadow-2xl shadow-purple-200 hover:bg-purple-700 transition-all uppercase tracking-widest"
                  >
                    START PLAYING
                  </button>
                </motion.div>
              )}

              {gameStatus === 'PLAYING' && gameData[gameLevel] && (
                <motion.div 
                  key="playing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex justify-between items-center px-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 underline decoration-purple-400 decoration-2 underline-offset-4 uppercase tracking-widest mb-1">Level {gameLevel + 1} / 10</span>
                      <span className="text-xs font-black text-slate-900">Score: {score}</span>
                    </div>
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-purple-500" initial={{ width: '0%' }} animate={{ width: `${((gameLevel + 1) / 10) * 100}%` }} />
                    </div>
                  </div>

                  <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center space-y-6 relative overflow-hidden">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-100">Translation: {gameData[gameLevel].spanish}</span>
                       <h2 className="text-5xl font-black text-slate-900 tracking-tighter">{gameData[gameLevel].english}</h2>
                       <p className="text-slate-400 font-mono text-sm">/{gameData[gameLevel].pronunciation}/</p>
                    </div>

                    <AnimatePresence>
                      {feedback && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest ${feedback.correct ? 'text-emerald-500' : 'text-red-500'}`}
                        >
                          {feedback.correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          {feedback.message}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Question */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="font-bold text-slate-700">Is this a Real Cognate or False Friend?</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => handleAnswer(true)}
                         disabled={!!feedback}
                         className={`py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
                            feedback?.correct && gameData[gameLevel].type === 'COGNATE' ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-xl' : 
                            feedback && gameData[gameLevel].type === 'FALSE_COGNATE' ? 'bg-slate-100 text-slate-300' :
                            'bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700'
                         }`}
                       >
                         COGNATE
                       </button>
                       <button 
                         onClick={() => handleAnswer(false)}
                         disabled={!!feedback}
                         className={`py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
                            feedback?.correct && gameData[gameLevel].type === 'FALSE_COGNATE' ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-xl' : 
                            feedback && gameData[gameLevel].type === 'COGNATE' ? 'bg-slate-100 text-slate-300' :
                            'bg-red-600 text-white shadow-xl shadow-red-100 hover:bg-red-700'
                         }`}
                       >
                         FALSE FRIEND
                       </button>
                    </div>
                    {/* Visual background flair */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-50" />
                  </div>
                </motion.div>
              )}

              {gameStatus === 'RESULT' && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 text-center space-y-10"
                >
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Challenge <br/>Completed!</h2>
                    <div className="text-6xl font-black text-purple-600 bg-purple-50 w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto mt-6 shadow-inner">
                      {score}/10
                    </div>
                  </div>

                  <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-slate-600 font-bold leading-relaxed italic">
                      {score === 10 ? "Perfection! You're a bilingual master." : 
                       score >= 7 ? "Great job! Those False Friends are tricky." : 
                       "Practice makes perfect. Keep exploring the list!"}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setTab('LIST')}
                      className="flex-1 py-5 bg-white border-2 border-slate-100 text-slate-500 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
                    >
                      REVIEW LIST
                    </button>
                    <button 
                      onClick={startGame}
                      className="flex-1 py-5 bg-purple-600 text-white rounded-3xl font-black shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} /> REPLAY
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};
