import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';

export const PhrasalVerbsGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-pink-600 text-white p-6 rounded-[2rem] shadow-lg shadow-pink-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">GUÍA DE USO DEL VERBO "GET"</h3>
        <p className="text-pink-100 text-sm font-medium leading-relaxed relative z-10">
          El verbo "get" puede funcionar como verbo principal para indicar obtención, proceso de cambio o movimiento, y también es la base de numerosos phrasal verbs.
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
          <BookOpen size={20} className="text-pink-500" />
          1. Formas y Conjugación
        </h3>
        <p>Es fundamental conocer las cuatro formas principales del verbo para utilizarlo en diferentes tiempos verbales:</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b"><th className="pb-2">Presente</th><th className="pb-2">Pasado Simple</th><th className="pb-2">Participio Pasado</th><th className="pb-2">Gerundio (-ing)</th></tr>
            </thead>
            <tbody>
              <tr><td className="pt-2 font-bold text-indigo-500">Get</td><td className="pt-2">Got</td><td className="pt-2">Gotten</td><td className="pt-2">Getting</td></tr>
            </tbody>
          </table>
        </div>
        
        <h4 className="font-semibold text-slate-600">Ejemplos por Tiempo Verbal</h4>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Presente:</strong> I get e-mails every day. (Recibo correos todos los días).</li>
          <li><strong>Pasado:</strong> I got 10 e-mails yesterday. (Recibí 10 correos ayer).</li>
          <li><strong>Presente Perfecto:</strong> I have got 8 e-mails today. (He recibido 8 correos hoy).</li>
          <li><strong>Presente Continuo:</strong> I am getting a new e-mail right now. (Estoy recibiendo un correo justo ahora).</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">2. "Get" como Proceso de Cambio (+ Adjetivo)</h3>
        <p>Cuando "get" se combina con un adjetivo, indica una transición de un estado a otro (convertirse en o ponerse).</p>
        <ul className="space-y-1">
          <li><strong>Get hungry:</strong> Dar hambre / Empezar a tener hambre</li>
          <li><strong>Get angry:</strong> Enojarse / Enfadarse</li>
          <li><strong>Get thirsty:</strong> Dar sed</li>
          <li><strong>Get cold:</strong> Enfriarse / Dar frío</li>
          <li><strong>Get hot:</strong> Calentarse / Dar calor</li>
          <li><strong>Get bored:</strong> Aburrirse</li>
          <li><strong>Get interested:</strong> Interesarse</li>
          <li><strong>Get tired:</strong> Cansarse</li>
          <li><strong>Get lost:</strong> Perderse</li>
          <li><strong>Get dressed:</strong> Vestirse</li>
          <li><strong>Get married:</strong> Casarse</li>
          <li><strong>Get divorced:</strong> Divorciarse</li>
          <li><strong>Get drunk:</strong> Emborracharse</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">3. "Get" + Lugar (Movimiento)</h3>
        <p>En este contexto, "get" suele significar llegar o moverse hacia un punto específico.</p>
        <ul className="space-y-1">
          <li><strong>Get home:</strong> Llegar a casa</li>
          <li><strong>Get there:</strong> Llegar allá</li>
          <li><strong>Get back:</strong> Regresar</li>
          <li><strong>Get in / Get into:</strong> Entrar (ej. en un coche)</li>
          <li><strong>Get out:</strong> Salir</li>
          <li><strong>Get on:</strong> Subirse (ej. al bus o tren)</li>
          <li><strong>Get off:</strong> Bajarse</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">4. Ejercicios Prácticos (Ejemplos Reales)</h3>
        <ol className="list-decimal pl-5 space-y-1 text-slate-600">
          <li>My baby is getting hungry. (A mi bebé le está dando hambre).</li>
          <li>I am getting thirsty. (Me está dando sed).</li>
          <li>It's getting cold. (Se está poniendo frío).</li>
          <li>It's getting hot. (Está haciendo calor).</li>
          <li>I'm getting tired of you. (Me estoy cansando de ti).</li>
          <li>Get dressed. We'll go out. (Vístete. Saldremos).</li>
          <li>I got married 5 years ago. (Me casé hace 5 años).</li>
        </ol>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-lg shadow-indigo-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">GUÍA DE USO: PHRASAL VERBS CON "GET"</h3>
        <p className="text-indigo-100 text-sm font-medium leading-relaxed relative z-10">
          Los phrasal verbs son combinaciones de un verbo y una preposición o adverbio que crean un significado nuevo. Son fundamentales para alcanzar fluidez en el idioma.
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">1. Movimiento y Transporte</h3>
        <p>Estas expresiones son comunes cuando hablamos de entrar o salir de vehículos y lugares.</p>
        <ul className="space-y-1">
          <li><strong>Get in / into:</strong> Entrar (Coches, taxis, casas pequeñas).</li>
          <li><strong>Get out (of):</strong> Salir (Salir de un coche o de una habitación).</li>
          <li><strong>Get on:</strong> Subirse (Autobuses, trenes, aviones, bicicletas).</li>
          <li><strong>Get off:</strong> Bajarse (Bajarse del transporte público).</li>
          <li><strong>Get away:</strong> Escapar / Irse (Irse de vacaciones o huir de un sitio).</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">2. Relaciones y Situaciones Cotidianas</h3>
        <p>Expresiones útiles para describir cómo nos llevamos con los demás o cómo enfrentamos problemas.</p>
        <ul className="space-y-1">
          <li><strong>Get along (with):</strong> Llevarse bien (I get along with my brother.)</li>
          <li><strong>Get over:</strong> Superar (Superar una enfermedad o una ruptura.)</li>
          <li><strong>Get by:</strong> Arreglárselas / Sobrevivir (Sobrevivir con poco dinero o conocimiento.)</li>
          <li><strong>Get together:</strong> Reunirse (Let's get together this weekend.)</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">3. Frases y Estructuras Comunes</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Get home:</strong> Llegar a casa.</li>
          <li><strong>Get there:</strong> Llegar allí.</li>
          <li><strong>Get back:</strong> Regresar.</li>
          <li><strong>Get to work:</strong> Llegar al trabajo / Empezar a trabajar.</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">4. Notas sobre "Get" + Adjetivos de Estado</h3>
        <p>Recordatorio de que "get + adjetivo" indica un cambio de estado:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Get ready:</strong> Prepararse.</li>
          <li><strong>Get dark:</strong> Oscurecer.</li>
          <li><strong>Get better:</strong> Mejorar.</li>
          <li><strong>Get worse:</strong> Empeorar.</li>
        </ul>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-emerald-600 text-white p-6 rounded-[2rem] shadow-lg shadow-emerald-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">GUÍA DE ESTUDIO: EXPRESIONES AVANZADAS</h3>
        <p className="text-emerald-100 text-sm font-medium leading-relaxed relative z-10">
          Este documento completa la serie de guías sobre el verbo "get", integrando las últimas expresiones, colocaciones y estructuras idiomáticas analizadas en clase.
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">1. "Get" con Sustantivos (Obtener / Comprar / Recibir)</h3>
        <p>Cuando "get" va seguido directamente de un objeto (sustantivo), su significado varía según el contexto.</p>
        <ul className="space-y-1">
          <li><strong>Get a job:</strong> Conseguir un trabajo (I need to get a job.)</li>
          <li><strong>Get a ticket:</strong> Comprar/Conseguir un boleto (Did you get the tickets?)</li>
          <li><strong>Get a message:</strong> Recibir un mensaje (I got your message last night.)</li>
          <li><strong>Get some sleep:</strong> Dormir un poco (Go home and get some sleep.)</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">2. Estructuras de "Get" en Conversación Diaria</h3>
        <p>Otras formas comunes de encontrar este verbo en situaciones cotidianas:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Get ready:</strong> Prepararse / Alistarse.</li>
          <li><strong>Get permission:</strong> Obtener permiso.</li>
          <li><strong>Get the impression:</strong> Tener la impresión.</li>
          <li><strong>Get a cold:</strong> Resfriarse.</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">3. "Get" como Sinónimo de Entender</h3>
        <p>En inglés coloquial, "get" se usa frecuentemente para indicar que se ha comprendido una idea o un chiste.</p>
        <ul className="space-y-1">
          <li><strong>I get it:</strong> Lo entiendo / Ya entiendo.</li>
          <li><strong>I don't get it:</strong> No lo entiendo.</li>
          <li><strong>Do you get what I mean?:</strong> ¿Entiendes lo que quiero decir?</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-slate-800">4. Resumen Visual de Phrasal Verbs Adicionales</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li><strong>Get through:</strong> Terminar algo difícil o contactar a alguien por teléfono.</li>
          <li><strong>Get across:</strong> Hacerse entender / Comunicar una idea claramente.</li>
          <li><strong>Get ahead:</strong> Progresar / Salir adelante (especialmente en el trabajo).</li>
        </ul>
      </div>

      <div className="pb-8 flex justify-center">
        <div className="w-16 h-1 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};
