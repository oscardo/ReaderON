import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Volume2, 
  ChevronRight, 
  ChevronLeft,
  Zap, 
  Sparkles,
  Loader2,
  Flag,
  RotateCcw,
  Database,
  History,
  TrendingUp
} from 'lucide-react';
import { RegularVerb } from '../constants/regularVerbs';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { setWordFlag, resetWordFlag, getAllFlags, saveVerbPersistence, getVerbPersistence, getAllVerbPersistence } from '../services/dbService';

interface RegularVerbsSectionProps {
  verbs: RegularVerb[];
  onBack: () => void;
}

const RegularVerbsSection: React.FC<RegularVerbsSectionProps> = ({ verbs, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentRange, setCurrentRange] = useState(0); 
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});
  const [showHistory, setShowHistory] = useState(false);
  const [persistenceList, setPersistenceList] = useState<any[]>([]);

  // Load flags from DB on mount
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
      base = base.filter(v => (flags[v.id + 5000] || 0) > 0); // Using offset for flags
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      return base.filter(
        v => v.infinitive.toLowerCase().includes(lowerQuery) || 
             v.spanish.toLowerCase().includes(lowerQuery)
      );
    }

    if (showFlaggedOnly) return base; 

    return base.slice(currentRange * 100, (currentRange + 1) * 100);
  }, [searchQuery, currentRange, showFlaggedOnly, flags, verbs]);

  const selectedVerb = selectedIndex !== null ? filteredVerbs[selectedIndex] : null;

  const handleSpeak = async (text: string) => {
    try {
      await TextToSpeech.speak({
        text,
        lang: 'en-US',
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  const handleVerbSelect = async (index: number) => {
    const verb = filteredVerbs[index];
    if (!verb) return;

    setSelectedIndex(index);
    
    // PERSISTENCE: Save/Update repetition
    try {
      const existing = await getVerbPersistence(`verb_${verb.id}`);
      const updated = {
        regular_verbs_id: `verb_${verb.id}`,
        verb_infinitive: verb.infinitive,
        verb_pronunciation: verb.pronunciation,
        verb_past: verb.past,
        verb_past_participle: verb.pastParticiple,
        verb_example: verb.example,
        verb_spanish: verb.spanish,
        flags: flags[verb.id + 5000] || 0,
        num_repeticiones: (existing?.num_repeticiones || 0) + 1
      };
      await saveVerbPersistence(updated);
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
    
    const wordId = selectedVerb.id + 5000; // Offset for regular verbs flags
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
      const existing = await getVerbPersistence(`verb_${selectedVerb.id}`);
      if (existing) {
        await saveVerbPersistence({ ...existing, flags: newCount });
      }
    } catch (err) {
      console.error("Failed to save flag:", err);
    }
  };

  const onResetPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedVerb) return;
    const wordId = selectedVerb.id + 5000;
    
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
             <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
               <Zap className="text-indigo-600" />
               REGULAR VERBS
             </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                const list = await getAllVerbPersistence();
                setPersistenceList(list.sort((a, b) => b.num_repeticiones - a.num_repeticiones));
                setShowHistory(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white border-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
            >
              <History size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Persistencia</span>
            </button>
            <button
              onClick={() => setShowFlaggedOnly(!showFlaggedOnly)}
              className={`p-2 rounded-xl border transition-all ${
                showFlaggedOnly 
                  ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100' 
                  : 'bg-white border-slate-100 text-slate-400'
              }`}
            >
              <Flag size={20} fill={showFlaggedOnly ? 'currentColor' : 'none'} />
            </button>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Sparkles size={20} className="text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="relative group mb-4">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={showFlaggedOnly ? "Search in flagged verbs..." : "Search verb (English/Spanish)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-6 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>

        {!searchQuery && !showFlaggedOnly && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
            {ranges.map((r, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentRange(idx)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-xl border transition-all ${
                  currentRange === idx 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200'
                }`}
              >
                <span className="text-xs font-black">{r.label}</span>
                <span className="text-[7px] font-bold opacity-60">{r.desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="grid grid-cols-1 gap-2">
          {filteredVerbs.map((verb, index) => (
            <motion.button
              key={verb.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVerbSelect(index)}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {verb.id}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-none mb-1">{verb.infinitive}</h3>
                  <p className="text-slate-400 text-xs italic">{verb.spanish}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1">
                    <span className="text-[8px] font-black text-slate-300 uppercase">V2:</span>
                    <span className="text-[10px] font-bold text-slate-500">{verb.past}</span>
                </div>
                {flags[verb.id + 5000] > 0 && (
                  <div className={`w-2 h-2 rounded-full ${flags[verb.id + 5000] >= 3 ? 'bg-red-500' : flags[verb.id + 5000] === 2 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                )}
                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>
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
            <div className="w-full h-[10vh] cursor-pointer" onClick={() => setSelectedIndex(null)} />

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="flex items-center justify-center w-full max-w-2xl gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md shrink-0"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </motion.button>

                <motion.div
                  key={selectedVerb.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative border border-white/20 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                   <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-4 mb-6 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shadow-inner">
                        #{selectedVerb.id}
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-1">
                          {selectedVerb.infinitive}
                        </h3>
                        <span className="text-indigo-600 font-black text-xl italic tracking-tight">
                          {selectedVerb.pronunciation}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pasado (V2)</h4>
                            <p className="text-sm font-black text-slate-800">{selectedVerb.past}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Participio (V3)</h4>
                            <p className="text-sm font-black text-slate-800">{selectedVerb.pastParticiple}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8 overflow-y-auto max-h-[30vh] px-1 scrollbar-hide">
                      <div className="p-6 bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 text-center">Español</h4>
                        <p className="text-white text-2xl font-black tracking-tight text-center leading-tight">{selectedVerb.spanish}</p>
                      </div>

                      <div className="p-6 bg-indigo-50/40 rounded-[2.5rem] border border-indigo-100/30 relative text-left w-full">
                        <Sparkles size={16} className="text-indigo-500/30 absolute top-4 right-4" />
                        <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Ejemplo</h4>
                        <p className="text-slate-700 text-sm font-semibold leading-relaxed italic">
                          "{selectedVerb.example}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => handleSpeak(selectedVerb.infinitive)}
                        className="flex-1 py-4 rounded-3xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-transform"
                      >
                        <Volume2 size={18} strokeWidth={2.5} /> PRONUNCIAR
                      </button>

                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button
                          onClick={onFlagPress}
                          className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-md active:scale-90 transition-all ${getFlagColor(flags[selectedVerb.id + 5000] || 0)}`}
                        >
                          <Flag size={20} fill={(flags[selectedVerb.id + 5000] || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        <span className="text-[9px] font-black text-slate-400">#{(flags[selectedVerb.id + 5000] || 0)}</span>
                      </div>

                      {(flags[selectedVerb.id + 5000] || 0) > 0 && (
                        <button
                          onClick={onResetPress}
                          className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-inner active:scale-90 transition-all"
                        >
                          <RotateCcw size={18} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md shrink-0"
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </motion.button>
              </div>
            </div>

            <div className="w-full h-[10vh] cursor-pointer" onClick={() => setSelectedIndex(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200] flex items-center justify-center p-6"
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Persistencia de Datos</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verbos Regulares</p>
                </div>
                <button onClick={() => setShowHistory(false)} className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
                  <RotateCcw size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {persistenceList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                    <Database size={48} className="mb-4 opacity-20" />
                    <p className="font-black text-xs uppercase tracking-widest">No hay datos registrados aún</p>
                  </div>
                ) : (
                  persistenceList.map((item) => (
                    <div key={item.regular_verbs_id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                           <TrendingUp size={16} className="text-indigo-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-800 uppercase tracking-tight">{item.verb_infinitive}</span>
                            <span className="text-[8px] font-black text-slate-400">#{item.regular_verbs_id.split('_').pop()}</span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-500 italic">{item.verb_spanish}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                           <span className="text-[10px] font-black text-indigo-600">{item.num_repeticiones}</span>
                           <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Vistas</span>
                        </div>
                        {item.flags > 0 && (
                          <div className="flex items-center gap-1">
                            <Flag size={10} className={item.flags >= 3 ? 'text-red-500' : 'text-amber-500'} fill="currentColor" />
                            <span className="text-[9px] font-black text-slate-600">Lvl {item.flags}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegularVerbsSection;
