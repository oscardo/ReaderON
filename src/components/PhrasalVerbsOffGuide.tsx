import { motion } from 'motion/react';
import { Sparkles, Target } from 'lucide-react';

export const PhrasalVerbsOffGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-amber-500 text-white p-6 rounded-[2rem] shadow-lg shadow-amber-200 relative overflow-hidden"
      >
        <Sparkles className="absolute top-4 right-4 text-white/20" size={64} />
        <h3 className="text-xl font-black mb-2 relative z-10">OFF = SEPARARSE, DESACTIVAR</h3>
        <p className="text-amber-100 text-sm font-medium leading-relaxed relative z-10">
          Off = separarse, desactivación, alejarse, sonar / estrellarse
        </p>
      </motion.div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-black text-slate-800 flex items-center gap-2">
          <Target size={20} className="text-amber-500" />
          Reglas Principales
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium text-sm">
          <li>OFF = SEPARACIÓN FÍSICA (CAER O SALTAR)</li>
          <li>OFF = SEPARACIÓN TOTAL (CORTAR / AMPUTAR)</li>
          <li>OFF = DESACTIVACIÓN / ALEJARSE / SONAR</li>
          <li>OFF = DESACTIVACIÓN</li>
          <li>OFF = SONAR / ESTALLAR (GO OFF)</li>
          <li>OFF = ALEJARSE</li>
        </ul>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4 space-y-2">
          <p><strong>I fell out my bike</strong> ❌</p>
          <p><strong>I fell out ladder</strong> (me caí de la escalera… pero de algo .. ladder (escalera móvil))</p>
          <p><strong>I fell down stairs</strong> (me caí en la escalera… pero no de algo … stairs (escalera fija))</p>
        </div>

        <p className="text-indigo-600 font-bold p-4 bg-indigo-50 rounded-xl mt-4">
          Cuando usamos OFF, la clave es la SEPARACIÓN. Imagina que algo estaba sobre una superficie o conectado a algo, y de repente esa conexión se rompe.
        </p>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-amber-500">1. OFF = SEPARACIÓN FÍSICA (CAER O SALTAR)</h3>
        <p>En estos casos, "Off" indica que dejas de estar sobre una superficie (como una bicicleta, un columpio o un techo).</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b"><th className="pb-2 text-amber-600">Frase / Phrasal Verb</th><th className="pb-2">Traducción</th><th className="pb-2">Algo para recordar</th></tr>
            </thead>
            <tbody>
              <tr><td className="pt-2 font-bold">Fall off the swing</td><td className="pt-2">Caerse del columpio</td><td className="pt-2 italic text-slate-500">Te "separas" del asiento del columpio.</td></tr>
              <tr><td className="pt-2 font-bold">Fall off the bicycle</td><td className="pt-2">Caerse de la bicicleta</td><td className="pt-2 italic text-slate-500">Pierdes el contacto con el sillín o los pedales.</td></tr>
              <tr><td className="pt-2 font-bold">Fall off the ladder</td><td className="pt-2">Caerse de la escalera</td><td className="pt-2 italic text-slate-500">Muy bien: es una caída desde un objeto móvil.</td></tr>
              <tr><td className="pt-2 font-bold">Jump off the rock</td><td className="pt-2">Saltar de la roca</td><td className="pt-2 italic text-slate-500">Un salto voluntario para "separarte" de la piedra.</td></tr>
              <tr><td className="pt-2 font-bold">Jump off the bridge</td><td className="pt-2">Saltar de un puente</td><td className="pt-2 italic text-slate-500">Movimiento desde la estructura hacia el vacío.</td></tr>
              <tr><td className="pt-2 font-bold">Jump off the building</td><td className="pt-2">Saltar de un edificio</td><td className="pt-2 italic text-slate-500">Dejar la superficie del edificio.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-amber-500">2. OFF = SEPARACIÓN TOTAL (CORTAR / AMPUTAR)</h3>
        <p>Aquí "Off" añade un matiz de "desprender" o "quitar completamente". No es solo un corte superficial, es una separación total.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Cut off your finger</td><td className="pt-2 w-1/4">Cortarte un dedo</td><td className="pt-2 italic text-slate-500">El dedo queda separado de la mano.</td></tr>
              <tr><td className="pt-2 font-bold">Cut off the branch</td><td className="pt-2">Cortar la rama</td><td className="pt-2 italic text-slate-500">La rama ya no forma parte del árbol.</td></tr>
              <tr><td className="pt-2 font-bold">Cut off her hair</td><td className="pt-2">Cortarle el cabello</td><td className="pt-2 italic text-slate-500">El cabello se desprende de la cabeza.</td></tr>
              <tr><td className="pt-2 font-bold">Cut off his leg</td><td className="pt-2">Cortarle la pierna</td><td className="pt-2 italic text-slate-500">Separación total de la extremidad.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-amber-500">3 & 4. OFF = DESACTIVACIÓN / ALEJARSE</h3>
        <p>Además de la separación física, "Off" se usa para el estado de "apagado" o eventos repentinos y para indicar que un dispositivo, servicio o flujo de energía ha sido interrumpido.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Turn off</td><td className="pt-2 w-1/4">Apagar / Desactivar</td><td className="pt-2 italic text-slate-500">El estándar para luces y dispositivos con interruptor.</td></tr>
              <tr><td className="pt-2 font-bold">Take off</td><td className="pt-2">Despegar / Quitarse</td><td className="pt-2 italic text-slate-500">El avión se separa del suelo; la ropa se separa del cuerpo.</td></tr>
              <tr><td className="pt-2 font-bold">Keep off</td><td className="pt-2">Mantenerse alejado</td><td className="pt-2 italic text-slate-500">No entrar en contacto con una superficie.</td></tr>
              <tr><td className="pt-2 font-bold">Log off</td><td className="pt-2">Cerrar sesión</td><td className="pt-2 italic text-slate-500">"Desconectarse" de un sistema o computadora.</td></tr>
              <tr><td className="pt-2 font-bold">Pull off</td><td className="pt-2">Desconectar / Lograr</td><td className="pt-2 italic text-slate-500">Literalmente "halar" para desconectar (como un generador).</td></tr>
              <tr><td className="pt-2 font-bold">Shut off</td><td className="pt-2">Cerrar / Bloquear</td><td className="pt-2 italic text-slate-500">Se usa para flujos constantes como agua, gas o calefacción.</td></tr>
              <tr><td className="pt-2 font-bold">Switch off</td><td className="pt-2">Apagar (interruptor)</td><td className="pt-2 italic text-slate-500">Muy similar a turn off, pero enfatiza la acción del switch.</td></tr>
              <tr><td className="pt-2 font-bold">Cut off</td><td className="pt-2">Interrumpir / Cortar</td><td className="pt-2 italic text-slate-500">Cuando un servicio se detiene (ej. por falta de pago).</td></tr>
              <tr><td className="pt-2 font-bold">Call off</td><td className="pt-2">Cancelar</td><td className="pt-2 italic text-slate-500">Desactivar un evento o plan (una reunión, una boda).</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mt-4 space-y-3">
          <h4 className="font-bold text-amber-700">Aclaración Clave:</h4>
          <ul className="list-disc pl-5 space-y-1 text-amber-800 text-xs">
            <li><strong>Fall off:</strong> Te caes de algo (una bicicleta, un caballo, un sofá).</li>
            <li><strong>Fall down:</strong> Te caes en un lugar o te desplomas (en la calle, por las escaleras fijas).</li>
            <li><strong>Fall out:</strong> Te caes desde el interior de algo (de la cama, de un carro).</li>
          </ul>
          
          <h4 className="font-bold text-amber-700 mt-4">Matices Importantes:</h4>
          <ul className="list-disc pl-5 space-y-2 text-amber-800 text-xs">
            <li><strong>Shut off vs. Cut off:</strong><br/>Shut off: Es algo que tú haces manualmente (Shut off the faucet).<br/>Cut off: Interrupción externa (The company cut off my internet).</li>
            <li><strong>Turn off vs. Switch off:</strong><br/>Son intercambiables, pero Switch off se siente más técnico (componente físico).</li>
            <li><strong>Call off:</strong><br/>Uso extraordinario. Si una reunión ya no va, dices "call off the meeting".</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-amber-500">5. OFF = SONAR / ESTALLAR (GO OFF)</h3>
        <p>En estos casos, "Go off" describe un evento ruidoso o violento que ocurre de repente. Es como si la energía "saltara" hacia afuera.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">The alarm went off</td><td className="pt-2 w-1/4">La alarma sonó</td><td className="pt-2 italic text-slate-500">Imagina que el sonido "sale" disparado del reloj.</td></tr>
              <tr><td className="pt-2 font-bold">The bomb went off</td><td className="pt-2">La bomba estalló</td><td className="pt-2 italic text-slate-500">Una liberación súbita y violenta de energía.</td></tr>
              <tr><td className="pt-2 font-bold">The fireworks went off</td><td className="pt-2">Los fuegos estallaron</td><td className="pt-2 italic text-slate-500">Acción de dispararse y brillar en el cielo.</td></tr>
              <tr><td className="pt-2 font-bold">The timer went off</td><td className="pt-2">El temporizador sonó</td><td className="pt-2 italic text-slate-500">El aviso de que algo está listo.</td></tr>
              <tr><td className="pt-2 font-bold">The siren went off</td><td className="pt-2">La sirena sonó</td><td className="pt-2 italic text-slate-500">Un sonido de alerta que se activa con fuerza.</td></tr>
              <tr><td className="pt-2 font-bold">The gun went off</td><td className="pt-2">El arma se disparó</td><td className="pt-2 italic text-slate-500">El proyectil "sale" del cañón inesperadamente.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2"><strong>Dato Clave:</strong> Aunque la alarma "goes off" (suena), para que deje de molestarte tienes que "turn it off" (apagarla).</p>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-black text-lg text-amber-500">6. OFF = ALEJARSE</h3>
        <p>En estos casos, "Off" indica el inicio de un movimiento que te separa de una persona, objeto o lugar determinado.</p>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              <tr><td className="pt-2 font-bold w-1/4">Back off</td><td className="pt-2 w-1/4">Retroceder / Alejarse</td><td className="pt-2 italic text-slate-500">Dar pasos hacia atrás para alejarse de una situación.</td></tr>
              <tr><td className="pt-2 font-bold">Move off</td><td className="pt-2">Quitarse / Apartarse</td><td className="pt-2 italic text-slate-500">Dejar de ocupar un lugar físico (banco o asiento).</td></tr>
              <tr><td className="pt-2 font-bold">Step off</td><td className="pt-2">Bajarse / Dar un paso</td><td className="pt-2 italic text-slate-500">Poner un pie fuera de algo (bus, plataforma).</td></tr>
              <tr><td className="pt-2 font-bold">Walk off</td><td className="pt-2">Irse caminando</td><td className="pt-2 italic text-slate-500">Abandonar un lugar a pie, a veces de forma repentina.</td></tr>
              <tr><td className="pt-2 font-bold">Run off</td><td className="pt-2">Salir corriendo</td><td className="pt-2 italic text-slate-500">Alejarse a toda velocidad, usualmente huyendo.</td></tr>
              <tr><td className="pt-2 font-bold">Drive off</td><td className="pt-2">Irse en coche</td><td className="pt-2 italic text-slate-500">Arrancar el vehículo y marcharse del lugar.</td></tr>
              <tr><td className="pt-2 font-bold">Come off</td><td className="pt-2">Salirse / Quitarse</td><td className="pt-2 italic text-slate-500">Cuando algo se desprende o tú te alejas de una idea.</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mt-4 space-y-3">
          <h4 className="font-bold text-amber-700">Puntos clave para tu aprendizaje:</h4>
          <ul className="list-disc pl-5 space-y-2 text-amber-800 text-xs">
            <li><strong>Walk away vs. Walk off:</strong><br/>Walk away: Es simplemente caminar en dirección opuesta.<br/>Walk off: Suele implicar que te vas de un lugar donde deberías estar o que te vas molesto.</li>
            <li><strong>Back off en el trabajo:</strong><br/>Se usa mucho de forma figurada. Si alguien te presiona: "I need you to back off a little".</li>
            <li><strong>Step off:</strong><br/>Recuerda tu regla: Step off the bus (te separas del vehículo móvil).</li>
          </ul>
        </div>
      </div>

      <div className="pb-8 flex justify-center">
        <div className="w-16 h-1 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};
