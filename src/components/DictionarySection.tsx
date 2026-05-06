import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronLeft, 
  Book, 
  Loader2, 
  Volume2, 
  RefreshCcw,
  Languages,
  List
} from 'lucide-react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { saveDictionaryEntry, searchDictionary, getDictionaryByLetter } from '../services/dbService';

interface DictionarySectionProps {
  onBack: () => void;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const DictionarySection: React.FC<DictionarySectionProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  // Initial Load or Search
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const res = await searchDictionary(searchQuery);
          setResults(res.slice(0, 50));
        } else if (selectedLetter) {
          const res = await getDictionaryByLetter(selectedLetter);
          setResults(res.slice(0, 100));
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLetter]);

  const handleImport = async () => {
    setIsImporting(true);
    setImportProgress(0);
    try {
      const response = await fetch('/Sources/dictionary.json');
      if (!response.ok) throw new Error("Dictionary JSON not found.");
      
      const data = await response.json();
      const total = data.length;
      
      // Batch processing for better performance
      const batchSize = 100;
      for (let i = 0; i < total; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        for (const entry of batch) {
          await saveDictionaryEntry(entry);
        }
        setImportProgress(Math.round((i / total) * 100));
      }
      setImportProgress(100);
      alert("Dictionary imported successfully! (" + total + " entries)");
    } catch (err: any) {
      alert("Import failed: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleSpeak = async (text: string) => {
    try {
      await TextToSpeech.speak({ text, lang: 'en-US' });
    } catch (err) {}
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
               <Book className="text-indigo-600" />
               DICTIONARY
             </h2>
          </div>
          <button 
            onClick={handleImport}
            disabled={isImporting}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            {isImporting ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
            {isImporting ? `${importProgress}%` : 'UPDATE FROM JSON'}
          </button>
        </div>
        <p className="text-[9px] text-slate-400 font-bold mb-4 uppercase tracking-tighter">Hybrid System: DB + Local JSON (17,000+ words)</p>

        {/* Search Bar */}
        <div className="relative group mb-4">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search in dictionary..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedLetter(null);
            }}
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-6 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>

        {/* A-Z Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {LETTERS.map(l => (
            <button
              key={l}
              onClick={() => {
                setSelectedLetter(l);
                setSearchQuery('');
              }}
              className={`flex-shrink-0 w-10 h-10 rounded-xl border font-black text-xs transition-all flex items-center justify-center ${
                selectedLetter === l 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300">
            <Loader2 size={32} className="animate-spin mb-4 opacity-20" />
            <p className="font-black text-[10px] uppercase tracking-widest">Searching records...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300">
            <Languages size={48} className="mb-4 opacity-20" />
            <p className="font-black text-[10px] uppercase tracking-widest text-center">
              {searchQuery || selectedLetter ? "No matches found" : "Search or pick a letter to begin"}
            </p>
          </div>
        ) : (
          results.map((entry) => (
            <motion.div
              key={entry.id_dictionary}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                   <h3 className="text-xl font-black text-slate-900 leading-tight">{entry.word}</h3>
                   {entry.list_of_abbreviations && (
                     <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{entry.list_of_abbreviations}</span>
                   )}
                </div>
                <button 
                  onClick={() => handleSpeak(entry.word)}
                  className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-inner"
                >
                  <Volume2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                <p className="text-slate-600 font-bold leading-relaxed">{entry.word_in_spanish}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
