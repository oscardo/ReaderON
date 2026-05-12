import React from 'react';
import { motion } from 'motion/react';
import { Target, Sparkles, MapPin, Box, MoveRight, Layers, Info, Search, Minimize2, Maximize2 } from 'lucide-react';

export const AtInOnGuide: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Zoom Effect Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden border-2 border-slate-700/50">
        <div className="absolute top-0 right-0 p-6 opacity-20">
          <Search size={120} />
        </div>
        <div className="relative z-10 space-y-4">
           <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full w-fit text-[9px] font-black uppercase tracking-widest border border-indigo-500/30">
              <Sparkles size={12} />
              The Zoom Effect
           </div>
           <h2 className="text-3xl font-black tracking-tight leading-none uppercase">
             AT <span className="text-slate-500">·</span> IN <span className="text-slate-500">·</span> ON
           </h2>
           <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[280px]">
             Imagina el lente de una cámara haciendo zoom: de lo más general (IN) al punto exacto (AT).
           </p>
        </div>

        {/* Visual Summary */}
        <div className="mt-8 grid grid-cols-1 gap-3 relative">
           <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-amber-500 to-rose-500 opacity-30" />
           
           <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 ml-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-black text-xs shrink-0">IN</div>
              <div>
                 <h4 className="text-[10px] font-black uppercase text-indigo-300">Ciudad Grande</h4>
                 <p className="text-[9px] text-slate-400 italic">"I am in Bogotá"</p>
              </div>
           </div>

           <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 ml-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-black text-xs shrink-0">ON</div>
              <div>
                 <h4 className="text-[10px] font-black uppercase text-amber-300">Calle Específica</h4>
                 <p className="text-[9px] text-slate-400 italic">"I am on 7th Avenue"</p>
              </div>
           </div>

           <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 ml-2">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center font-black text-xs shrink-0">AT</div>
              <div>
                 <h4 className="text-[10px] font-black uppercase text-rose-300">Punto Exacto</h4>
                 <p className="text-[9px] text-slate-400 italic">"I am at the door"</p>
              </div>
           </div>
        </div>
      </div>

      {/* Deep Dive Sections */}
      <div className="grid grid-cols-1 gap-6">
         {/* IN Section */}
         <section className="space-y-3">
            <div className="flex items-center gap-3 px-2">
               <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Box size={18} />
               </div>
               <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">IN (Contenedor / 3D)</h3>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
               <p className="text-[11px] text-slate-500 leading-relaxed">
                  Definición: <span className="font-bold text-slate-700">Contención o inmersión</span>. Algo está dentro de límites físicos o abstractos.
               </p>
               <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                     <h4 className="text-[8px] font-black text-indigo-600 uppercase mb-1">Espacio</h4>
                     <p className="text-[9px] text-slate-600 font-medium">Países, ciudades, espacios cerrados.</p>
                  </div>
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                     <h4 className="text-[8px] font-black text-indigo-600 uppercase mb-1">Tiempo</h4>
                     <p className="text-[9px] text-slate-600 font-medium">Años, meses, periodos largos.</p>
                  </div>
               </div>
            </div>
         </section>

         {/* ON Section */}
         <section className="space-y-3">
            <div className="flex items-center gap-3 px-2">
               <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                  <Layers size={18} />
               </div>
               <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">ON (Superficie / 2D)</h3>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
               <p className="text-[11px] text-slate-500 leading-relaxed">
                  Definición: <span className="font-bold text-slate-700">Contacto o soporte</span>. Algo descansa sobre una superficie plana o conceptual.
               </p>
               <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                     <h4 className="text-[8px] font-black text-amber-600 uppercase mb-1">Espacio</h4>
                     <p className="text-[9px] text-slate-600 font-medium">Mesas, paredes, transporte grande.</p>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                     <h4 className="text-[8px] font-black text-amber-600 uppercase mb-1">Tiempo</h4>
                     <p className="text-[9px] text-slate-600 font-medium">Días específicos y fechas.</p>
                  </div>
               </div>
            </div>
         </section>

         {/* AT Section */}
         <section className="space-y-3">
            <div className="flex items-center gap-3 px-2">
               <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm">
                  <Target size={18} />
               </div>
               <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">AT (Láser / 1D)</h3>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
               <p className="text-[11px] text-slate-500 leading-relaxed">
                  Definición: <span className="font-bold text-slate-700">Punto exacto o coordenada</span>. Funciona como un puntero láser hacia un objetivo.
               </p>
               <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                     <h4 className="text-[8px] font-black text-rose-600 uppercase mb-1">Espacio</h4>
                     <p className="text-[9px] text-slate-600 font-medium">Direcciones, puntos en mapas, eventos.</p>
                  </div>
                  <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                     <h4 className="text-[8px] font-black text-rose-600 uppercase mb-1">Tiempo</h4>
                     <p className="text-[9px] text-slate-600 font-medium">Horas exactas y momentos clave.</p>
                  </div>
               </div>
            </div>
         </section>
      </div>

      {/* Pro Tip */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
         <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
               <Info size={16} className="text-amber-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pro Tip: Transporte</span>
         </div>
         <p className="text-xs leading-relaxed text-slate-300 italic">
            "Si puedes caminar dentro del transporte (bus, tren, avión), usa <span className="text-amber-400 font-black">ON</span>. Si tienes que agacharte (carro, taxi), usa <span className="text-indigo-400 font-black">IN</span>."
         </p>
      </div>
    </motion.div>
  );
};
