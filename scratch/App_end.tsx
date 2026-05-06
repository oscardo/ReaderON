import { AnimatePresence } from "motion/react";

{/* Manual Vocab Form */ }
<AnimatePresence>
  {showVocabForm && (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[400] flex items-center justify-center p-6"
    >
      <motion.div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full space-y-6 shadow-2xl">
        <h3 className="text-xl font-black text-slate-900 text-center">New Vocabulary Note</h3>
        <div className="space-y-4">
          <input
            placeholder="Word or phrase..."
            className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-indigo-500"
            value={newVocab.word}
            onChange={e => setNewVocab(v => ({ ...v, word: e.target.value }))}
          />
          <textarea
            placeholder="Definition or notes..."
            className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-indigo-500 h-32 resize-none"
            value={newVocab.def}
            onChange={e => setNewVocab(v => ({ ...v, def: e.target.value }))}
          />
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowVocabForm(false)} className="flex-1 py-4 font-black text-slate-400 bg-slate-50 rounded-2xl">Close</button>
          <button
            disabled={!newVocab.word}
            onClick={() => {
              const updatedVocab = [...manualVocab, newVocab];
              setManualVocab(updatedVocab);
              setNewVocab({ word: '', def: '' });
              setShowVocabForm(false);
              if (currentFile.id) {
                savePractice({
                  ...currentFile,
                  notes: updatedVocab,
                  updatedAt: new Date().toISOString()
                }).then(async () => {
                  setHistory(await getAllPractices());
                });
              }
            }}
            className="flex-1 py-5 font-black text-white bg-indigo-600 shadow-xl shadow-indigo-200 rounded-2xl disabled:bg-slate-200 disabled:shadow-none transition-all active:scale-95"
          >
            SAVE WORD
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* Settings Modal */ }
<AnimatePresence>
  {showSettings && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
    >
      <div className="absolute inset-0" onClick={() => setShowSettings(false)} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <Settings size={22} />
            </div>
            <h3 className="text-slate-900 text-xl font-black uppercase tracking-widest">Settings</h3>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(false)}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"
          >
            <X />
          </motion.button>
        </div>

        <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          {/* Font Size */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Type size={18} className="text-indigo-500" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Typography Size</label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${globalSettings.fontSize === size
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                      : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Speech Rate */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 size={18} className="text-indigo-500" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Speech Speed</label>
            </div>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={globalSettings.speechRate}
                onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
                className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-indigo-600 font-black bg-indigo-50 px-4 py-2 rounded-2xl min-w-[60px] text-center">
                {globalSettings.speechRate.toFixed(1)}x
              </span>
            </div>
            <div className="flex justify-between text-[8px] text-slate-400 font-black uppercase tracking-widest px-1">
              <span>Turtle</span>
              <span>Rabbit</span>
            </div>
          </div>

          {/* Density */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Layout size={18} className="text-indigo-500" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Interface Density</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(['comfortable', 'compact'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => updateSettings({ density: d })}
                  className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${globalSettings.density === d
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                      : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Language Proficiency */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={18} className="text-indigo-500" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Language Proficiency</label>
            </div>
            <div className="space-y-3">
              {[
                { id: 'B1', label: 'Inicial B1', desc: 'Nivel bajo de requerimientos del idioma' },
                { id: 'B2', label: 'Intermedio B2', desc: 'Nivel intermedio de requerimientos del idioma' },
                { id: 'C1', label: 'Avanzado C1', desc: 'Nivel alto de requerimientos del idioma' }
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => updateSettings({ proficiencyLevel: level.id as any })}
                  className={`w-full p-5 rounded-[2.5rem] text-left transition-all border-2 flex items-center justify-between group ${globalSettings.proficiencyLevel === level.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'
                    }`}
                >
                  <div>
                    <p className="font-black text-sm uppercase tracking-wider">{level.label}</p>
                    <p className={`text-[10px] font-bold ${globalSettings.proficiencyLevel === level.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {level.desc}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${globalSettings.proficiencyLevel === level.id ? 'bg-white border-white' : 'border-slate-100'
                    }`}>
                    {globalSettings.proficiencyLevel === level.id && <div className="w-2 h-2 bg-indigo-600 rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* LiteRT-LM Local AI */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-indigo-500" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">LiteRT-LM (Gemma 2B - Local AI)</label>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-4">
              <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                💡 <strong>Tip para Samsung A54:</strong> Coloca el modelo en la carpeta de Descargas y usa esta ruta: <br />
                <code className="bg-white/50 px-1 rounded">/storage/emulated/0/Download/gemma-2b-it-cpu-int4.bin</code>
              </p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="/storage/emulated/0/Download/gemma-2b-it-cpu-int4.bin"
                value={globalSettings.gemmaModelPath}
                onChange={(e) => updateSettings({ gemmaModelPath: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:border-indigo-500 outline-none transition-all"
              />
              <button
                onClick={async () => {
                  if (!globalSettings.gemmaModelPath) {
                    alert("Por favor, ingresa una ruta válida para el modelo.");
                    return;
                  }
                  setIsGemmaLoading(true);
                  try {
                    const status = await gemmaService.init(globalSettings.gemmaModelPath);
                    alert(status);
                  } catch (e: any) {
                    alert("Fallo al inicializar LiteRT-LM: " + (e.message || e));
                  } finally {
                    setIsGemmaLoading(false);
                  }
                }}
                disabled={isGemmaLoading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isGemmaLoading && <Loader2 size={16} className="animate-spin" />}
                {isGemmaLoading ? "Cargando LiteRT..." : "Activar IA Local (LiteRT-LM)"}
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="text-indigo-500" />
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Preferences</label>
            </div>
            <button
              onClick={() => updateSettings({ reducedMotion: !globalSettings.reducedMotion })}
              className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Reduced Motion</span>
              <div className={`w-12 h-6 rounded-full transition-all relative ${globalSettings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${globalSettings.reducedMotion ? 'left-7' : 'left-1'}`} />
              </div>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                if (confirm('Are you sure you want to delete ALL history? This action cannot be undone.')) {
                  for (const p of history) {
                    if (p.id) await deletePractice(p.id);
                  }
                  setHistory([]);
                  setShowSettings(false);
                }
              }}
              className="w-full py-5 rounded-2xl bg-red-50 text-red-600 font-extrabold text-[12px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
            >
              WIPE ALL HISTORY
            </motion.button>
            <div className="flex flex-col items-center gap-1 opacity-20">
              <p className="text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.3em]">ReaderON • Premium Edition • Version 0.0.1 feature 0.0.37</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">V 0.0.1 feature 0.0.37: LiteRT-LM Local Model Deployment</p>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">V 0.0.1 feature 0.0.36: LiteRT (TFLite) &amp; Gemma 2B Hybrid Analysis</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* Cropper Modal */ }
{
  showCropper && (
    <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
        <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)}>
          <img ref={imgRef} src={cropImageSrc} style={{ maxHeight: '70vh' }} alt="Crop me" />
        </ReactCrop>
      </div>
      <div className="h-24 w-full flex items-center justify-center gap-4">
        <button onClick={() => setShowCropper(false)} className="px-6 py-3 bg-slate-800 text-white rounded-full font-bold">Cancel</button>
        <button onClick={handleCropConfirm} className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold">Siguiente (Crop)</button>
      </div>
    </div>
  )
}

    </div >
    </MotionConfig >
  );
}
// Version 0.0.1 feature 0.0.27
