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
  RotateCcw,
  TriangleAlert,
  Database,
  History,
  TrendingUp
} from 'lucide-react';
import { ThousandWord } from '../constants/thousandWords';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { getWordDetailsWithGemma } from '../services/analysisService';
import { setWordFlag, resetWordFlag, getAllFlags, saveWordPersistence, getWordPersistence, getAllWordPersistence } from '../services/dbService';
import { WordPersistence } from '../types';

interface ThousandWordsSectionProps {
  words: ThousandWord[];
  title: string;
  storeName: 'thousand_words_1' | 'thousand_words_2';
  onBack: () => void;
}

/**
 * Grammar mapping for bilingual display.
 */
const GRAMMAR_MAP: Record<string, { en: string; es: string }> = {
  'verb': { en: 'Verb', es: 'Verbo' },
  'noun': { en: 'Noun', es: 'Sustantivo' },
  'adjective': { en: 'Adjective', es: 'Adjetivo' },
  'adjetive': { en: 'Adjective', es: 'Adjetivo' },
  'adverb': { en: 'Adverb', es: 'Adverbio' },
  'pronoun': { en: 'Pronoun', es: 'Pronombre' },
  'article': { en: 'Article', es: 'Artículo' },
  'conjunction': { en: 'Conjunction', es: 'Conjunción' },
  'preposition': { en: 'Preposition', es: 'Preposición' },
  'interjection': { en: 'Interjection', es: 'Interjección' },
  'determiner': { en: 'Determiner', es: 'Determinante' },
  'adj': { en: 'Adjective', es: 'Adjetivo' },
  'adv': { en: 'Adverb', es: 'Adverbio' },
  'v': { en: 'Verb', es: 'Verbo' },
  'n': { en: 'Noun', es: 'Sustantivo' }
};

/**
 * ThousandWordsSection Component
 * Displays principal words with dynamic enrichment.
 */
