
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, Mic, ArrowLeft, Target, BookOpen, 
  Play, CheckCircle2, ChevronRight, Info, Music,
  Sparkles, Layers, ListFilter
} from 'lucide-react';
import { PHONETIC_DATA, PhonemeData, PhonemeExample } from '../constants/phoneticData';
import { COMPLEX_WORDS, ComplexWord } from '../constants/complexWords';

interface PhoneticSectionProps {
  onBack: () => void;
  speakText: (text: string, lang?: string) => void;
}

type MainTab = 'CHART' | 'COMPLEX';

export const PhoneticSection: React.FC<PhoneticSectionProps> = ({ onBack, speakText }) => {
  const [selectedPhoneme, setSelectedPhoneme] = useState<PhonemeData | null>(null);
  const [gameMode, setGameMode] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTab, setCurrentTab] = useState<MainTab>('CHART');
  
  // New States for Multi-word Test
  const [testWords, setTestWords] = useState<{word: string, symbol?: string, translation?: string, intonation?: string}[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [wordScores, setWordScores] = useState<number[]>([]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [gameHistory, setGameHistory] = useState<{score: number, date: string, type: string}[]>(() => {
    const saved = localStorage.getItem('phonetic_history');
    return saved ? JSON.parse(saved) : [];
  });

  const vowels = PHONETIC_DATA.filter(p => p.category === 'vowel');
  const diphthongs = PHONETIC_DATA.filter(p => p.category === 'diphthong');
  const consonants = PHONETIC_DATA.filter(p => p.category === 'consonant');

  const saveToHistory = (totalScore: number, type: string) => {
    const newEntry = {
      score: totalScore,
      date: new Date().toLocaleString(),
      type
    };
    const updated = [newEntry, ...gameHistory].slice(0, 50);
    setGameHistory(updated);
    localStorage.setItem('phonetic_history', JSON.stringify(updated));
  };

  const handleSpeak = (text: string, region: 'US' | 'UK') => {
    speakText(text, region === 'US' ? 'en-US' : 'en-GB');
  };

  const startPractice = (type: 'GLOBAL' | 'SINGLE' | 'COMPLEX') => {
    let pool: {word: string, symbol?: string, translation?: string, intonation?: string}[] = [];
    
    if (type === 'GLOBAL') {
      const allExamples = PHONETIC_DATA.flatMap(p => 
        p.examples.map(ex => ({ word: ex.word, symbol: p.symbol, intonation: ex.intonation }))
      );
      pool = [...allExamples].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (type === 'COMPLEX') {
      pool = [...COMPLEX_WORDS].sort(() => 0.5 - Math.random()).slice(0, 10).map(w => ({
        word: w.word,
        translation: w.translation,
        symbol: 'Complex',
        intonation: w.pronunciation
      }));
    } else if (selectedPhoneme) {
      pool = selectedPhoneme.examples.map(ex => ({ 
        word: ex.word, 
        symbol: selectedPhoneme.symbol,
        intonation: ex.intonation
      }));
    }

    setTestWords(pool);
    setCurrentWordIdx(0);
    setWordScores([]);
    setIsTestComplete(false);
    setGameMode(true);
  };

  const simulateRecord = () => {
    if (isRecording) return;
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const score = Math.floor(Math.random() * 21) + 80; // 80-100 for better feel
      const newScores = [...wordScores, score];
      setWordScores(newScores);

      if (currentWordIdx < testWords.length - 1) {
        // More words to go? Wait a bit then move on
        setTimeout(() => {
            setCurrentWordIdx(prev => prev + 1);
        }, 1200);
      } else {
        // Test complete
        const total = newScores.reduce((a, b) => a + b, 0);
        saveToHistory(total, selectedPhoneme?.symbol || 'Global');
        setIsTestComplete(true);
      }
    }, 1500);
  };

  const currentWord = testWords[currentWordIdx];
  const totalPossible = testWords.length * 100;
  const currentTotal = wordScores.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20">
      <AnimatePresence mode="wait">
        {!selectedPhoneme && !gameMode ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={onBack}
                  className="p-3 bg-white rounded-2xl shadow-sm text-slate-500 hover:bg-slate-100 transition-all active:scale-95"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 leading-tight">Phonetic Master</h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastering Symbols & Intonations</p>
                </div>
              </div>

              <div className="flex bg-slate-200 p-1.5 rounded-[1.5rem] self-start md:self-center">
                <button 
                  onClick={() => setCurrentTab('CHART')}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${currentTab === 'CHART' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Layers size={14} /> Chart
                </button>
                <button 
                  onClick={() => setCurrentTab('COMPLEX')}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${currentTab === 'COMPLEX' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Sparkles size={14} /> Complex Words
                </button>
              </div>
            </div>

            {currentTab === 'CHART' ? (
              <>
                <section className="space-y-4">
                  <h2 className="text-xs font-black text-indigo-500 uppercase tracking-widest pl-2 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Vowels & Diphthongs
                  </h2>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {vowels.concat(diphthongs).map((p) => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPhoneme(p)}
                        className="aspect-square bg-white border-2 border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm hover:border-indigo-200 transition-all group"
                      >
                        <span className="text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform tracking-tight">/{p.symbol}/</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">{p.type || 'vowel'}</span>
                      </motion.button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xs font-black text-emerald-500 uppercase tracking-widest pl-2 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Consonants
                  </h2>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {consonants.map((p) => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPhoneme(p)}
                        className="aspect-square bg-white border-2 border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm hover:border-emerald-200 transition-all group"
                      >
                        <span className="text-2xl font-black text-emerald-600 group-hover:scale-110 transition-transform tracking-tight">/{p.symbol}/</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">{p.type}</span>
                      </motion.button>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section className="space-y-4">
                <div className="bg-red-50 rounded-3xl p-8 border border-red-100 mb-6">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <h2 className="text-xl font-black text-red-600 uppercase tracking-tight flex items-center gap-2">
                          <Sparkles size={20} /> 50+ Complex Masterpieces
                        </h2>
                        <p className="text-sm text-red-500/80 font-bold max-w-lg leading-relaxed">
                          Tackle the most difficult words in English with high-precision phonetic breakdowns and meaning guides.
                        </p>
                      </div>
                      <button 
                         onClick={() => startPractice('COMPLEX')}
                         className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
                      >
                         Launch Complex Challenge
                      </button>
                   </div>
                </div>

                <div className="grid gap-4">
                  {COMPLEX_WORDS.map((w, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-red-200 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-black text-slate-900 leading-none">{w.word}</h3>
                            <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest">{w.ipa}</span>
                          </div>
                          <p className="text-xs font-bold text-red-500">{w.translation} — <span className="text-slate-400 italic">"{w.meaning}"</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pronunciation</span>
                              <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">{w.pronunciation}</span>
                           </div>
                           <button 
                            onClick={() => handleSpeak(w.word, 'US')}
                            className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-90 shadow-sm"
                           >
                             <Volume2 size={20} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <Music className="mb-4 opacity-50" size={32} />
                  <h3 className="text-xl font-black mb-2">Master All Sounds</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed mb-6">Take the comprehensive 10-word test covering random English phonemes.</p>
                  <button 
                    onClick={() => startPractice('GLOBAL')}
                    className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-900/20 active:scale-95 transition-all"
                  >
                    Start Global Master Test
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden relative">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Test History</h3>
                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {gameHistory.length === 0 ? (
                      <p className="text-slate-400 text-sm italic py-8 text-center font-bold">No tests taken yet. Start practicing!</p>
                    ) : (
                      gameHistory.map((h, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">/{h.type}/</span>
                            <span className="text-[10px] font-bold text-slate-400">{h.date}</span>
                          </div>
                          <div className="text-right">
                             <span className="text-xl font-black text-slate-900">{h.score}</span>
                             <span className="text-[10px] font-bold text-slate-400 block">Total Points</span>
                          </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>
            </div>
          </motion.div>
        ) : !gameMode && selectedPhoneme ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto space-y-6 pb-12"
          >
            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => setSelectedPhoneme(null)}
                className="p-3 bg-white rounded-2xl shadow-sm text-slate-500 hover:bg-slate-100 transition-all active:scale-95"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1 text-center">
                <h1 className="text-4xl font-black text-indigo-600">/{selectedPhoneme.symbol}/</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Phonetic Masterclass</p>
              </div>
              <button 
                onClick={() => startPractice('SINGLE')}
                className="p-3 bg-red-50 text-red-500 rounded-2xl shadow-sm hover:bg-red-500 hover:text-white transition-all active:scale-95"
                title="Practice this sound"
              >
                <Mic size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6 group hover:border-indigo-100 transition-all">
                <div>
                  <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info size={14} /> Quick Tips (English)
                  </h3>
                  <div className="space-y-4 text-sm">
                    <p><strong className="text-slate-900 block mb-1 uppercase text-[10px] tracking-wider font-black">Mouth Position:</strong> <span className="text-slate-600">{selectedPhoneme.tipsEn.mouth}</span></p>
                    <p><strong className="text-slate-900 block mb-1 uppercase text-[10px] tracking-wider font-black">Tongue:</strong> <span className="text-slate-600">{selectedPhoneme.tipsEn.tongue}</span></p>
                    <p><strong className="text-slate-900 block mb-1 uppercase text-[10px] tracking-wider font-black">Lips:</strong> <span className="text-slate-600">{selectedPhoneme.tipsEn.lips}</span></p>
                    <p><strong className="text-slate-900 block mb-1 uppercase text-[10px] tracking-wider font-black">Common Spelling:</strong> <span className="text-indigo-600 font-bold">{selectedPhoneme.tipsEn.spelling}</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 group hover:border-indigo-400 border border-transparent transition-all">
                <div>
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen size={14} /> Consejos Rápidos (Español)
                  </h3>
                  <div className="space-y-4 text-sm opacity-90 font-medium">
                    <p><strong className="text-indigo-300 block mb-1 uppercase text-[10px] tracking-wider font-black">Posición de la boca:</strong> {selectedPhoneme.tipsEs.mouth}</p>
                    <p><strong className="text-indigo-300 block mb-1 uppercase text-[10px] tracking-wider font-black">Lengua:</strong> {selectedPhoneme.tipsEs.tongue}</p>
                    <p><strong className="text-indigo-300 block mb-1 uppercase text-[10px] tracking-wider font-black">Labios:</strong> {selectedPhoneme.tipsEs.lips}</p>
                    <p><strong className="text-indigo-300 block mb-1 uppercase text-[10px] tracking-wider font-black">Ortografía:</strong> {selectedPhoneme.tipsEs.ortografia}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Word Examples & Comparison</h2>
              <div className="grid gap-4">
                {selectedPhoneme.examples.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, delay: i * 0.05 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase ${
                        ex.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-600' :
                        ex.difficulty === 'medium' ? 'bg-amber-100 text-amber-600' :
                        ex.difficulty === 'hard' ? 'bg-red-100 text-red-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {ex.difficulty[0]}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 leading-none mb-1">{ex.word}</h4>
                        <div className="flex gap-4 items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">US: <span className="text-slate-600">{ex.ipaUS}</span></span>
                          {ex.intonation && (
                            <>
                              <div className="h-3 w-px bg-slate-200" />
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Intonation:</span>
                                <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">{ex.intonation}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => handleSpeak(ex.word, 'US')}
                        className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all active:scale-90 relative group/btn"
                        title="US Pronunciation"
                       >
                         <Volume2 size={16} />
                         <span className="text-[8px] font-black absolute -bottom-1 -right-1 bg-white border px-1 rounded shadow-sm group-hover/btn:bg-indigo-50 transition-colors">US</span>
                       </button>
                       <button 
                        onClick={() => handleSpeak(ex.word, 'UK')}
                        className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all active:scale-90 relative group/btn"
                        title="UK Pronunciation"
                       >
                         <Volume2 size={16} />
                         <span className="text-[8px] font-black absolute -bottom-1 -right-1 bg-white border px-1 rounded shadow-sm group-hover/btn:bg-emerald-50 transition-colors">UK</span>
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button 
                onClick={() => startPractice('SINGLE')}
                className="w-full py-6 rounded-[2.5rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 mt-8"
            >
                <Target size={20} /> Launch Practice Challenge
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
              <button 
                onClick={() => { setGameMode(false); setIsTestComplete(false); }}
                className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200 transition-all active:scale-95"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="bg-slate-100 px-6 py-3 rounded-2xl">
                 <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Progress</span>
                 <div className="flex gap-1 mt-1">
                    {testWords.map((_, i) => (
                      <div key={i} className={`h-1 w-4 rounded-full ${i <= currentWordIdx ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                    ))}
                 </div>
              </div>
            </div>

            <div className="space-y-10 max-w-md w-full">
              {!isTestComplete ? (
                <>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full">Challenge /{currentWord?.symbol}/</span>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">{currentWord?.word}</h2>
                    <p className="text-xs font-bold text-slate-400">Word {currentWordIdx + 1} of {testWords.length}</p>
                  </div>

                  {/* Enhanced Info for each phoneme */}
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-left relative overflow-hidden group">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Info size={12} className="text-indigo-500" /> Pronunciation Hint
                     </h4>
                     <div className="space-y-2">
                        {currentWord?.intonation && (
                          <p className="text-sm font-black text-indigo-600 leading-relaxed mb-2">
                            <span className="font-black text-slate-400 uppercase text-[9px] mr-2">Intonation:</span> 
                            {currentWord.intonation}
                          </p>
                        )}
                        {(() => {
                          const activePhoneme = PHONETIC_DATA.find(p => p.symbol === currentWord?.symbol);
                          return activePhoneme ? (
                            <>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                <span className="font-black text-slate-900 uppercase text-[9px] mr-1">Mouth:</span> 
                                {activePhoneme.tipsEn.mouth}
                              </p>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                <span className="font-black text-slate-900 uppercase text-[9px] mr-1">Tongue:</span> 
                                {activePhoneme.tipsEn.tongue}
                              </p>
                            </>
                          ) : null;
                        })()}
                     </div>
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <Music size={40} />
                     </div>
                  </div>

                  <div className="relative">
                    <div className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center border-8 transition-all ${
                      isRecording ? 'border-indigo-500 scale-110 shadow-2xl shadow-indigo-100' : 'border-slate-100'
                    }`}>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={simulateRecord}
                        disabled={isRecording}
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                          isRecording ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200' : 'bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-400'
                        }`}
                      >
                        {isRecording ? <div className="flex gap-1.5">
                          {[1,2,3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [15, 40, 15] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                              className="w-1.5 bg-white rounded-full"
                            />
                          ))}
                        </div> : <Mic size={48} strokeWidth={2.5} />}
                      </motion.button>
                    </div>
                    {isRecording && (
                        <motion.p 
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity }}
                            className="mt-8 text-sm font-black text-indigo-600 uppercase tracking-widest"
                        >
                            Analyzing Pronunciation...
                        </motion.p>
                    )}
                    {!isRecording && wordScores[currentWordIdx] && (
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="mt-8"
                        >
                            <span className="text-5xl font-black text-indigo-600">{wordScores[currentWordIdx]}</span>
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Accuracy</span>
                        </motion.div>
                    )}
                  </div>
                  
                  <div className="pt-4 flex justify-center gap-4">
                     <button 
                        onClick={() => handleSpeak(currentWord?.word || '', 'US')}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
                     >
                       <Volume2 size={16} /> LISTEN US
                     </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="w-40 h-40 mx-auto bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-200 border-[10px] border-indigo-50">
                     <div className="text-center">
                        <span className="text-4xl font-black text-white leading-none">{currentTotal}</span>
                        <span className="block text-[10px] font-black text-indigo-100 uppercase mt-1">Total Score</span>
                     </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900">Test Complete!</h2>
                    <p className="text-sm font-bold text-slate-400">Final score: {currentTotal} / {totalPossible}</p>
                  </div>

                  <div className="grid grid-cols-5 gap-2 px-4">
                     {wordScores.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                           <div className={`h-8 w-1 rounded-full ${s > 90 ? 'bg-emerald-500' : s > 75 ? 'bg-indigo-500' : 'bg-amber-500'}`} style={{ height: `${s/2}px` }} />
                           <span className="text-[10px] font-black text-slate-400">{i+1}</span>
                        </div>
                     ))}
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => startPractice(selectedPhoneme ? 'SINGLE' : 'GLOBAL')}
                      className="flex-1 py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                    >
                      Retry Challenge
                    </button>
                    <button 
                      onClick={() => { setGameMode(false); setIsTestComplete(false); }}
                      className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-200"
                    >
                      Finish Test
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

