import React from 'react';
import { motion } from 'motion/react';
import { Brain, Target, ArrowRight, Lightbulb } from 'lucide-react';

export const AboutForGuide: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Concept */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain size={120} />
        </div>
        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
          <Lightbulb className="text-yellow-400" /> Mentalidad vs. Objetivo
        </h3>
        <p className="text-indigo-100 font-medium leading-relaxed">
          ABOUT y FOR nos hablan de hacia dónde dirigimos nuestra mente y nuestras intenciones. 
          Uno orbita una idea, el otro dispara hacia un resultado.
        </p>
      </div>

      {/* About Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Brain size={20} />
          </div>
          <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">💭 ABOUT: El Tema Central</h4>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            Significa <span className="font-bold text-indigo-600">"alrededor de una idea o temática"</span>. 
            Se utiliza cuando tu mente, palabras o emociones orbitan un tema específico.
          </p>
          <div className="space-y-3">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-indigo-500 uppercase mb-1">Visualización</p>
                <p className="text-xs text-slate-500 italic">"Imagínate un satélite girando alrededor de un planeta. La acción es el satélite y el planeta es el tema."</p>
             </div>
             <ul className="grid grid-cols-1 gap-2">
                <li className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Worry about (Preocupación mental)
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Think about (Pensamiento rotativo)
                </li>
             </ul>
          </div>
        </div>
      </div>

      {/* For Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
            <Target size={20} />
          </div>
          <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">➡️ FOR: El Objetivo o el Futuro</h4>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            Representa el <span className="font-bold text-rose-600">"Futuro: algo que esperamos o deseamos"</span>. 
            Imagina una flecha que apunta hacia adelante.
          </p>
          <div className="space-y-3">
             <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100/50">
                <p className="text-[10px] font-black text-rose-500 uppercase mb-1">Visualización</p>
                <p className="text-xs text-slate-500 italic">"Haces algo HOY para conseguir algo MAÑANA. Es una flecha directa al blanco."</p>
             </div>
             <ul className="grid grid-cols-1 gap-2">
                <li className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Ask for (Hablas para OBTENER)
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Wait for (Esperas un RESULTADO)
                </li>
             </ul>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
           <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">ABOUT</h5>
           <p className="text-xs font-bold leading-tight">"Este es el tema de mi pensamiento"</p>
        </div>
        <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
           <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">FOR</h5>
           <p className="text-xs font-bold leading-tight">"Este es el objetivo que quiero alcanzar"</p>
        </div>
      </div>
    </div>
  );
};
