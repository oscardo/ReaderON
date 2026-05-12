import React from 'react';
import { motion } from 'motion/react';
import { Info, Target, Sparkles, BookOpen, Star, Lightbulb, GraduationCap } from 'lucide-react';

export const PhrasalVerbsOverDownGuide: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <GraduationCap size={160} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-widest border border-white/30">
            Mastery Guide
          </div>
          <h2 className="text-3xl font-black tracking-tight leading-none">OVER & DOWN<br/><span className="text-indigo-200">CORE CONCEPTS</span></h2>
          <p className="text-indigo-100/80 text-xs font-medium leading-relaxed max-w-[280px]">
            Understand the logic behind these particles to master hundreds of combinations effortlessly.
          </p>
        </div>
      </div>

      {/* Over Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Particle: OVER</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600">
              <Target size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Base Meaning</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              El significado base de <span className="font-bold text-slate-900">"Over"</span> es estar o pasar por encima de algo, física o figuradamente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                <Sparkles size={16} />
              </div>
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-tight">Movement</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Dar vuelta, rotar o desplazarse hacia un lado.</p>
            </div>
            <div className="p-5 bg-purple-50 rounded-3xl border border-purple-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-purple-600 shadow-sm">
                <Star size={16} />
              </div>
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-tight">Control</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Asumir mando o superar una situación difícil.</p>
            </div>
          </div>

          <div className="p-6 bg-indigo-900 rounded-[2rem] text-white space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={20} className="text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest">Pro Tip for your Career</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-black text-indigo-300 uppercase">Take over</p>
                <p className="text-[11px] leading-relaxed italic text-white/90">"I will take over the coordination of the VerAI project." (Ideal for leadership).</p>
              </div>
              <div className="space-y-1 border-t border-white/10 pt-4">
                <p className="text-xs font-black text-indigo-300 uppercase">Go over</p>
                <p className="text-[11px] leading-relaxed italic text-white/90">"Let's go over the code one last time before the demo." (Crucial for QA and review).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Down Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Particle: DOWN</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <Info size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Core Concept</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Indica un movimiento físico de arriba hacia abajo, o una <span className="font-bold text-slate-900 text-amber-600">reducción/deterioro</span> de intensidad o estatus.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-rose-500">
                  <Target size={20} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-tight">Negative/Deterioro</h4>
                  <p className="text-[10px] text-slate-500">Fallas técnicas o desprestigio.</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500">
                  <Sparkles size={20} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-tight">Reduction</h4>
                  <p className="text-[10px] text-slate-500">Bajar volumen, velocidad o cantidad.</p>
               </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-[2rem] border-2 border-amber-100 space-y-4">
            <div className="flex items-center gap-2 text-amber-700">
              <BookOpen size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Daily Life Tips</span>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-black text-amber-600 uppercase">Break down</p>
                <p className="text-[11px] leading-relaxed italic text-slate-600">"The server broke down due to high traffic." (Essential for engineers).</p>
              </div>
              <div className="space-y-1 border-t border-amber-200/50 pt-4">
                <p className="text-xs font-black text-amber-600 uppercase">Narrow down</p>
                <p className="text-[11px] leading-relaxed italic text-slate-600">"We need to narrow down our target market." (Strategic decision making).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
