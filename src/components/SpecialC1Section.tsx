import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Sparkles, 
  Brain, 
  Gamepad2, 
  Puzzle, 
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Star,
  Info,
  Volume2
} from 'lucide-react';
import { PREFIXES, SUFFIXES, ROOTS, COLLOCATIONS } from '../constants/specialC1';

interface SpecialC1SectionProps {
  onBack: () => void;
  speakText: (text: string) => void;
}

const SpecialC1Section: React.FC<SpecialC1SectionProps> = ({ onBack, speakText }) => {
  const [activeTab, setActiveTab] = useState<'STUDY' | 'PLAY'>('STUDY');
  const [activeSubTab, setActiveSubTab] = useState<'PREFIXES' | 'SUFFIXES' | 'ROOTS' | 'COLLOCATIONS'>('PREFIXES');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'NONE' | 'CORRECT' | 'WRONG'>('NONE');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentData = useMemo(() => {
    switch(activeSubTab) {
      case 'PREFIXES': return PREFIXES;
      case 'SUFFIXES': return SUFFIXES;
      case 'ROOTS': return ROOTS;
      case 'COLLOCATIONS': return COLLOCATIONS;
      default: return [];
    }
  }, [activeSubTab]);

  const questions = useMemo(() => {
    const q: any[] = [];
    PREFIXES.slice(0, 5).forEach(p => {
      q.push({
        type: 'PREFIX',
        question: `Which prefix means "${p.meaning}"?`,
        correct: p.part,
        options: [p.part, 'mis-', 'anti-', 'over-'].sort(() => Math.random() - 0.5),
        info: `Example: ${p.example} (${p.translation})`
      });
    });
    ROOTS.slice(0, 5).forEach(r => {
      q.push({
        type: 'ROOT',
        question: `The root "${r.root}" means:`,
        correct: r.meaning,
        options: [r.meaning, 'Time', 'To throw', 'To pull'].sort(() => Math.random() - 0.5),
        info: `Examples: ${r.examples}`
      });
    });
    COLLOCATIONS.forEach(c => {
      q.push({
        type: 'COLLOCATION',
        question: `Complete the collocation: "${c.combination.split(c.word)[0]}...${c.combination.split(c.word)[1]}"`,
        correct: c.word,
        options: [c.word, 'Reduce', 'Create', 'Improve'].sort(() => Math.random() - 0.5),
        info: `Translation: ${c.translation}`
      });
    });
    return q.sort(() => Math.random() - 0.5);
  }, []);

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

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setGameStarted(true);
  };

  const selectedItem = selectedIndex !== null ? currentData[selectedIndex] : null;

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex < currentData.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(null);
    }
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b border-slate-100 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                <ChevronLeft size={20} className="text-slate-400" />
             </button>
             <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <Brain className="text-indigo-600 w-5 h-5" />
                  C1 ESSENCIAL
                </h2>
             </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => { setActiveTab('STUDY'); setSelectedIndex(null); }}
              className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === 'STUDY' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Study
            </button>
            <button 
              onClick={() => { setActiveTab('PLAY'); setSelectedIndex(null); }}
              className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === 'PLAY' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Play
            </button>
          </div>
        </div>

        {activeTab === 'STUDY' && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
            {[
              { id: 'PREFIXES', label: 'Prefix', icon: Zap },
              { id: 'SUFFIXES', label: 'Suffix', icon: Puzzle },
              { id: 'ROOTS', label: 'Roots', icon: Star },
              { id: 'COLLOCATIONS', label: 'Colloc', icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveSubTab(tab.id as any); setSelectedIndex(null); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                  activeSubTab === tab.id 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                <tab.icon size={10} />
                <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {activeTab === 'STUDY' ? (
          <div className="grid grid-cols-1 gap-3">
            {currentData.map((item: any, idx: number) => (
              <motion.button
                key={idx}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedIndex(idx)}
                className="p-4 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm text-left group hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                   <span className="text-lg font-black text-indigo-600">
                     {activeSubTab === 'PREFIXES' || activeSubTab === 'SUFFIXES' ? item.part : (activeSubTab === 'ROOTS' ? item.root : item.word)}
                   </span>
                   <ChevronRight size={14} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                </div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 line-clamp-1">
                  {activeSubTab === 'ROOTS' || activeSubTab === 'COLLOCATIONS' ? item.meaning || item.combination : item.meaning}
                </p>
                <p className="text-[10px] text-slate-500 font-bold italic line-clamp-1">
                  {item.example || item.translation}
                </p>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {!gameStarted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[350px]">
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <Gamepad2 size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Word Architect</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 px-4">
                  Match the correct parts and collocations to level up.
                </p>
                <button 
                  onClick={restartGame}
                  className="w-full max-w-xs p-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 flex items-center justify-center gap-3"
                >
                  <Zap size={16} fill="currentColor" /> Play Now
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col pt-2">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Progress</span>
                    <div className="h-1 w-24 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} className="h-full bg-indigo-600" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                    <p className="text-base font-black text-indigo-600 leading-none">{score}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="p-6 bg-white rounded-[2rem] border-2 border-slate-100 shadow-lg text-center">
                    <h4 className="text-xl font-black text-slate-800 leading-tight">{questions[currentQuestion].question}</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {questions[currentQuestion].options.map((option: string, idx: number) => (
                      <button
                        key={idx}
                        disabled={showFeedback !== 'NONE'}
                        onClick={() => handleAnswer(option)}
                        className={`p-4 rounded-2xl font-bold text-xs transition-all border-2 flex items-center justify-between group ${
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

      {/* Detail View Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex flex-col"
          >
            <div className="w-full h-[12vh] flex flex-col items-center justify-center group cursor-pointer" onClick={() => setSelectedIndex(null)}>
              <div className="w-10 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mb-2" />
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Back</span>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="flex items-center justify-center w-full max-w-2xl gap-2 h-full">
                <motion.button onClick={goToPrevious} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                  <ChevronLeft size={24} strokeWidth={3} />
                </motion.button>

                <motion.div
                  key={selectedIndex}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[2.5rem] p-6 shadow-2xl relative flex flex-col overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-3 mb-4">
                      <div className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 font-black text-[7px] uppercase tracking-widest shadow-inner">
                        {activeSubTab}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                        {activeSubTab === 'PREFIXES' || activeSubTab === 'SUFFIXES' ? selectedItem.part : (activeSubTab === 'ROOTS' ? selectedItem.root : selectedItem.word)}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-6 overflow-y-auto max-h-[35vh] px-1 scrollbar-hide">
                      <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Meaning</h4>
                        <p className="text-slate-800 text-lg font-black tracking-tight leading-tight">{selectedItem.meaning || selectedItem.combination}</p>
                      </div>

                      <div className="p-4 bg-indigo-50/40 rounded-[2rem] border border-indigo-100/30 relative text-left">
                        <Sparkles size={14} className="text-indigo-500/30 absolute top-3 right-3" />
                        <h4 className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Example</h4>
                        <p className="text-slate-700 text-xs font-semibold leading-relaxed italic">
                          "{selectedItem.example || selectedItem.translation || selectedItem.examples}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => speakText(activeSubTab === 'COLLOCATIONS' ? selectedItem.combination : (activeSubTab === 'ROOTS' ? selectedItem.root : (selectedItem.part || selectedItem.word)))}
                        className="flex-1 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                      >
                        <Volume2 size={16} strokeWidth={2.5} /> LISTEN
                      </button>
                      <button
                        onClick={() => setSelectedIndex(null)}
                        className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner active:scale-90 transition-all"
                      >
                        <RotateCcw size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.button onClick={goToNext} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                  <ChevronRight size={24} strokeWidth={3} />
                </motion.button>
              </div>
            </div>

            <div className="w-full h-[12vh] flex flex-col items-center justify-center group cursor-pointer" onClick={() => setSelectedIndex(null)}>
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Close</span>
              <div className="w-10 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecialC1Section;
