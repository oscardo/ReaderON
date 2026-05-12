import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Zap, PlayCircle, Sparkles, Target } from 'lucide-react';
import { AppMode } from '../types';

interface PhrasalVerbsMenuProps {
  onBack: () => void;
  setMode: (mode: AppMode) => void;
}

const PhrasalVerbsMenu: React.FC<PhrasalVerbsMenuProps> = ({ onBack, setMode }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white px-6 pt-12 pb-4 border-b border-slate-100 shadow-sm z-10"
      >
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
            <ChevronLeft size={24} className="text-slate-400" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">PHRASAL VERBS</h2>
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Mastery Collection</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-24">
        <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
          Elige una de las categorías para aprender combinaciones clave. Todas las secciones incluyen Guía, Estudio y Juego interactivo.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Phrasal Verbs GET */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-pink-100/50 border-b-4 border-b-pink-500 shadow-xl shadow-pink-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Activity size={18} className="text-pink-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">GET</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Conseguir, llegar, cambios.
              </p>
              <div className="inline-flex items-center gap-2 text-pink-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs UP/OUT */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_UP_OUT')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-rose-100/50 border-b-4 border-b-rose-500 shadow-xl shadow-rose-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Zap size={18} className="text-rose-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">UP & OUT</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Intensión, finalidad, salir.
              </p>
              <div className="inline-flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs OFF */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_OFF')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-amber-100/50 border-b-4 border-b-amber-500 shadow-xl shadow-amber-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <PlayCircle size={18} className="text-amber-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">OFF</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Separación, desactivación.
              </p>
              <div className="inline-flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs ON */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_ON')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-emerald-100/50 border-b-4 border-b-emerald-500 shadow-xl shadow-emerald-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Activity size={18} className="text-emerald-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">ON</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Activo ahora, contacto.
              </p>
              <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs IN */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_IN')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-teal-100/50 border-b-4 border-b-teal-500 shadow-xl shadow-teal-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Sparkles size={18} className="text-teal-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">IN</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Entrar, incluir, iniciar.
              </p>
              <div className="inline-flex items-center gap-2 text-teal-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs BACK */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_BACK')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-500 shadow-xl shadow-indigo-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <ChevronLeft size={18} className="text-indigo-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">BACK</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Regresar, devolver, responder.
              </p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs THROUGH */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_THROUGH')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-rose-100/50 border-b-4 border-b-rose-500 shadow-xl shadow-rose-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <ChevronRight size={18} className="text-rose-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">THROUGH</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Atravesar, superar, examinar.
              </p>
              <div className="inline-flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs OVER & DOWN */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_OVER_DOWN')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-500 shadow-xl shadow-indigo-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Sparkles size={18} className="text-indigo-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Interactive</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">OVER & DOWN</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Control, revisión y reducción.
              </p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Explore Now <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs DO vs MAKE */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_DO_MAKE')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-amber-100/50 border-b-4 border-b-amber-500 shadow-xl shadow-amber-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Zap size={18} className="text-amber-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Essential</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">DO vs MAKE</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Ejecución vs Creación.
              </p>
              <div className="inline-flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Master it <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs AT/IN/ON */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_AT_IN_ON')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-600 shadow-xl shadow-indigo-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Target size={18} className="text-indigo-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Premium</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">AT IN ON</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Efecto Zoom: Espacio y tiempo.
              </p>
              <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Phrasal Verbs ABOUT/FOR */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setMode('PHRASAL_VERBS_ABOUT_FOR')}
            className="bento-card p-5 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-b-4 border-b-indigo-400 shadow-xl shadow-indigo-100/20 bg-white"
          >
            <div className="absolute top-0 right-0 p-3">
               <Sparkles size={18} className="text-indigo-300 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
            <div className="relative z-10 flex flex-col items-start gap-2">
              <div className="bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">New</div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">ABOUT FOR</h2>
              <p className="text-slate-400 text-[9px] font-medium leading-tight mb-1">
                Mente e Intenciones.
              </p>
              <div className="inline-flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Start Learning <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PhrasalVerbsMenu;
