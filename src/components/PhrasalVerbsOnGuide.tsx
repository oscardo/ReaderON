import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Lightbulb, Target } from 'lucide-react';

export const PhrasalVerbsOnGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-lg shadow-indigo-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">RESUMEN MAESTRO: EL PODER DE "ON"</h3>
        <p className="text-indigo-100 text-sm font-medium leading-relaxed relative z-10">
          Fundamentalmente, "On" representa la presencia de contacto, el inicio de un flujo o la voluntad de no detenerse.
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-black text-slate-800 flex items-center gap-2">
          <Lightbulb size={20} className="text-amber-500" />
          Lógica de Oro para recordar ON:
        </h4>
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm text-slate-600">
            <span className="font-black text-indigo-500">1.</span>
            <span><strong>Mente "On":</strong> Estás conectado, enfocado y resolviendo problemas (Check on, Deal on).</span>
          </li>
          <li className="flex gap-3 text-sm text-slate-600">
            <span className="font-black text-indigo-500">2.</span>
            <span><strong>Sistemas "On":</strong> Hay flujo de energía o de datos (Log on, Switch on).</span>
          </li>
          <li className="flex gap-3 text-sm text-slate-600">
            <span className="font-black text-indigo-500">3.</span>
            <span><strong>Movimiento "On":</strong> La acción no tiene fin o estás sobre una plataforma de transporte (Keep on, Get on).</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-indigo-500">1. ON = EN ESTE MOMENTO / ACTIVO AHORA</h3>
        <p className="text-sm text-slate-600">En estos casos, "On" nos dice que una acción o estado se está ejecutando actualmente. Es el "switch" encendido de la realidad.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b"><th className="pb-2 text-indigo-600">Frase / Phrasal Verb</th><th className="pb-2">Traducción</th><th className="pb-2">Algo para recordar</th></tr>
            </thead>
            <tbody>
              <tr><td className="pt-2 font-bold">On the move</td><td className="pt-2">En movimiento</td><td className="pt-2 italic text-slate-500">Algo que no está estático; está fluyendo ahora.</td></tr>
              <tr><td className="pt-2 font-bold">On the rise</td><td className="pt-2">En ascenso</td><td className="pt-2 italic text-slate-500">Algo que está subiendo (precios, niveles, éxito).</td></tr>
              <tr><td className="pt-2 font-bold">On the run</td><td className="pt-2">Huyendo</td><td className="pt-2 italic text-slate-500">Alguien que está escapando activamente en este instante.</td></tr>
              <tr><td className="pt-2 font-bold">On fire</td><td className="pt-2">Ardiendo</td><td className="pt-2 italic text-slate-500">Literalmente quemándose o figuradamente "en racha".</td></tr>
              <tr><td className="pt-2 font-bold">On duty</td><td className="pt-2">Trabajando / De turno</td><td className="pt-2 italic text-slate-500">Estar conectado con tus obligaciones laborales ahora.</td></tr>
              <tr><td className="pt-2 font-bold">On sale</td><td className="pt-2">En venta / En oferta</td><td className="pt-2 italic text-slate-500">Un artículo que está disponible para compra ahora mismo.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-indigo-500">2. ON = SOBRE / PONERSE (CONTACTO FÍSICO)</h3>
        <p className="text-sm text-slate-600">Aquí "On" indica que algo entra en contacto con una superficie o con tu cuerpo (ropa/accesorios).</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">The cat is on the table</td><td className="pt-2 w-1/4">El gato está sobre la mesa</td><td className="pt-2 italic text-slate-500">Hay contacto físico entre el gato y la superficie.</td></tr>
              <tr><td className="pt-2 font-bold">Put on a jacket</td><td className="pt-2">Ponerse una chaqueta</td><td className="pt-2 italic text-slate-500">Llevar la prenda hacia tu cuerpo para que haga contacto.</td></tr>
              <tr><td className="pt-2 font-bold">Put on makeup</td><td className="pt-2">Maquillarse</td><td className="pt-2 italic text-slate-500">Aplicar producto sobre la superficie de la piel.</td></tr>
              <tr><td className="pt-2 font-bold">Put on sunscreen</td><td className="pt-2">Ponerse bloqueador</td><td className="pt-2 italic text-slate-500">Activar la protección sobre el cuerpo.</td></tr>
              <tr><td className="pt-2 font-bold">Put on shoes</td><td className="pt-2">Ponerse los zapatos</td><td className="pt-2 italic text-slate-500">Ajustar el calzado para que esté "activo" en tus pies.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-indigo-500">3. ON = SUBIRSE A (TRANSPORTE PÚBLICO / GRANDES SUPERFICIES)</h3>
        <p className="text-sm text-slate-600">Esta es tu regla de oro: Usamos "Get on" para vehículos donde usualmente puedes estar de pie o caminar, y para bicicletas/motos donde vas "encima".</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Get on the bus</td><td className="pt-2 w-1/4">Subirse al bus</td><td className="pt-2 italic text-slate-500">Entrar en contacto con la plataforma del bus.</td></tr>
              <tr><td className="pt-2 font-bold">Get on the train</td><td className="pt-2">Subirse al tren</td><td className="pt-2 italic text-slate-500">Entrar al vagón (superficie grande).</td></tr>
              <tr><td className="pt-2 font-bold">Get on a plane</td><td className="pt-2">Subirse a un avión</td><td className="pt-2 italic text-slate-500">Abordar la aeronave.</td></tr>
              <tr><td className="pt-2 font-bold">Get on the bike</td><td className="pt-2">Montarse en la bici</td><td className="pt-2 italic text-slate-500">Ponerse sobre el sillín (contacto directo).</td></tr>
              <tr><td className="pt-2 font-bold">Get on the rollercoaster</td><td className="pt-2">Subirse a la montaña rusa</td><td className="pt-2 italic text-slate-500">Entrar en el coche de la atracción.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] shadow-sm">
        <h4 className="font-black text-emerald-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
          <Target size={18} /> Tip para tu examen (Linguaskill)
        </h4>
        <div className="space-y-4 text-emerald-700 text-sm font-medium">
          <p>
            <strong>ON vs IN en transporte:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Usas <strong>ON</strong> para aquello que tiene "plataforma" o vas "encima": Bus, Train, Plane, Boat, Bike.</li>
            <li>Usas <strong>IN</strong> para vehículos pequeños donde tienes que "encerrarte": Car, Taxi, Truck, Van.</li>
          </ul>
          <div className="bg-white/50 p-4 rounded-xl border border-emerald-200 mt-2">
            <p className="font-black">RECUERDA:</p>
            <p>SI SE UTILIZA <strong>GOT ON</strong> = medio de transporte donde nos podemos mover (Bus, Avión)</p>
            <p>SI SE UTILIZA <strong>GOT IN</strong> = medio de transporte donde no nos podemos mover (Carro)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-indigo-500">ON = TRANSPORTE (SUPERFICIE / MOVIMIENTO)</h3>
        <p className="text-sm text-slate-600">Regla de Oro: Usamos ON para medios donde puedes caminar o estar de pie, y para aquellos donde vas "encima" (como la bici).</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Get on</td><td className="pt-2 w-1/4">Subirse</td><td className="pt-2 italic text-slate-500">La forma estándar para bus, tren o avión.</td></tr>
              <tr><td className="pt-2 font-bold">Hop on</td><td className="pt-2">Subirse de un salto</td><td className="pt-2 italic text-slate-500">Dar un pequeño brinco para subir rápido al bus.</td></tr>
              <tr><td className="pt-2 font-bold">Climb on</td><td className="pt-2">Subirse trepando</td><td className="pt-2 italic text-slate-500">Usar fuerza para subir (ej. a la parte trasera de un camión).</td></tr>
              <tr><td className="pt-2 font-bold">Jump on</td><td className="pt-2">Saltar a</td><td className="pt-2 italic text-slate-500">Subir con mucha prisa o impulso (ej. al tren en marcha).</td></tr>
              <tr><td className="pt-2 font-bold">Board on</td><td className="pt-2">Abordar</td><td className="pt-2 italic text-slate-500">Un término más formal para barcos o aviones.</td></tr>
              <tr><td className="pt-2 font-bold">Step on</td><td className="pt-2">Pisar / Subir de un paso</td><td className="pt-2 italic text-slate-500">Poner el pie en la plataforma del vehículo.</td></tr>
              <tr><td className="pt-2 font-bold">Ride on</td><td className="pt-2">Montar en</td><td className="pt-2 italic text-slate-500">Ir sobre algo que se mueve (bici, moto, caballo).</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-indigo-500">ON = CONTINUIDAD O SEGUIR</h3>
        <p className="text-sm text-slate-600">En estos casos, "On" funciona como un motor que mantiene la acción en marcha sin detenerse.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Carry on</td><td className="pt-2 w-1/4">Continuar</td><td className="pt-2 italic text-slate-500">Seguir adelante a pesar de las dificultades.</td></tr>
              <tr><td className="pt-2 font-bold">Keep on</td><td className="pt-2">Seguir haciendo algo</td><td className="pt-2 italic text-slate-500">No dejar de realizar una acción repetitiva.</td></tr>
              <tr><td className="pt-2 font-bold">Press on</td><td className="pt-2">Persistir</td><td className="pt-2 italic text-slate-500">Seguir avanzando con determinación y "presión".</td></tr>
              <tr><td className="pt-2 font-bold">Go on</td><td className="pt-2">Continuar / Suceder</td><td className="pt-2 italic text-slate-500">Que la vida o la acción sigan su curso.</td></tr>
              <tr><td className="pt-2 font-bold">Hang on</td><td className="pt-2">Continuar esperando</td><td className="pt-2 italic text-slate-500">Mantenerse "colgado" de la línea o la espera.</td></tr>
              <tr><td className="pt-2 font-bold">Hold on</td><td className="pt-2">Esperar / Mantenerse firme</td><td className="pt-2 italic text-slate-500">Aguantar un momento o sostenerse con fuerza.</td></tr>
              <tr><td className="pt-2 font-bold">Stay on</td><td className="pt-2">Permanecer</td><td className="pt-2 italic text-slate-500">No irse, quedarse activo en un lugar o puesto.</td></tr>
              <tr><td className="pt-2 font-bold">Run on</td><td className="pt-2">Continuar funcionando</td><td className="pt-2 italic text-slate-500">Seguir operando (ej. un motor o una idea).</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-indigo-500">ON = ENFOCADO / ATENCIÓN / INTELIGENCIA</h3>
        <p className="text-sm text-slate-600">En este matiz, "On" actúa como un punto de anclaje para tu mente o tus planes. Indica que algo es el centro de tu atención o la base de tu confianza.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Focus on</td><td className="pt-2 w-1/4">Enfocarse en</td><td className="pt-2 italic text-slate-500">Poner toda tu "lente" mental sobre un solo punto.</td></tr>
              <tr><td className="pt-2 font-bold">Concentrate on</td><td className="pt-2">Concentrarse en</td><td className="pt-2 italic text-slate-500">Mantener la atención fija, sin distracciones.</td></tr>
              <tr><td className="pt-2 font-bold">Insist on</td><td className="pt-2">Insistir en</td><td className="pt-2 italic text-slate-500">Mantenerse firme en una posición o demanda.</td></tr>
              <tr><td className="pt-2 font-bold">Rely on</td><td className="pt-2">Confiar / Depender de</td><td className="pt-2 italic text-slate-500">Poner tu seguridad "sobre" alguien o algo.</td></tr>
              <tr><td className="pt-2 font-bold">Work on</td><td className="pt-2">Trabajar en algo</td><td className="pt-2 italic text-slate-500">Dedicar esfuerzo activo a un proyecto o tarea.</td></tr>
              <tr><td className="pt-2 font-bold">Act on</td><td className="pt-2">Actuar en relación a</td><td className="pt-2 italic text-slate-500">Tomar medidas basadas en información recibida.</td></tr>
              <tr><td className="pt-2 font-bold">Agree on</td><td className="pt-2">Estar de acuerdo en</td><td className="pt-2 italic text-slate-500">Encontrar un punto común donde ambas mentes se "posan".</td></tr>
              <tr><td className="pt-2 font-bold">Answer on</td><td className="pt-2">Responder sobre algo</td><td className="pt-2 italic text-slate-500">Dar una explicación específica sobre un tema.</td></tr>
              <tr><td className="pt-2 font-bold">Bank on</td><td className="pt-2">Contar con / Confiar</td><td className="pt-2 italic text-slate-500">Apostar a que algo sucederá (como confiar en un banco).</td></tr>
              <tr><td className="pt-2 font-bold">Depend on</td><td className="pt-2">Depender de</td><td className="pt-2 italic text-slate-500">Estar condicionado por algo externo para funcionar.</td></tr>
              <tr><td className="pt-2 font-bold">Live on</td><td className="pt-2">Vivir de (un recurso)</td><td className="pt-2 italic text-slate-500">Mantenerse activo gracias a un ingreso o alimento.</td></tr>
              <tr><td className="pt-2 font-bold">Count on</td><td className="pt-2">Contar con alguien</td><td className="pt-2 italic text-slate-500">Saber que tienes el apoyo de alguien en quien confías.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Tips para aplicar en tu entorno (Software & MBA)</h4>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h5 className="font-bold text-slate-800 mb-2">Work on vs. Focus on</h5>
          <p className="text-sm text-slate-600 mb-2">
            Usas <strong>Work on</strong> para la ejecución: <br/>
            <span className="italic text-slate-500">"I am working on the new API authentication."</span>
          </p>
          <p className="text-sm text-slate-600">
            Usas <strong>Focus on</strong> para la prioridad: <br/>
            <span className="italic text-slate-500">"This sprint, we need to focus on performance."</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h5 className="font-bold text-slate-800 mb-2">Rely on / Depend on</h5>
          <p className="text-sm text-slate-600">
            Como ingeniero, los usas para hablar de arquitecturas: <br/>
            <span className="italic text-slate-500">"Our microservice depends on the main database."</span> o <br/>
            <span className="italic text-slate-500">"We rely on n8n for our automated workflows."</span>
          </p>
        </div>
      </div>

      <div className="pb-8 flex justify-center">
        <div className="w-16 h-1 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};
