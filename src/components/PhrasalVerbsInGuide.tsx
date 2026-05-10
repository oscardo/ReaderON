import React from 'react';
import { motion } from 'motion/react';
import { Info, BookOpen, Lightbulb, Zap } from 'lucide-react';

export const PhrasalVerbsInGuide: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Intro Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <BookOpen size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-3 tracking-tight">Mastering "IN"</h3>
          <p className="text-teal-50 font-medium leading-relaxed opacity-90">
            "In" se utiliza principalmente para indicar movimiento hacia un interior, inclusión en un grupo o el inicio de procesos y sistemas.
          </p>
        </div>
      </motion.div>

      {/* Concept 1 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600">
            <Zap size={20} fill="currentColor" />
          </div>
          <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase">1. MUDARSE / ENTRAR</h4>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Indica que una persona u objeto pasa de un espacio abierto a uno cerrado o privado.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Move in: <span className="text-slate-400 font-medium">Mudarse. Empezar a vivir en una nueva casa.</span></p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Come in: <span className="text-slate-400 font-medium">Entrar al interior de una habitación.</span></p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Get in: <span className="text-slate-400 font-medium">Entrar en un lugar o vehículo pequeño.</span></p>
            </li>
          </ul>
        </div>
      </section>

      {/* Concept 2 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Info size={20} />
          </div>
          <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase">2. INCLUSIÓN</h4>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Añade un matiz de formar parte de algo o llegar a un punto de encuentro social o profesional.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Join in: <span className="text-slate-400 font-medium">Unirse y participar en una actividad grupal.</span></p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Drop in: <span className="text-slate-400 font-medium">Llegar de sorpresa, visitar sin aviso previo.</span></p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Check in: <span className="text-slate-400 font-medium">Registrar llegada (hotel, aeropuerto).</span></p>
            </li>
          </ul>
        </div>
      </section>

      {/* Concept 3 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Lightbulb size={20} />
          </div>
          <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase">3. INICIAR (TECNOLOGÍA)</h4>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Actúa como la llave que activa el comienzo de una sesión, un efecto o una estancia.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Log in / Sign in: <span className="text-slate-400 font-medium">Iniciar sesión en un sistema.</span></p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <p className="text-slate-700 text-sm font-bold">Kick in: <span className="text-slate-400 font-medium">Empezar a funcionar (código o medicina).</span></p>
            </li>
          </ul>
        </div>
      </section>

      {/* Pro Tip */}
      <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-lg">
        <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-3 text-teal-400 flex items-center gap-2">
          <Sparkles size={14} /> Professional Tip
        </h4>
        <p className="text-sm font-medium leading-relaxed text-slate-300">
          Recuerda que para el trabajo usas mucho <span className="text-white font-bold">Log in</span> (entrar) y <span className="text-white font-bold">Log off</span> (salir). Es el ciclo perfecto de conexión.
        </p>
      </div>
    </div>
  );
};

const Sparkles = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
