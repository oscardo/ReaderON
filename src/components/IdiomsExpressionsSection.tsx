import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Flag,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  History
} from 'lucide-react';
import { IdiomExpression } from '../constants/idiomsExpressions';
import { getIdiomPersistence, saveIdiomPersistence, getAllIdiomPersistence, clearAllIdiomPersistence } from '../services/dbService';

interface IdiomsExpressionsSectionProps {
  idioms: IdiomExpression[];
  onBack: () => void;
  speakText: (text: string) => void;
}

const IdiomsExpressionsSection: React.FC<IdiomsExpressionsSectionProps> = ({ idioms, onBack, speakText }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [persistenceMap, setPersistenceMap] = useState<Record<string, any>>({});
  const pageSize = 100;

  useEffect(() => {
    loadPersistence();
  }, []);

  const loadPersistence = async () => {
    const all = await getAllIdiomPersistence();
    const map: Record<string, any> = {};
    all.forEach(item => {
      map[item.idioms_expressions_id] = item;
    });
    setPersistenceMap(map);
  };

  const filteredIdioms = useMemo(() => {
    let base = idioms;
    if (showFlaggedOnly) {
      return base.filter(i => (persistenceMap[`idiom_${i.idioms_expressions_id}`]?.flags || 0) > 0);
    }
    return base;
  }, [showFlaggedOnly, persistenceMap, idioms]);

  const totalPages = Math.ceil(filteredIdioms.length / pageSize);
  const listIdioms = useMemo(() => {
    return filteredIdioms.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [filteredIdioms, currentPage]);

  const selectedIdiom = selectedIndex !== null ? filteredIdioms[selectedIndex] : null;

  const handleFlag = async (idiomId: number, flagLevel: number) => {
    const key = `idiom_${idiomId}`;
    const existing = persistenceMap[key] || { 
      idioms_expressions_id: key, 
      flags: 0, 
      num_repeticiones: 0 
    };
    
    const updated = { 
      ...existing, 
      flags: flagLevel,
      num_repeticiones: (existing.num_repeticiones || 0) + 1
    };
    
    await saveIdiomPersistence(updated);
    setPersistenceMap(prev => ({ ...prev, [key]: updated }));
  };

  const handleSpeak = (text: string) => {
    speakText(text);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex < filteredIdioms.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      handleSpeak(filteredIdioms[selectedIndex + 1].idiom_expression_in_english);
    } else {
      setSelectedIndex(null);
    }
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      handleSpeak(filteredIdioms[selectedIndex - 1].idiom_expression_in_english);
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
             <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2 uppercase">
               <Sparkles className="text-amber-500" size={18} />
               IDIOMS
             </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                if (window.confirm('¿Deseas reiniciar todas las banderas de esta sección?')) {
                  await clearAllIdiomPersistence();
                  setPersistenceMap({});
                }
              }}
              className="p-2 rounded-xl border bg-white border-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => {
                setShowFlaggedOnly(!showFlaggedOnly);
                setCurrentPage(0);
              }}
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

        {totalPages > 1 && !showFlaggedOnly && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1 mt-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                  currentPage === i 
                    ? 'bg-amber-500 border-amber-500 text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                {i * pageSize + 1} - {Math.min((i + 1) * pageSize, idioms.length)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {listIdioms.map((idiom, index) => {
          const absoluteIndex = (currentPage * pageSize) + index;
          const pData = persistenceMap[`idiom_${idiom.idioms_expressions_id}`] || { flags: 0 };
          return (
            <motion.button
              key={idiom.idioms_expressions_id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedIndex(absoluteIndex);
                handleSpeak(idiom.idiom_expression_in_english);
              }}
              className="w-full flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-amber-200 transition-all group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-black text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                  {idiom.idioms_expressions_id}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-none mb-1">{idiom.idiom_expression_in_english}</h3>
                  <p className="text-slate-400 text-[10px] italic">{idiom.idiom_expression_in_spanish}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {pData.flags > 0 && (
                  <div className={`w-1.5 h-1.5 rounded-full ${pData.flags >= 3 ? 'bg-red-500' : 'bg-amber-500'}`} />
                )}
                <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex !== null && selectedIdiom && (
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
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors">Salir del pop up</span>
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
                  key={selectedIdiom.idioms_expressions_id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[2.5rem] p-6 shadow-2xl relative border border-white/20 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-3 mb-4 shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-[10px] shadow-inner">
                        #{selectedIdiom.idioms_expressions_id}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight mb-1">
                        {selectedIdiom.idiom_expression_in_english}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-6 overflow-y-auto max-h-[35vh] px-1 scrollbar-hide">
                      <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">Significado</h4>
                        <p className="text-amber-600 text-lg font-bold italic text-center leading-tight">{selectedIdiom.idiom_expression_in_spanish}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => handleSpeak(selectedIdiom.idiom_expression_in_english)}
                        className="flex-1 py-3.5 rounded-2xl bg-amber-500 text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-100 active:scale-95 transition-transform"
                      >
                        <Volume2 size={16} strokeWidth={2.5} /> LISTEN
                      </button>

                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleFlag(selectedIdiom.idioms_expressions_id, ((persistenceMap[`idiom_${selectedIdiom.idioms_expressions_id}`]?.flags || 0) % 5) + 1)}
                          className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shadow-md active:scale-90 transition-all ${
                            (persistenceMap[`idiom_${selectedIdiom.idioms_expressions_id}`]?.flags || 0) > 0 ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-white text-slate-200 border-slate-100'
                          }`}
                        >
                          <Flag size={18} fill={(persistenceMap[`idiom_${selectedIdiom.idioms_expressions_id}`]?.flags || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        <span className="text-[8px] font-black text-slate-400">#{(persistenceMap[`idiom_${selectedIdiom.idioms_expressions_id}`]?.flags || 0)}</span>
                      </div>

                      <button
                        onClick={() => handleFlag(selectedIdiom.idioms_expressions_id, 0)}
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
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors mt-2">Return to Menu or Exit Pop up</span>
              <div className="w-10 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IdiomsExpressionsSection;
