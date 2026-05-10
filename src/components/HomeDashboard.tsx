import React from 'react';
import { motion } from 'motion/react';
import { 
  Camera, 
  History, 
  Settings, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Layers, 
  Type, 
  BookOpen, 
  Zap,
  Book,
  Languages,
  Activity
} from 'lucide-react';
import { AppMode, PlayFile } from '../types';

interface HomeDashboardProps {
  setMode: (mode: AppMode) => void;
  setShowSettings: (show: boolean) => void;
  history: PlayFile[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: 'date' | 'accuracy' | 'name') => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  filteredHistory: PlayFile[];
  onFileSelect: (file: PlayFile) => void;
  onDeleteFile: (id: string) => void;
  getScoreClass: (score: number) => string;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setMode,
  setShowSettings,
  history,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  showAdvancedFilters,
  setShowAdvancedFilters,
  filteredHistory,
  onFileSelect,
  onDeleteFile,
  getScoreClass
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      {/* Hero Section */}
      <div className="relative pt-16 pb-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Reader<span className="text-indigo-600">ON</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Advanced Language Companion</p>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all"
          >
            <Settings size={22} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Action: Camera */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            onClick={() => setMode('CAPTURE')}
            className="bento-card group p-0 min-h-[320px] bg-slate-900 relative overflow-hidden cursor-pointer shadow-2xl shadow-indigo-200/40 border border-slate-800"
          >
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10 p-10 flex flex-col h-full justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Camera size={32} strokeWidth={2.5} />
                    </div>
                    <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Powered by OCR & AI</span>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <h2 className="text-4xl font-black text-white leading-tight tracking-tighter">
                        OCR & AI <br/>Analysis
                    </h2>
                    <p className="text-slate-400 font-medium text-sm max-w-[280px] leading-relaxed">
                        Instant text extraction and deep linguistic analysis using <span className="text-indigo-400 font-bold">Gemma 2B</span> technology.
                    </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                  <div className="flex-1 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all active:scale-95 group-hover:shadow-indigo-500/40">
                      <Zap size={18} fill="currentColor" /> Start Scanning
                  </div>
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-700 group-hover:text-white group-hover:border-indigo-500 transition-all">
                      <ArrowRight size={22} />
                  </div>
              </div>
            </div>
            
