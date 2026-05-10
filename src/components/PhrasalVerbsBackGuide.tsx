import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Reply, Info, Lightbulb } from 'lucide-react';

export const PhrasalVerbsBackGuide: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <RotateCcw size={120} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tight">MASTERING "BACK"</h2>
          <p className="text-indigo-100 font-medium leading-relaxed opacity-90">
            "Back" is essential for movement (returning) and communication (responding).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <RotateCcw size={20} />
            </div>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">REGRESAR / RETROCEDER</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Indica que el sujeto se desplaza físicamente hacia donde estaba antes o hacia atrás.
            <br/><span className="text-indigo-500 font-bold italic mt-1 block">Ej: Come back, Go back, Step back.</span>
          </p>
        </section>

        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Reply size={20} />
            </div>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">DEVOLVER / RESPONDER</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Una acción, objeto o comunicación es enviada de vuelta a quien la originó.
            <br/><span className="text-amber-500 font-bold italic mt-1 block">Ej: Give back, Call back, Pay back.</span>
          </p>
        </section>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="text-amber-400" size={24} />
          <h3 className="text-xl font-black tracking-tight uppercase">Professional Tips</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-white font-black block mb-1">MBA / Professional:</span>
              Usa <span className="text-indigo-400 font-bold">"Step back"</span> cuando necesites tomar distancia de un problema complejo para verlo con claridad.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-white font-black block mb-1">Systems / Projects:</span>
              <span className="text-emerald-400 font-bold">"Get back to you"</span> es la frase estándar para decir que investigarás algo y darás una respuesta después.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
