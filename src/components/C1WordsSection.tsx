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
  X
} from 'lucide-react';
import { C1Word } from '../constants/c1Words';
import { getAllFlags, setWordFlag, resetWordFlag, getWordRepetitions, incrementWordRepetition, clearAllC1Persistence, clearFlagsInRange } from '../services/dbService';

interface C1WordsSectionProps {
  words: C1Word[];
  onBack: () => void;
  speakText: (text: string) => void;
}

const C1WordsSection: React.FC<C1WordsSectionProps> = ({ words, onBack, speakText }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});
  const [repetitions, setRepetitions] = useState<Record<string, number>>({});
  const pageSize = 100;

  useEffect(() => {
    const loadStats = async () => {
      try {
        const allFlags = await getAllFlags();
        const flagMap: Record<number, number> = {};
        allFlags.forEach(f => {
          if (f.count > 0) flagMap[f.wordId] = f.count;
        });
        setFlags(flagMap);

        const repMap: Record<string, number> = {};
        for (const word of words) {
          const rep = await getWordRepetitions(word.id);
          if (rep > 0) repMap[word.id] = rep;
        }
        setRepetitions(repMap);
      } catch (err) {
        console.error("Error loading C1 stats:", err);
      }
    };
    loadStats();
  }, [words]);

  const filteredWords = useMemo(() => {
    let base = words;
    if (showFlaggedOnly) {
      base = base.filter(w => {
        const numId = parseInt(w.id.replace("c1w_", "")) + 4000;
        return (flags[numId] || 0) > 0;
      });
    }
    return base;
  }, [words, showFlaggedOnly, flags]);

  const totalPages = Math.ceil(filteredWords.length / pageSize);
  
  const listWords = useMemo(() => {
    return filteredWords.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [filteredWords, currentPage]);

  const selectedWord = selectedIndex !== null ? filteredWords[selectedIndex] : null;

  const handleFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWord) return;
    const wordId = parseInt(selectedWord.id.replace("c1w_", "")) + 4000;
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
      console.error("Failed to save C1 flag:", err);
    }
  };

  const handleResetFlag = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWord) return;
    const wordId = parseInt(selectedWord.id.replace("c1w_", "")) + 4000;
    setFlags(prev => {
      const updated = { ...prev };
      delete updated[wordId];
      return updated;
    });
    try {
      await resetWordFlag(wordId);
    } catch (err) {
      console.error("Failed to reset C1 flag:", err);
    }
  };

  const handlePlay = async (word: string, id: string) => {
    speakText(word);
    await incrementWordRepetition(id);
    const newCount = await getWordRepetitions(id);
    setRepetitions(prev => ({ ...prev, [id]: newCount }));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    const nextIdx = selectedIndex + 1;
    if (nextIdx < filteredWords.length) {
      setSelectedIndex(nextIdx);
      handlePlay(filteredWords[nextIdx].word, filteredWords[nextIdx].id);
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
      handlePlay(filteredWords[prevIdx].word, filteredWords[prevIdx].id);
    } else {
      setSelectedIndex(null);
    }
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
                      C1 WORDS
                    </h2>
                    <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Advanced</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    if (window.confirm('¿Deseas reiniciar todas las banderas de esta sección?')) {
                      await clearAllC1Persistence();
                      await clearFlagsInRange(4001, 5000);
                      setFlags({});
                    }
                  }}
                  className="p-2 rounded-xl border bg-white border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={() => { setShowFlaggedOnly(!showFlaggedOnly); setCurrentPage(0); }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showFlaggedOnly ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
                >
                  <Star size={18} fill={showFlaggedOnly ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {totalPages > 1 && !showFlaggedOnly && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1 mt-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                      currentPage === i 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-400'
                    }`}
                  >
                    {i * pageSize + 1} - {Math.min((i + 1) * pageSize, words.length)}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {listWords.map((w, idx) => {
          const absoluteIdx = (currentPage * pageSize) + idx;
          const numId = parseInt(w.id.replace("c1w_", "")) + 4000;
          return (
            <motion.button
              key={w.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedIndex(absoluteIdx); handlePlay(w.word, w.id); }}
              className="w-full flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {absoluteIdx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-none mb-1">{w.word}</h3>
                  <p className="text-slate-400 text-[10px] italic">{w.spanish}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(flags[numId] || 0) > 0 && (
                  <div className={`w-1.5 h-1.5 rounded-full ${(flags[numId] || 0) >= 3 ? 'bg-red-500' : 'bg-amber-500'}`} />
                )}
                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex flex-col"
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
                  key={selectedWord.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[2.5rem] p-6 shadow-2xl relative flex flex-col overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-3 mb-4">
                      <div className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 font-black text-[7px] uppercase tracking-widest shadow-inner">
                        {selectedWord.category}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight mb-1">
                        {selectedWord.word}
                      </h3>
                      <span className="text-indigo-600 font-black text-lg italic tracking-tight">
                        {selectedWord.ipa}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6 overflow-y-auto max-h-[35vh] px-1 scrollbar-hide">
                      <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Significado</h4>
                        <p className="text-slate-800 text-xl font-black tracking-tight leading-tight">{selectedWord.spanish}</p>
                      </div>

                      <div className="p-4 bg-indigo-50/40 rounded-[2rem] border border-indigo-100/30 relative text-left">
                        <Sparkles size={14} className="text-indigo-500/30 absolute top-3 right-3" />
                        <h4 className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Example</h4>
                        <p className="text-slate-700 text-xs font-semibold leading-relaxed italic">
                          "{selectedWord.example}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => handlePlay(selectedWord.word, selectedWord.id)}
                        className="flex-1 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-transform"
                      >
                        <Volume2 size={16} strokeWidth={2.5} /> LISTEN
                      </button>

                      <div className="flex flex-col items-center gap-1 shrink-0 relative">
                        <button
                          onClick={handleFlagPress}
                          className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-md active:scale-90 transition-all ${
                            getFlagColor(flags[parseInt(selectedWord.id.replace("c1w_", "")) + 4000] || 0)
                          }`}
                        >
                          <Flag size={18} fill={(flags[parseInt(selectedWord.id.replace("c1w_", "")) + 4000] || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        <span className="text-[8px] font-black text-slate-400">#{(flags[parseInt(selectedWord.id.replace("c1w_", "")) + 4000] || 0)}</span>
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

export default C1WordsSection;