            {/* Decorative Sparkles */}
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
              <Sparkles size={160} className="text-indigo-400" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setMode('STUDY')}
              className="bento-card p-8 bg-white border border-slate-100 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <Layers size={22} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">Study</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Modules</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setMode('EBOOKS')}
              className="bento-card p-8 bg-white border border-slate-100 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">Books</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Reader</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Secondary Features Grid */}
      <div className="px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phonetics Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHONETICS')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-purple-100/50 border-r-4 border-r-purple-500 shadow-lg shadow-purple-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Guide</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Phonetics</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Master American & British sounds with examples.</p>
              <div className="inline-flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Guide <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Cognates Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('COGNATES')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-l-4 border-l-indigo-600 shadow-lg shadow-indigo-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Vocabulary</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Cognates</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Boost fluency with 400+ linguistic pairs.</p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Learn More <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Irregular Verbs Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('IRREGULAR_VERBS')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-rose-100/50 border-b-4 border-b-rose-500 shadow-xl shadow-rose-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Mastery</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">IRREGULAR VERBS</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Infinitive, Past & Participle forms.</p>
              <div className="inline-flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Learn Verbs <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* 1000 Words ESSENCIAL Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('THOUSAND_WORDS')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-500 shadow-xl shadow-indigo-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Fundamental</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">THOUSAND WORDS <br/>ESSENCIAL</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Most used 1000 English words.</p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* 1000 Words ADVANCED Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('THOUSAND_WORDS_2')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-orange-100/50 border-b-4 border-b-orange-500 shadow-xl shadow-orange-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Next Level</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">THOUSAND WORDS <br/>ADVANCED</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Next 1000 words with IPA and Grammar.</p>
              <div className="inline-flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Continue Learning <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Regular Verbs Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('REGULAR_VERBS')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-emerald-100/50 border-b-4 border-b-emerald-500 shadow-xl shadow-emerald-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Vocabulary</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">REGULAR VERBS</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Conjugations, examples and pronunciation.</p>
              <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Master Verbs <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Idioms Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('IDIOMS')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-purple-100/50 border-b-4 border-b-purple-500 shadow-xl shadow-purple-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Phrases</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">IDIOMS & <br/>Expression</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Modismos y expresiones en inglés.</p>
              <div className="inline-flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Learn Idioms <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* C1 Essencial Entry Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode('C1_ESSENCIAL')}
            className="bento-card p-6 sm:p-8 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-600 bg-gradient-to-br from-white to-indigo-50/30 shadow-xl shadow-indigo-100/20"
          >
            <div className="absolute top-0 right-0 p-4">
               <Sparkles size={20} className="text-indigo-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-indigo-100">Premium C1</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">C1 <br/>ESSENCIAL</h2>
              <p className="text-slate-400 max-w-[200px] text-[11px] font-medium leading-relaxed mb-2">Prefix, Suffix, Roots & Collocations.</p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Master C1 Level <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* C1 Words Entry Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode('C1_WORDS')}
            className="bento-card p-6 sm:p-8 relative overflow-hidden group cursor-pointer border-emerald-100/50 border-b-4 border-b-emerald-600 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl shadow-emerald-100/20"
          >
            <div className="absolute top-0 right-0 p-4">
               <Languages size={20} className="text-emerald-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-emerald-100">Vocabulary</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">C1 <br/>WORDS</h2>
              <p className="text-slate-400 max-w-[200px] text-[11px] font-medium leading-relaxed mb-2">500+ Advanced words from roots & families.</p>
              <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Open Lexicon <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Slang Entry Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode('SLANG')}
            className="bento-card p-6 sm:p-8 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-500 bg-gradient-to-br from-white to-indigo-50/30 shadow-xl shadow-indigo-100/20"
          >
            <div className="absolute top-0 right-0 p-4">
               <Zap size={20} className="text-indigo-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md shadow-indigo-100">Informal</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">SLANG <br/>CENTER</h2>
              <p className="text-slate-400 max-w-[200px] text-[11px] font-medium leading-relaxed mb-2">Street smart English & informal expressions.</p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Explore Slang <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-4 px-6 pt-4 pb-2">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phrasal Verbs Collection</span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {/* Phrasal Verbs General Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_MENU')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-pink-100/50 border-b-4 border-b-pink-500 shadow-xl shadow-pink-100/20 col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-white to-pink-50/30"
          >
            <div className="absolute top-0 right-0 p-4">
               <Activity size={24} className="text-pink-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Mastery</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">PHRASAL VERBS</h2>
              <p className="text-slate-400 max-w-sm text-xs font-medium leading-relaxed mb-2">Master combinations like Get, Up, Out & Off. Interactive and fun.</p>
              <div className="inline-flex items-center gap-2 text-pink-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Open Collection <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Translator Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('TRANSLATOR')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-cyan-100/50 border-t-4 border-t-cyan-500 shadow-lg shadow-cyan-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Utility</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Translator</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Fast EN/ES translation with clean interface.</p>
              <div className="inline-flex items-center gap-2 text-cyan-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Open App <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Suave Entry Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('SUAVE')}
            className="bento-card p-8 relative overflow-hidden group cursor-pointer border-amber-100/50 bg-gradient-to-br from-white to-amber-50/30 shadow-lg shadow-amber-100/20"
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Technique</div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Suave (SR)</h2>
              <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Refine your soft English sounds & connectors.</p>
              <div className="inline-flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Practice Now <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* History Section Controls */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col gap-6 px-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Your Progress</h3>
                <p className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">{history.length} Saved Sessions</p>
              </div>
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-3 rounded-2xl border-2 transition-all ${showAdvancedFilters ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400'}`}
              >
                <Target size={20} />
              </button>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <History size={18} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search your history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-5 pl-14 pr-8 text-slate-800 font-bold placeholder:text-slate-300 focus:border-indigo-500 focus:shadow-xl transition-all outline-none"
              />
            </div>

            {showAdvancedFilters && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} className="text-indigo-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort & Filter Engine</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(['date', 'accuracy', 'name'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-indigo-200'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 px-2">
            {filteredHistory.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onFileSelect(item)}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner ${getScoreClass(item.accuracyTotal).includes('green') ? 'bg-emerald-50 text-emerald-600' : getScoreClass(item.accuracyTotal).includes('yellow') ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                    {item.accuracyTotal}%
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteFile(item.id); }}
                    className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {filteredHistory.length === 0 && (
              <div className="py-24 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto">
                  <History size={40} />
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No records found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