const ThousandWordsSection: React.FC<ThousandWordsSectionProps> = ({ words, title, storeName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [currentRange, setCurrentRange] = useState(0); 
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [flags, setFlags] = useState<Record<number, number>>({});
  const [enrichedData, setEnrichedData] = useState<{
    grammar: string;
    phonetic: string;
    definition: string;
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [persistenceList, setPersistenceList] = useState<WordPersistence[]>([]);

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
    const count = Math.ceil(words.length / 100);
    const startOffset = words[0]?.id || 1;
    
    for (let i = 0; i < count; i++) {
      const s = startOffset + (i * 100);
      const e = Math.min(startOffset + ((i + 1) * 100) - 1, startOffset + words.length - 1);
      r.push({
        label: `${i + 1}`,
        desc: `${s}-${e}`,
        start: i * 100
      });
    }
    return r;
  }, [words]);

  const filteredWords = useMemo(() => {
    let base = words;
    
    if (showFlaggedOnly) {
      base = base.filter(w => (flags[w.id] || 0) > 0);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      return base.filter(
        w => w.english.toLowerCase().includes(lowerQuery) || 
             w.spanish.toLowerCase().includes(lowerQuery)
      );
    }

    if (showFlaggedOnly) return base; 

    return base.slice(currentRange * 100, (currentRange + 1) * 100);
  }, [searchQuery, currentRange, showFlaggedOnly, flags, words]);

  const selectedWord = selectedIndex !== null ? filteredWords[selectedIndex] : null;

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

  const loadDetails = async (index: number) => {
    const word = filteredWords[index];
    if (!word) return;

    setSelectedIndex(index);
    setEnrichedData(null);
    
    // If the word already has phonetic/grammar, use it immediately
    if (word.phonetic || word.grammar) {
        setEnrichedData({
            grammar: word.grammar || 'N/A',
            phonetic: word.phonetic || '/.../',
            definition: word.definition || ''
        });
        
        // If definition is missing, still try to load it from AI/Web
        if (!word.definition) {
            setLoadingDetails(true);
            try {
                const details = await getWordDetailsWithGemma(word.english);
                setEnrichedData(prev => ({
                    ...prev!,
                    definition: details.definition
                }));
            } catch (err) {
                console.error("AI enrichment failed:", err);
            } finally {
                setLoadingDetails(false);
            }
        }
        return;
    }

    setLoadingDetails(true);

    try {
      const details = await getWordDetailsWithGemma(word.english);
      setEnrichedData(details);

      // PERSISTENCE: Save/Update repetition
      const existing = await getWordPersistence(storeName, `${storeName}_${word.id}`);
      const updated: WordPersistence = {
        words_id: `${storeName}_${word.id}`,
        words: word.english,
        palabra: word.spanish,
        definicion_ipa: details.phonetic || word.phonetic || '',
        tipo_gramatical: details.grammar || word.grammar || '',
        flags: flags[word.id] || 0,
        num_repeticiones: (existing?.num_repeticiones || 0) + 1
      };
      await saveWordPersistence(storeName, updated);
      
    } catch (error) {
      console.error('Error fetching details:', error);
      setEnrichedData({
        grammar: 'N/A',
        phonetic: '/.../',
        definition: 'Error al consultar la IA.'
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleWordSelect = (index: number) => {
    loadDetails(index);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex < filteredWords.length - 1) {
      loadDetails(selectedIndex + 1);
    } else {
      setSelectedIndex(null);
    }
  };

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    if (selectedIndex > 0) {
      loadDetails(selectedIndex - 1);
    } else {
      setSelectedIndex(null);
    }
  };

  const onFlagPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedWord) return;
    
    const wordId = selectedWord.id;
    const currentCount = flags[wordId] || 0;
    const newCount = currentCount >= 5 ? 0 : currentCount + 1;
    
    // Optimistic update
    setFlags(prev => {
      const updated = { ...prev };
      if (newCount === 0) delete updated[wordId];
      else updated[wordId] = newCount;
      return updated;
    });

    try {
      await setWordFlag(wordId, newCount);
      
      // Sync with persistence store
      const existing = await getWordPersistence(storeName, `${storeName}_${wordId}`);
      if (existing) {
        await saveWordPersistence(storeName, { ...existing, flags: newCount });
      }
    } catch (err) {
      console.error("Failed to save flag:", err);
    }
  };

  const onResetPress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWord) return;
    const wordId = selectedWord.id;
    
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

  const getGrammarDisplay = (gStr: string) => {
    const key = gStr.toLowerCase().trim().replace(/[^a-z]/g, '');
    const map = GRAMMAR_MAP[key];
    if (map) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{map.en}</span>
          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{map.es}</span>
        </div>
      );
    }
    return <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{gStr}</span>;
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
               <BookOpen className="text-emerald-600" />
               <div className="flex flex-col">
                  <span className="text-xl leading-none">{title.toUpperCase()}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                    {title.includes('1001') ? 'Mil Palabras (1001-2000)' : 'Mil Palabras (1-1000)'}
                  </span>
               </div>
             </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                const list = await getAllWordPersistence(storeName);
                setPersistenceList(list.sort((a, b) => b.num_repeticiones - a.num_repeticiones));
                setShowHistory(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white border-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
              title="Persistencia de datos o historial de procesos"
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
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Sparkles size={20} className="text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="relative group mb-4">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={showFlaggedOnly ? "Search in flagged..." : "Search word..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-6 text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
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
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
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
          {filteredWords.map((word, index) => (
            <motion.button
              key={word.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWordSelect(index)}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  {word.id}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-none mb-1">{word.english}</h3>
                  <p className="text-slate-400 text-xs italic">{word.spanish}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {flags[word.id] > 0 && (
                  <div className={`w-2 h-2 rounded-full ${flags[word.id] >= 3 ? 'bg-red-500' : flags[word.id] === 2 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                )}
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex !== null && selectedWord && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex flex-col"
          >
            {/* TOP Close Area - Explicitly for closing */}
            <div 
              className="w-full h-[15vh] cursor-pointer flex flex-col items-center justify-center group" 
              onClick={() => setSelectedIndex(null)}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mb-2" />
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors">Salir del pop up</span>
            </div>

            {/* MIDDLE Content Area - Navigation and Modal (Does NOT close on bg click) */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="flex items-center justify-center w-full max-w-2xl gap-2 h-full">
                {/* Left Arrow */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-2xl backdrop-blur-md shrink-0"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </motion.button>

                {/* Modal Content */}
                <motion.div
                  key={selectedWord.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative border border-white/20 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="flex flex-col items-center gap-4 mb-6 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs shadow-inner">
                        #{selectedWord.id}
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-1">
                          {selectedWord.english}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-600 font-black text-xl italic tracking-tight">
                            {loadingDetails ? '/.../' : (enrichedData?.phonetic && enrichedData.phonetic !== 'N/A' ? enrichedData.phonetic : '/.../')}
                          </span>
                          {!loadingDetails && enrichedData?.grammar && enrichedData.grammar !== 'N/A' && (
                            <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                              {getGrammarDisplay(enrichedData.grammar)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 overflow-y-auto max-h-[35vh] px-1 scrollbar-hide">
                      {/* Spanish Meaning */}
                      <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">Significado</h4>
                        <p className="text-slate-800 text-2xl font-black tracking-tight text-center leading-tight">{selectedWord.spanish}</p>
                      </div>

                      {/* AI/Web Definition */}
                      <div className="min-h-[80px] flex items-center justify-center">
                        {loadingDetails ? (
                          <div className="flex flex-col items-center gap-2 py-2">
                            <Loader2 className="animate-spin text-emerald-600" size={24} />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Buscando en red...</span>
                          </div>
                        ) : enrichedData?.definition && enrichedData.definition !== 'N/A' && (
                          <div className="p-6 bg-emerald-50/40 rounded-[2.5rem] border border-emerald-100/30 relative text-left w-full">
                            <Sparkles size={16} className="text-emerald-500/30 absolute top-4 right-4" />
                            <h4 className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">Definición Web</h4>
                            <p className="text-slate-700 text-sm font-semibold leading-relaxed italic">
                              "{enrichedData.definition}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                      <button
                        onClick={() => handleSpeak(selectedWord.english)}
                        className="flex-1 py-4 rounded-3xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95 transition-transform"
                      >
                        <Volume2 size={18} strokeWidth={2.5} /> PRONUNCIAR
                      </button>

                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button
                          onClick={onFlagPress}
                          className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-md active:scale-90 transition-all ${getFlagColor(flags[selectedWord.id] || 0)}`}
                        >
                          <Flag size={20} fill={(flags[selectedWord.id] || 0) > 0 ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        </button>
                        <span className="text-[9px] font-black text-slate-400">#{(flags[selectedWord.id] || 0)}</span>
                      </div>

                      {(flags[selectedWord.id] || 0) > 0 && (
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

                {/* Right Arrow */}
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

            {/* BOTTOM Close Area - Explicitly for closing */}
            <div 
              className="w-full h-[15vh] cursor-pointer flex flex-col items-center justify-center group" 
              onClick={() => setSelectedIndex(null)}
            >
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors mt-2">Salir del pop up</span>
              <div className="w-12 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors mt-2" />
            </div>
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historial de Procesos</p>
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
                    <div key={item.words_id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                           <TrendingUp size={16} className="text-emerald-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-800 uppercase tracking-tight">{item.words}</span>
                            <span className="text-[8px] font-black text-slate-400">#{item.words_id.split('_').pop()}</span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-500 italic">{item.palabra}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                           <span className="text-[10px] font-black text-emerald-600">{item.num_repeticiones}</span>
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

export default ThousandWordsSection;
