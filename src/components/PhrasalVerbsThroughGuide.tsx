import React from 'react';
import { motion } from 'motion/react';
import { MoveRight, ShieldCheck, Search, Lightbulb } from 'lucide-react';

export const PhrasalVerbsThroughGuide: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <MoveRight size={120} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tight">MASTERING "THROUGH"</h2>
          <p className="text-rose-100 font-medium leading-relaxed opacity-90">
            "Through" implies crossing a space, overcoming challenges, or examining details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <MoveRight size={20} />
            </div>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">MOVIMIENTO FÍSICO</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Indica que algo o alguien cruza un espacio tridimensional (un túnel, una puerta).
            <br/><span className="text-rose-500 font-bold italic mt-1 block">Ej: Go through, Step through, Drive through.</span>
          </p>
        </section>

        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">SUPERAR OBSTÁCULOS</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            La dificultad es como un "túnel" oscuro del que logras salir al otro lado.
            <br/><span className="text-emerald-500 font-bold italic mt-1 block">Ej: Get through, Pull through, Come through.</span>
          </p>
        </section>

        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Search size={20} />
            </div>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">A DETALLE / EXAMINAR</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Ir desde el principio hasta el fin de una información, sin saltarse nada.
            <br/><span className="text-indigo-500 font-bold italic mt-1 block">Ej: Look through, Talk through.</span>
          </p>
        </section>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="text-amber-400" size={24} />
          <h3 className="text-xl font-black tracking-tight uppercase">Applied Context</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-white font-black block mb-1">Engineering:</span>
              <span className="text-rose-400 font-bold">"Go through the logs"</span> para encontrar errores minuciosamente.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-white font-black block mb-1">MBA / Business:</span>
              <span className="text-indigo-400 font-bold">"Talk through the process"</span> para explicar un flujo paso a paso en reuniones.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
