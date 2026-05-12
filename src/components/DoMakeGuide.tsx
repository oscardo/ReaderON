import React from 'react';
import { motion } from 'motion/react';
import { Target, Sparkles, Brain, Hand, Heart, Zap, Info } from 'lucide-react';

export const DoMakeGuide: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Golden Rule Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden border-2 border-indigo-500/20">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Sparkles size={200} />
        </div>
        <div className="relative z-10 space-y-4 text-center">
          <div className="bg-amber-400 text-slate-900 px-4 py-1 rounded-full w-fit mx-auto text-[10px] font-black uppercase tracking-widest border border-amber-200">
            The Golden Rule
          </div>
          <h2 className="text-3xl font-black tracking-tight leading-none uppercase">
            Make vs Do
          </h2>
          <div className="flex flex-col gap-3 py-4 max-w-[300px] mx-auto">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-[11px] leading-relaxed">
                   <span className="text-amber-400 font-black">MAKE:</span> Se trata de <span className="font-bold underline decoration-amber-400 underline-offset-4">crear</span> algo que no estaba ahí.
                </p>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-[11px] leading-relaxed">
                   <span className="text-indigo-300 font-black">DO:</span> Se trata de <span className="font-bold underline decoration-indigo-400 underline-offset-4">actuar o cumplir</span> con algo que ya existe o se debe hacer.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* DO Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">DO (El acto de Ejecutar)</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed">
              Enfoque en el <span className="font-black text-indigo-600">proceso</span>. No genera un objeto físico nuevo por lo general.
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <Zap size={16} className="text-indigo-600" />
                <div>
                   <h4 className="text-[10px] font-black text-slate-900 uppercase">Rutinas y Deberes</h4>
                   <p className="text-[9px] text-slate-500">Quehaceres, ejercicios, actividades repetitivas.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <Target size={16} className="text-indigo-600" />
                <div>
                   <h4 className="text-[10px] font-black text-slate-900 uppercase">Obligaciones Morales</h4>
                   <p className="text-[9px] text-slate-500">Ética, favores y comportamiento esperado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAKE Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">MAKE (El acto de Crear)</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
             <p className="text-slate-600 text-sm leading-relaxed">
              Enfoque en el <span className="font-black text-amber-600">resultado final</span> o producto. Dar origen a algo nuevo.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                 <Hand size={18} className="text-amber-600" />
                 <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-tight">Manos</h4>
                 <p className="text-[8px] text-slate-500 leading-tight">Construir o elaborar algo tangible.</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                 <Brain size={18} className="text-amber-600" />
                 <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-tight">Cabeza</h4>
                 <p className="text-[8px] text-slate-500 leading-tight">Ideas, planes y decisiones.</p>
              </div>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 space-y-2">
                 <Sparkles size={18} className="text-rose-600" />
                 <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-tight">Abstracto</h4>
                 <p className="text-[8px] text-slate-500 leading-tight">Situaciones o compromisos intangibles.</p>
              </div>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 space-y-2">
                 <Heart size={18} className="text-rose-600" />
                 <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-tight">Emociones</h4>
                 <p className="text-[8px] text-slate-500 leading-tight">Provocar sentimientos en otros.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Card */}
      <div className="p-6 bg-indigo-900 rounded-[2.5rem] text-white space-y-3 shadow-lg">
         <div className="flex items-center gap-2">
            <Info size={18} className="text-indigo-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Study Note</span>
         </div>
         <p className="text-[11px] leading-relaxed text-indigo-100 font-medium italic">
            "Recuerda que en el mundo de los Phrasal Verbs, la consistencia es clave. No intentes memorizar todo a la vez, usa la sección de estudio para familiarizarte con el contexto antes de jugar."
         </p>
      </div>
    </motion.div>
  );
};
