import React from 'react';
import { motion } from 'motion/react';
import { Star, Zap, Info, ArrowRight } from 'lucide-react';

export const GenerallyGuide: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star size={120} />
        </div>
        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
          <Zap className="text-yellow-400" /> Core Verbs Mastery
        </h3>
        <p className="text-indigo-100 font-medium leading-relaxed">
          To Be, To Get, To Have y To Do son los pilares del inglés. Dominar sus formas en presente, pasado y futuro te dará la base para cualquier conversación.
        </p>
      </div>

      {/* Tables Section */}
      <div className="space-y-6">
        {[
          { title: "1. To Be (Ser o Estar)", color: "indigo", desc: "El más irregular y fundamental. Describe estados, identidades o ubicaciones.", rows: [
            { t: "Presente", f: "am / is / are", e: "I am in Bogotá." },
            { t: "Pasado", f: "was / were", e: "He was a developer." },
            { t: "Futuro", f: "will be", e: "We will be ready." }
          ]},
          { title: "2. To Get (Comodín)", color: "emerald", desc: "Cambia según el contexto: conseguir, llegar, volverse o entender.", rows: [
            { t: "Presente", f: "get / gets", e: "I get the logs." },
            { t: "Pasado", f: "got", e: "She got on the bus." },
            { t: "Futuro", f: "will get", e: "You will get a C1." }
          ]},
          { title: "3. To Have (Posesión/Auxiliar)", color: "amber", desc: "Fundamental para posesión y tiempos compuestos.", rows: [
            { t: "Presente", f: "have / has", e: "I have a meeting." },
            { t: "Pasado", f: "had", e: "We had a problem." },
            { t: "Futuro", f: "will have", e: "It will have impact." }
          ]},
          { title: "4. To Do (Acción/Auxiliar)", color: "rose", desc: "Acciones concretas y el rey de preguntas y negaciones.", rows: [
            { t: "Presente", f: "do / does", e: "I do my job." },
            { t: "Pasado", f: "did", e: "They did the test." },
            { t: "Futuro", f: "will do", e: "I will do the demo." }
          ]}
        ].map((v, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-2">
               <div className={`w-1.5 h-6 bg-${v.color}-500 rounded-full`} />
               <h4 className="text-lg font-black text-slate-800">{v.title}</h4>
            </div>
            <p className="text-slate-500 text-xs italic mb-4">{v.desc}</p>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiempo</th>
                      <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Forma</th>
                      <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.rows.map((r, ri) => (
                      <tr key={ri} className="border-b border-slate-50/50">
                        <td className="py-4 text-xs font-black text-slate-700">{r.t}</td>
                        <td className={`py-4 text-xs font-bold text-${v.color}-600`}>{r.f}</td>
                        <td className="py-4 text-xs text-slate-500 font-medium">{r.e}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
        <h3 className="text-xl font-black flex items-center gap-2">
          <Info className="text-indigo-400" /> Puntos Clave
        </h3>
        <div className="grid grid-cols-1 gap-4">
           <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">1. Futuro "Easy Mode"</h5>
              <p className="text-xs text-white/80 leading-relaxed">Para todos, el futuro es simplemente <span className="text-indigo-300 font-bold">WILL + infinitivo</span>. ¡No cambia por persona!</p>
           </div>
           <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">2. La "S" en Presente</h5>
              <p className="text-xs text-white/80 leading-relaxed">Para He, She, It: <span className="italic">is, gets, has, does</span>.</p>
           </div>
           <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">3. Auxiliares en Negación</h5>
              <ul className="text-xs text-white/80 space-y-1">
                <li><span className="text-rose-400">Presente:</span> I don't have / She doesn't get</li>
                <li><span className="text-rose-400">Pasado:</span> I didn't do / We didn't have</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};
