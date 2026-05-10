import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const PhrasalVerbsUpOutGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-lg shadow-indigo-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">UP = INTENSIÓN, MÁS, TODO!</h3>
        <p className="text-indigo-100 text-sm font-medium leading-relaxed relative z-10">
          En muchos de estos casos, añadir "Up" al verbo no cambia el significado básico, sino que le añade una capa de completitud (hacerlo al 100%), intensidad o finalización.
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-indigo-600">Phrasal Verb</th>
                <th className="pb-2">Pronunciación</th>
                <th className="pb-2">Traducción</th>
                <th className="pb-2">Algo para recordar</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="pt-2 font-bold">Clean up</td><td className="pt-2">/kliːn ʌp/</td><td className="pt-2">Limpiar completamente</td><td className="pt-2 italic text-slate-500">Piensa en "limpieza profunda", no solo pasar el trapo.</td></tr>
              <tr><td className="pt-2 font-bold">Finish up</td><td className="pt-2">/ˈfɪnɪʃ ʌp/</td><td className="pt-2">Terminar completamente</td><td className="pt-2 italic text-slate-500">Es dar los últimos toques para cerrar un ciclo.</td></tr>
              <tr><td className="pt-2 font-bold">Wake up</td><td className="pt-2">/weɪk ʌp/</td><td className="pt-2">Despertarse</td><td className="pt-2 italic text-slate-500">El proceso de "subir" de la inconsciencia al estado alerta.</td></tr>
              <tr><td className="pt-2 font-bold">Stand up</td><td className="pt-2">/stænd ʌp/</td><td className="pt-2">Ponerse de pie</td><td className="pt-2 italic text-slate-500">Movimiento físico hacia arriba.</td></tr>
              <tr><td className="pt-2 font-bold">Sit up</td><td className="pt-2">/sɪt ʌp/</td><td className="pt-2">Sentarse derecho</td><td className="pt-2 italic text-slate-500">"Subir" la postura para estar erguido.</td></tr>
              <tr><td className="pt-2 font-bold">Speed up</td><td className="pt-2">/spiːd ʌp/</td><td className="pt-2">Acelerar</td><td className="pt-2 italic text-slate-500">Ir a "más" velocidad.</td></tr>
              <tr><td className="pt-2 font-bold">Open up</td><td className="pt-2">/ˈəʊpən ʌp/</td><td className="pt-2">Abrir completamente / Sincerarse</td><td className="pt-2 italic text-slate-500">Abrir algo del todo o abrir el corazón.</td></tr>
              <tr><td className="pt-2 font-bold">Dress up</td><td className="pt-2">/dres ʌp/</td><td className="pt-2">Vestirse elegantemente</td><td className="pt-2 italic text-slate-500">"Subir" el nivel de tu ropa (disfraz o gala).</td></tr>
              <tr><td className="pt-2 font-bold">Hurry up</td><td className="pt-2">/ˈhʌri ʌp/</td><td className="pt-2">Apurarse</td><td className="pt-2 italic text-slate-500">Meterle "más" prisa a lo que haces.</td></tr>
              <tr><td className="pt-2 font-bold">Fill up</td><td className="pt-2">/fɪl ʌp/</td><td className="pt-2">Llenar completamente</td><td className="pt-2 italic text-slate-500">Hasta el tope, que ya no quepa "más".</td></tr>
              <tr><td className="pt-2 font-bold">Break up</td><td className="pt-2">/breɪk ʌp/</td><td className="pt-2">Terminar (relación)</td><td className="pt-2 italic text-slate-500">Romper en pedazos algo que estaba unido.</td></tr>
              <tr><td className="pt-2 font-bold">Tie up</td><td className="pt-2">/taɪ ʌp/</td><td className="pt-2">Atar completamente</td><td className="pt-2 italic text-slate-500">Dejar algo bien asegurado con nudos.</td></tr>
              <tr><td className="pt-2 font-bold">Tidy up</td><td className="pt-2">/ˈtaɪdi ʌp/</td><td className="pt-2">Ordenar completamente</td><td className="pt-2 italic text-slate-500">Poner cada cosa en su lugar de forma impecable.</td></tr>
              <tr><td className="pt-2 font-bold">Call up</td><td className="pt-2">/kɔːl ʌp/</td><td className="pt-2">Llamar por teléfono</td><td className="pt-2 italic text-slate-500">Imagina "levantar" el teléfono para marcar.</td></tr>
              <tr><td className="pt-2 font-bold">Clear up</td><td className="pt-2">/klɪər ʌp/</td><td className="pt-2">Aclarar (confusión/clima)</td><td className="pt-2 italic text-slate-500">Cuando las nubes o dudas se "van hacia arriba" y sale el sol.</td></tr>
              <tr><td className="pt-2 font-bold">Warm up</td><td className="pt-2">/wɔːm ʌp/</td><td className="pt-2">Calentar</td><td className="pt-2 italic text-slate-500">"Subir" la temperatura del cuerpo.</td></tr>
              <tr><td className="pt-2 font-bold">Lock up</td><td className="pt-2">/lɒk ʌp/</td><td className="pt-2">Cerrar con llave / Asegurar</td><td className="pt-2 italic text-slate-500">Cerrar todo para que quede totalmente protegido.</td></tr>
              <tr><td className="pt-2 font-bold">Speak up</td><td className="pt-2">/spiːk ʌp/</td><td className="pt-2">Hablar más fuerte / Opinar</td><td className="pt-2 italic text-slate-500">"Subir" el volumen de tu voz.</td></tr>
              <tr><td className="pt-2 font-bold">Check up</td><td className="pt-2">/tʃek ʌp/</td><td className="pt-2">Chequeo médico / Revisión</td><td className="pt-2 italic text-slate-500">Una revisión completa de pies a cabeza.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-rose-500 text-white p-6 rounded-[2rem] shadow-lg shadow-rose-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">OUT = SALIR, SACAR, AFUERA</h3>
        <p className="text-rose-100 text-sm font-medium leading-relaxed relative z-10">
          El uso de "Out" refuerza la idea de movimiento hacia el exterior o de realizar una acción hacia afuera de un límite físico o figurado.
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b"><th className="pb-2 text-rose-500">Phrasal Verb</th><th className="pb-2">Traducción</th><th className="pb-2">Algo para recordar</th></tr>
            </thead>
            <tbody>
              <tr><td className="pt-2 font-bold">Go out</td><td className="pt-2">Salir</td><td className="pt-2 italic text-slate-500">Ir de adentro hacia afuera (ej. salir de fiesta).</td></tr>
              <tr><td className="pt-2 font-bold">Get out</td><td className="pt-2">Salir / Escapar</td><td className="pt-2 italic text-slate-500">Lograr salir de un lugar cerrado o vehículo.</td></tr>
              <tr><td className="pt-2 font-bold">Come out</td><td className="pt-2">Salir (hacia aquí)</td><td className="pt-2 italic text-slate-500">Cuando algo sale de donde estaba escondido o guardado.</td></tr>
              <tr><td className="pt-2 font-bold">Move out</td><td className="pt-2">Mudarse (irse)</td><td className="pt-2 italic text-slate-500">Sacar tus cosas de una casa para vivir en otra.</td></tr>
              <tr><td className="pt-2 font-bold">Back out</td><td className="pt-2">Retroceder / Arrepentirse</td><td className="pt-2 italic text-slate-500">Salir de un compromiso o retroceder el auto.</td></tr>
              <tr><td className="pt-2 font-bold">Pop out</td><td className="pt-2">Salir de repente</td><td className="pt-2 italic text-slate-500">Como una palomita de maíz saliendo de la olla.</td></tr>
              <tr><td className="pt-2 font-bold">Climb out</td><td className="pt-2">Salir trepando</td><td className="pt-2 italic text-slate-500">Salir de un lugar (como un pozo) usando pies y manos.</td></tr>
              <tr><td className="pt-2 font-bold">Break out</td><td className="pt-2">Fugarse / Estallar</td><td className="pt-2 italic text-slate-500">Salir a la fuerza (ej. de una prisión o una guerra).</td></tr>
              <tr><td className="pt-2 font-bold">Bring out</td><td className="pt-2">Sacar / Hacer relucir</td><td className="pt-2 italic text-slate-500">Traer algo desde adentro hacia la vista de todos.</td></tr>
              <tr><td className="pt-2 font-bold">Hand out</td><td className="pt-2">Repartir / Entregar</td><td className="pt-2 italic text-slate-500">Pasar cosas de tu mano a las manos de otros (afuera).</td></tr>
              <tr><td className="pt-2 font-bold">Take out</td><td className="pt-2">Sacar / Llevar fuera</td><td className="pt-2 italic text-slate-500">Tomar algo y ponerlo en el exterior (ej. sacar la basura).</td></tr>
              <tr><td className="pt-2 font-bold">Throw out</td><td className="pt-2">Tirar / Expulsar</td><td className="pt-2 italic text-slate-500">Lanzar algo hacia afuera porque ya no sirve.</td></tr>
              <tr><td className="pt-2 font-bold">Leave out</td><td className="pt-2">Excluir / Omitir</td><td className="pt-2 italic text-slate-500">Dejar algo fuera de una lista o de un grupo.</td></tr>
              <tr><td className="pt-2 font-bold">Eat out</td><td className="pt-2">Comer fuera</td><td className="pt-2 italic text-slate-500">Salir de casa para comer en un restaurante.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-lg mt-6 text-rose-500">OUT = DE MANERA EXTRAORDINARIA</h3>
        <p>En estos casos, "Out" añade un matiz de profundidad, atención extra o una reacción intensa que sale del estado normal.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Help out</td><td className="pt-2 w-1/4">Ayudar (en un apuro)</td><td className="pt-2 italic text-slate-500">No es solo ayudar, es "echar una mano" en una situación específica.</td></tr>
              <tr><td className="pt-2 font-bold">Hear out</td><td className="pt-2">Escuchar hasta el final</td><td className="pt-2 italic text-slate-500">Escuchar a alguien "completamente" antes de juzgar.</td></tr>
              <tr><td className="pt-2 font-bold">Freak out</td><td className="pt-2">Volverse loco / Asustarse</td><td className="pt-2 italic text-slate-500">Una reacción emocional que se desborda hacia afuera.</td></tr>
              <tr><td className="pt-2 font-bold">Look out</td><td className="pt-2">Ver con cuidado / ¡Cuidado!</td><td className="pt-2 italic text-slate-500">Proyectar la vista hacia afuera para detectar un peligro.</td></tr>
              <tr><td className="pt-2 font-bold">Watch out</td><td className="pt-2">Ver con cuidado / Vigilar</td><td className="pt-2 italic text-slate-500">Estar en alerta máxima sobre lo que sucede afuera.</td></tr>
              <tr><td className="pt-2 font-bold">Check out</td><td className="pt-2">Revisar / Mirar algo</td><td className="pt-2 italic text-slate-500">Salir de la duda examinando algo con atención.</td></tr>
              <tr><td className="pt-2 font-bold">Search out</td><td className="pt-2">Investigar / Localizar</td><td className="pt-2 italic text-slate-500">Buscar algo que es difícil de encontrar hasta hallarlo.</td></tr>
              <tr><td className="pt-2 font-bold">Seek out</td><td className="pt-2">Buscar activamente</td><td className="pt-2 italic text-slate-500">Ir tras algo de manera deliberada y extraordinaria.</td></tr>
              <tr><td className="pt-2 font-bold">Try out</td><td className="pt-2">Probar / Poner a prueba</td><td className="pt-2 italic text-slate-500">Probar algo para ver si funciona "en el mundo exterior".</td></tr>
              <tr><td className="pt-2 font-bold">Point out</td><td className="pt-2">Señalar / Indicar</td><td className="pt-2 italic text-slate-500">Hacer que algo destaque para que los demás lo vean.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-lg mt-6 text-rose-500">OUT = SALIR DE TI / CON FUERZA</h3>
        <p>En estos casos, "Out" añade un matiz de proyectar hacia afuera con intensidad o claridad, rompiendo la barrera de lo interno.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Fill out</td><td className="pt-2 w-1/4">Completar (un formulario)</td><td className="pt-2 italic text-slate-500">"Sacar" la información de tu cabeza y ponerla en el papel.</td></tr>
              <tr><td className="pt-2 font-bold">Write out</td><td className="pt-2">Escribir (detalladamente)</td><td className="pt-2 italic text-slate-500">Escribir algo por completo, de principio a fin.</td></tr>
              <tr><td className="pt-2 font-bold">Opt out</td><td className="pt-2">Excluirse / No participar</td><td className="pt-2 italic text-slate-500">La fuerza de decidir "salirse" de un grupo o plan.</td></tr>
              <tr><td className="pt-2 font-bold">Find out</td><td className="pt-2">Descubrir</td><td className="pt-2 italic text-slate-500">Cuando la verdad "sale" a la luz y tú la encuentras.</td></tr>
              <tr><td className="pt-2 font-bold">Figure out</td><td className="pt-2">Resolver / Entender</td><td className="pt-2 italic text-slate-500">Sacar la solución de un problema después de mucho pensar.</td></tr>
              <tr><td className="pt-2 font-bold">Pick out</td><td className="pt-2">Seleccionar / Distinguir</td><td className="pt-2 italic text-slate-500">Elegir algo con fuerza entre muchas opciones.</td></tr>
              <tr><td className="pt-2 font-bold">Sort out</td><td className="pt-2">Ordenar / Resolver un lío</td><td className="pt-2 italic text-slate-500">Poner orden a un caos para que la solución "salga".</td></tr>
              <tr><td className="pt-2 font-bold">Work out</td><td className="pt-2">Ejercitar / Funcionar</td><td className="pt-2 italic text-slate-500">Sacar la energía física o lograr que un plan resulte bien.</td></tr>
              <tr><td className="pt-2 font-bold">Scream out</td><td className="pt-2">Gritar (con fuerza)</td><td className="pt-2 italic text-slate-500">Un grito que sale de tus pulmones con mucha potencia.</td></tr>
              <tr><td className="pt-2 font-bold">Shout out</td><td className="pt-2">Gritar / Reconocimiento</td><td className="pt-2 italic text-slate-500">Proyectar la voz hacia afuera para que todos oigan.</td></tr>
              <tr><td className="pt-2 font-bold">Cry out</td><td className="pt-2">Gritar / Clamar</td><td className="pt-2 italic text-slate-500">Un grito o llanto de auxilio que sale con desesperación.</td></tr>
              <tr><td className="pt-2 font-bold">Call out</td><td className="pt-2">Llamar / Exponer a alguien</td><td className="pt-2 italic text-slate-500">Decir un nombre en voz alta o señalar el error de alguien.</td></tr>
              <tr><td className="pt-2 font-bold">Speak out</td><td className="pt-2">Hablar abiertamente</td><td className="pt-2 italic text-slate-500">Salir del silencio para defender una opinión con fuerza.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-lg mt-6 text-rose-500">OUT = AGOTARSE, LLEGAR A SU LÍMITE</h3>
        <p>En estos casos, "Out" actúa como un punto final. Indica que la energía, el recurso o la existencia de algo se ha consumido totalmente.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Stress out</td><td className="pt-2 w-1/4">Estresarse</td><td className="pt-2 italic text-slate-500">Cuando tu paciencia y energía mental llegan al límite.</td></tr>
              <tr><td className="pt-2 font-bold">Burn out</td><td className="pt-2">Agotarse (exceso de trabajo)</td><td className="pt-2 italic text-slate-500">Como una vela que se quema hasta que no queda nada.</td></tr>
              <tr><td className="pt-2 font-bold">Sell out</td><td className="pt-2">Agotarse (ventas)</td><td className="pt-2 italic text-slate-500">Cuando ya no queda ni un solo producto en la tienda.</td></tr>
              <tr><td className="pt-2 font-bold">Wear out</td><td className="pt-2">Desgastarse</td><td className="pt-2 italic text-slate-500">Algo que se usa tanto que queda inservible.</td></tr>
              <tr><td className="pt-2 font-bold">Run out</td><td className="pt-2">Agotarse (sin algo)</td><td className="pt-2 italic text-slate-500">Cuando el contador llega a cero (ej. quedarse sin leche).</td></tr>
              <tr><td className="pt-2 font-bold">Knock out</td><td className="pt-2">Noquearse</td><td className="pt-2 italic text-slate-500">Quedar fuera de combate o inconsciente (fuera de juego).</td></tr>
              <tr><td className="pt-2 font-bold">Pass out</td><td className="pt-2">Desmayarse</td><td className="pt-2 italic text-slate-500">Perder el conocimiento, "salirse" de la conciencia.</td></tr>
              <tr><td className="pt-2 font-bold">Blow out</td><td className="pt-2">Explotar / Apagar soplando</td><td className="pt-2 italic text-slate-500">Una llanta que llega a su límite o una vela que se extingue.</td></tr>
              <tr><td className="pt-2 font-bold">Wipe out</td><td className="pt-2">Aniquilarse / Borrar</td><td className="pt-2 italic text-slate-500">Eliminar algo por completo, como si nunca hubiera existido.</td></tr>
              <tr><td className="pt-2 font-bold">Put out</td><td className="pt-2">Apagarse (fuego/luz)</td><td className="pt-2 italic text-slate-500">Eliminar la llama o la fuente de luz.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-lg mt-6 text-rose-500">OUT = QUITAR / SACAR</h3>
        <p>En estos casos, "Out" enfatiza la eliminación de un elemento o su separación física de un conjunto o superficie.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Tear out</td><td className="pt-2 w-1/4">Rasgar / Arrancar</td><td className="pt-2 italic text-slate-500">Arrancar una hoja de un cuaderno.</td></tr>
              <tr><td className="pt-2 font-bold">Clean out</td><td className="pt-2">Limpiar (vaciando)</td><td className="pt-2 italic text-slate-500">Sacar todo lo que hay dentro, no solo la superficie.</td></tr>
              <tr><td className="pt-2 font-bold">Wash out</td><td className="pt-2">Lavar (quitar mancha)</td><td className="pt-2 italic text-slate-500">Usar agua para "sacar" la suciedad de un tejido.</td></tr>
              <tr><td className="pt-2 font-bold">Cut out</td><td className="pt-2">Recortar / Eliminar</td><td className="pt-2 italic text-slate-500">Quitar una pieza de un papel o eliminar un hábito.</td></tr>
              <tr><td className="pt-2 font-bold">Wipe out</td><td className="pt-2">Limpiar / Borrar</td><td className="pt-2 italic text-slate-500">Pasar un trapo para quitar por completo una mancha.</td></tr>
              <tr><td className="pt-2 font-bold">Dry out</td><td className="pt-2">Secar</td><td className="pt-2 italic text-slate-500">Quitar toda la humedad de algo hasta que quede seco.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] shadow-sm">
        <h4 className="text-xl font-black text-rose-600 text-center uppercase tracking-widest mb-2">
          RESUMEN MAESTRO: EL PODER DE "OUT"
        </h4>
        <p className="text-center font-medium text-rose-800">El uso de "Out" siempre implica un movimiento hacia el exterior, ya sea físico, mental, de esfuerzo o de agotamiento de recursos.</p>
      </div>

      <div className="pb-8 flex justify-center">
        <div className="w-16 h-1 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};
