import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  X, 
  ArrowRight, 
  Volume2, 
  Target, 
  Mic, 
  PenLine, 
  ChevronRight 
} from 'lucide-react';
import { EBOOKS_DATA, EBook, BookPoint } from '../constants/ebooksData';
import { gemmaService } from '../services/gemmaService';
import { AlertCircle, Sparkles } from 'lucide-react';

interface EBookReaderProps {
  onBack: () => void;
}

export const EBookReader: React.FC<EBookReaderProps> = ({ onBack }) => {
  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  const [activeBookPoint, setActiveBookPoint] = useState<BookPoint | null>(null);
  const [isGemmaActive, setIsGemmaActive] = useState(false);

  React.useEffect(() => {
    const checkGemma = async () => {
      const ready = await gemmaService.isReady();
      setIsGemmaActive(ready);
    };
    checkGemma();
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* EBooks Header */}
      <div className="bg-white px-6 py-10 border-b border-slate-100 shadow-sm z-10 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                  if (activeBookPoint) {
                      setActiveBookPoint(null);
                  } else if (activeBook) {
                      setActiveBook(null);
                  } else {
                      onBack();
                  }
              }}
              className="p-2 hover:bg-slate-50 rounded-xl transition-all"
            >
              <ArrowLeft size={20} className="text-slate-400" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">
                  Curriculum Library
              </span>
              <h3 className="text-lg font-black text-slate-800 leading-none">
                  {activeBookPoint ? activeBookPoint.title : activeBook ? activeBook.title : 'EBooks Resume'}
              </h3>
            </div>
          </div>
          <button 
            onClick={() => { setActiveBookPoint(null); setActiveBook(null); onBack(); }} 
            className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* EBooks Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-20">
        <div className="max-w-4xl mx-auto">
          {!activeBook ? (
              /* Book Selection Grid */
              <div className="grid grid-cols-1 gap-4">
                  {EBOOKS_DATA.map((book, idx) => (
                      <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => setActiveBook(book)}
                          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-emerald-200 hover:shadow-lg transition-all group"
                      >
                          <div className="flex justify-between items-center">
                              <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                          <BookOpen size={20} />
                                      </div>
                                      <div>
                                          <h4 className="text-xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{book.title}</h4>
                                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">{book.level}</span>
                                      </div>
                                  </div>
                                  <p className="text-sm text-slate-500 leading-relaxed max-w-sm mt-2">{book.description}</p>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                                  <ArrowRight size={20} strokeWidth={3} />
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          ) : !activeBookPoint ? (
              /* Book Point Categories */
              <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">Overview</h4>
                      <p className="text-slate-600 leading-relaxed font-medium">{activeBook.description}</p>
                  </div>

                  <div className="grid gap-4">
                      {[
                          { key: 'speaking', label: 'Speaking', icon: <Volume2 size={18}/>, color: 'blue' },
                          { key: 'grammar', label: 'Grammar', icon: <Target size={18}/>, color: 'purple' },
                          { key: 'pronunciation', label: 'Pronunciation', icon: <Mic size={18}/>, color: 'amber' },
                          { key: 'writing', label: 'Writing', icon: <PenLine size={18}/>, color: 'emerald' },
                          { key: 'reading', label: 'Reading', icon: <BookOpen size={18}/>, color: 'indigo' },
                          { key: 'ai_analysis', label: 'AI Deep Analysis', icon: <Sparkles size={18}/>, color: 'purple' },
                      ].map((item, idx) => (
                          <motion.div
                              key={item.key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              onClick={() => {
                                  if (item.key === 'ai_analysis') {
                                      setActiveBookPoint({ title: 'AI Deep Analysis', content: '' });
                                  } else {
                                      setActiveBookPoint({ title: item.label, content: (activeBook.summary as any)[item.key] });
                                  }
                              }}
                              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-emerald-200 cursor-pointer transition-all group flex items-center justify-between"
                          >
                              <div className="flex items-center gap-5">
                                  <div className={`p-4 rounded-2xl transition-colors ${
                                      item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                      item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                      item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                      item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                      'bg-indigo-50 text-indigo-600'
                                  }`}>
                                      {item.icon}
                                  </div>
                                  <h5 className="text-lg font-black text-slate-800">{item.label}</h5>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                                  <ChevronRight size={18} strokeWidth={3} />
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          ) : (
              /* Specific Point Content */
              <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8"
              >
                  <div className="space-y-6">
                      <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Mastering {activeBookPoint.title}</h4>
                      <div className="prose prose-slate max-w-none">
                          {(!activeBookPoint.content || activeBookPoint.title === 'AI Deep Analysis') && !isGemmaActive ? (
                              <div className="bg-amber-50 border-2 border-amber-100 p-8 rounded-[2.5rem] flex flex-col gap-4">
                                  <div className="flex items-center gap-3 text-amber-700">
                                      <AlertCircle size={24} />
                                      <span className="font-black text-sm uppercase tracking-widest">No existe la integración con IA Gemma</span>
                                  </div>
                                  <p className="text-sm text-amber-600 font-bold leading-relaxed">
                                      Para realizar un análisis profundo de este libro con IA, debes inicializar el modelo Gemma en la sección de Ajustes.
                                  </p>
                                  <button 
                                      onClick={() => setActiveBookPoint(null)}
                                      className="self-start px-6 py-3 bg-amber-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-amber-200"
                                  >
                                      Continuar sin IA
                                  </button>
                              </div>
                          ) : (
                              <p className="text-slate-700 text-lg font-medium leading-relaxed whitespace-pre-line">
                                  {activeBookPoint.content || "Generando análisis con IA..."}
                              </p>
                          )}
                      </div>
                  </div>
                  <button 
                      onClick={() => setActiveBookPoint(null)}
                      className="w-full py-5 rounded-[2rem] bg-emerald-50 border-2 border-emerald-100 text-emerald-600 font-black text-sm uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                  >
                      <ArrowLeft size={18} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Back to Sections
                  </button>
              </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
