import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Volume2, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Sparkles,
  Loader2,
  Flag,
  RotateCcw
} from 'lucide-react';
import { RegularVerb } from '../constants/regularVerbs';
import { setWordFlag, resetWordFlag, getAllFlags, saveRegularPersistence, getRegularPersistence, clearAllRegularPersistence, clearFlagsInRange } from '../services/dbService';

interface RegularVerbsSectionProps {
  verbs: RegularVerb[];
  onBack: () => void;
  speakText: (text: string) => void;
}

const RegularVerbsSection: React.FC<RegularVerbsSectionProps> = ({ verbs, onBack, speakText }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentRange, setCurrentRange] = useState(0); 
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});

  useEffect(() => {
    const loadFlags = async () => {
      try {
        const allFlags = await getAllFlags();
        const flagMap: Record<number, number> = {};
        allFlags.forEach(f => {
          if (f.count > 0) flagMap[f.wordId] = f.count;
        });
        setFlags(flagMap);
      } catch (err) {
        console.error("Error loading flags:", err);
      }
    };
    loadFlags();
  }, []);

  const ranges = useMemo(() => {
    const r = [];
    const count = Math.ceil(verbs.length / 100);
    for (let i = 0; i < count; i++) {
      const s = (i * 100) + 1;
      const e = Math.min((i + 1) * 100, verbs.length);
      r.push({
        label: `${i + 1}`,
        desc: `${s}-${e}`,
        start: i * 100
      });
    }
    return r;
  }, [verbs]);

  const filteredVerbs = useMemo(() => {
    let base = verbs;
    if (showFlaggedOnly) {
      base = base.filter(v => (flags[v.id + 2000] || 0) > 0);
      return base;
    }
    return base.slice(currentRange * 100, (currentRange + 1) * 100);
  }, [currentRange, showFlaggedOnly, flags, verbs]);

  const selectedVerb = selectedIndex !== null ? filteredVerbs[selectedIndex] : null;

  const handleVerbSelect = async (index: number) => {
    const verb = filteredVerbs[index];
    if (!verb) return;
    setSelectedIndex(index);
    speakText(`${verb.infinitive}, ${verb.past}, ${verb.pastParticiple}`);
    
    try {
      const existing = await getRegularPersistence(`regular_${verb.id}`);
      const updated = {
        regular_verbs_id: `regular_${verb.id}`,
        verb_infinitive: verb.infinitive,
        verb_pronunciation: verb.pronunciation,
        verb_past: verb.past,
        verb_past_participle: verb.pastParticiple,
        verb_spanish: verb.spanish,
        flags: flags[verb.id + 2000] || 0,
        num_repeticiones: (existing?.num_repeticiones || 0) + 1
      };
      await saveRegularPersistence(updated);
    } catch (err) {
      console.error("Persistence error:", err);
    }
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex < filteredVerbs.length - 1) {
      handleVerbSelect(selectedIndex + 1);
    } else {
      setSelectedIndex(null);
    }
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex > 0) {
      handleVerbSelect(selectedIndex - 1);
    } else {
      setSelectedIndex(null);
    }
  };

  const onFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedVerb) return;
    const wordId = selectedVerb.id + 2000;
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
      const existing = await getRegularPersistence(`regular_${selectedVerb.id}`);
      if (existing) {
        await saveRegularPersistence({ ...existing, flags: newCount });
      }
    } catch (err) {
      console.error("Failed to save flag:", err);
    }
  };

  const onResetPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedVerb) return;
    const wordId = selectedVerb.id + 2000;
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

  const getFlagColor = (count: number) => {
    if (count === 0) return 'text-slate-300 bg-white border-slate-100';
    if (count === 1) return 'text-emerald-500 bg-emerald-50 border-emerald-100'; 
    if (count === 2) return 'text-amber-500 bg-amber-50 border-amber-100'; 
    return 'text-red-500 bg-red-50 border-red-100'; 
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
             <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2 uppercase">
               <BookOpen className="text-emerald-600" size={18} />
               REGULAR
             </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                if (window.confirm('¿Deseas reiniciar todas las banderas de esta sección?')) {
                  await clearAllRegularPersistence();
                  await clearFlagsInRange(2001, 3000);
                  const newFlags = { ...flags };
                  verbs.forEach(v => delete newFlags[v.id + 2000]);
                  setFlags(newFlags);
                }
              }}
              className="p-2 rounded-xl border bg-white border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => setShowFlaggedOnly(!showFlaggedOnly)}
              className={`p-2 rounded-xl border transition-all ${
                showFlaggedOnly 
                  ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100' 
                  : 'bg-white border-slate-100 text-slate-400'
              }`}
            >
              <Flag size={18} fill={showFlaggedOnly ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {!showFlaggedOnly && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1 mt-2">
            {ranges.map((r, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentRange(idx)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-xl border transition-all ${
                  currentRange === idx 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
                }`}
              >
                <span className="text-[10px] font-black">{r.label}</span>
                <span className="text-[6px] font-bold opacity-60">{r.desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {filteredVerbs.map((verb, index) => (
          <motion.button
            key={verb.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVerbSelect(index)}
            className="w-full flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-black text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                {verb.id}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base leading-none mb-1">{verb.infinitive}</h3>
                <p className="text-slate-400 text-[10px] italic">{verb.spanish}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {flags[verb.id + 2000] > 0 && (
                <div className={`w-1.5 h-1.5 rounded-full ${flags[verb.id + 2000] >= 3 ? 'bg-red-500' : 'bg-amber-500'}`} />
              )}
              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex !== null && selectedVerb && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex flex-col"
          >
            {/* TOP Close Area */}
            <div 
              className="w-full h-[12vh] cursor-pointer flex flex-col items-center justify-center group" 
              onClick={() => setSelectedIndex(null)}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mb-2" />
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Salir del pop up</span>
            </div>

            {/* MIDDLE Content Area */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="flex items-center justify-center w-full max-w-2xl gap-2 h-full">
                {/* Left Arrow */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 active:bg-white/20"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </motion.button>

                {/* Modal Content */}
                <motion.div
                  key={selectedVerb.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[2.5rem] p-6 shadow-2xl relative border border-white/20 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-3 mb-4 shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[10px] shadow-inner">
                        #{selectedVerb.id}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight mb-1">
                        {selectedVerb.infinitive}
                      </h3>
                      <span className="text-emerald-600 font-black text-lg italic tracking-tight">
                        {selectedVerb.pronunciation}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Pasado</h4>
                            <p className="text-xs font-black text-slate-800">{selectedVerb.past}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Participio</h4>
                            <p className="text-xs font-black text-slate-800">{selectedVerb.pastParticiple}</p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6 overflow-y-auto max-h-[30vh] px-1 scrollbar-hide">
                      <div className="p-4 bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200">
                        <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 text-center">Español</h4>
                        <p className="text-white text-xl font-black tracking-tight text-center leading-tight">{selectedVerb.spanish}</p>
                      </div>

                      <div className="p-4 bg-emerald-50/40 rounded-[2rem] border border-emerald-100/30 relative text-left">
                        <Sparkles size={14} className="text-emerald-500/30 absolute top-3 right-3" />
                        <h4 className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">Example</h4>
                        <p className="text-slate-700 text-xs font-semibold leading-relaxed italic">
                          "{selectedVerb.example}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => speakText(`${selectedVerb.infinitive}, ${selectedVerb.past}, ${selectedVerb.pastParticiple}`)}
                        className="flex-1 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95 transition-transform"
                      >
                        <Volume2 size={16} strokeWidth={2.5} /> LISTEN
                      </button>

                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button
                          onClick={onFlagPress}
                          className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-md active:scale-90 transition-all ${getFlagColor(flags[selectedVerb.id + 2000] || 0)}`}
                        >
                          <Flag size={18} fill={(flags[selectedVerb.id + 2000] || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        <span className="text-[8px] font-black text-slate-400">#{(flags[selectedVerb.id + 2000] || 0)}</span>
                      </div>

                      <button
                        onClick={onResetPress}
                        className="px-4 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center gap-2 shadow-inner active:scale-90 transition-all font-black text-[8px] uppercase tracking-widest"
                      >
                        <RotateCcw size={14} strokeWidth={3} /> RESET
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Right Arrow */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 active:bg-white/20"
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </motion.button>
              </div>
            </div>

            {/* BOTTOM Close Area */}
            <div 
              className="w-full h-[12vh] cursor-pointer flex flex-col items-center justify-center group" 
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

export default RegularVerbsSection;
