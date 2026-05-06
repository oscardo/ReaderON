import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Volume2 
} from 'lucide-react';
import { SuperCategory, SubCategory } from '../constants/studyData';

interface StudyDashboardProps {
  studyData: SuperCategory[];
  onBack: () => void;
  speakWord: (text: string) => void;
}

export const StudyDashboard: React.FC<StudyDashboardProps> = ({
  studyData,
  onBack,
  speakWord
}) => {
  const [activeSuperCategory, setActiveSuperCategory] = React.useState<SuperCategory | null>(null);
  const [activeSubCategory, setActiveSubCategory] = React.useState<SubCategory | null>(null);
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white px-8 pt-16 pb-8 border-b border-slate-100 shadow-sm z-10 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={activeSubCategory ? () => setActiveSubCategory(null) : activeSuperCategory ? () => setActiveSuperCategory(null) : onBack}
              className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Study Center</h2>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em]">
                {activeSubCategory ? activeSubCategory.title : activeSuperCategory ? activeSuperCategory.title : 'Structured Learning'}
              </p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Sparkles size={20} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="max-w-4xl mx-auto">
          {!activeSuperCategory ? (
            /* Render Super Categories Grid */
            <div className="grid grid-cols-1 gap-4">
              {studyData.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveSuperCategory(cat)}
                  className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <Sparkles size={16} />
                        </div>
                        <h4 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{cat.title}</h4>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed max-w-sm">{cat.description}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                      <ChevronRight size={20} strokeWidth={3} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !activeSubCategory ? (
            /* Render Sub Categories List */
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6">
                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Definition</h4>
                <p className="text-slate-600 leading-relaxed font-medium">{activeSuperCategory.description}</p>
              </div>
              
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-6">Sub Categories</h4>
              <div className="grid gap-4 px-1">
                {activeSuperCategory.subCategories.map((sub, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveSubCategory(sub)}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 hover:shadow-lg transition-all group flex justify-between items-center"
                  >
                    <h5 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{sub.title}</h5>
                    <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                      <ChevronRight size={18} strokeWidth={3} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Render Sub Category Content */
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">English Description</h4>
                    <p className="text-slate-800 text-lg font-bold leading-relaxed">{activeSubCategory.descriptionEn}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Translation (Spanish)</h4>
                    <p className="text-slate-500 text-lg font-medium italic leading-relaxed">{activeSubCategory.descriptionEs}</p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-50 space-y-6">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Common Examples
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {activeSubCategory.examples.map((example, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => speakWord(example)}
                        className="px-5 py-3 bg-slate-50 rounded-2xl text-slate-700 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer shadow-sm border border-transparent hover:border-indigo-100 flex items-center gap-2"
                      >
                        <Volume2 size={14} className="opacity-40" />
                        {example}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
