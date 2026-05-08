import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Settings, 
  Volume2, 
  Layout, 
  Target, 
  Sparkles, 
  Loader2, 
  Zap, 
  CheckCircle2, 
  RotateCcw, 
  Download,
  Database,
  Upload,
  ArrowRight,
  Trash2,
  FolderOpen
} from 'lucide-react';
import { exportDatabase, importDatabase, exportDatabaseNative, getBackupList, restoreFromBackup, deleteBackup, getBackupDirectory } from '../services/dbService';
import { gemmaService } from '../services/gemmaService';

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
  globalSettings: any;
  updateSettings: (updates: any) => void;
  isGemmaLoading: boolean;
  setIsGemmaLoading: (loading: boolean) => void;
  history: any[];
  setHistory: (history: any[]) => void;
  deletePractice: (id: string) => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  show,
  onClose,
  globalSettings,
  updateSettings,
  isGemmaLoading,
  setIsGemmaLoading,
  history,
  setHistory,
  deletePractice
}) => {
  const [backups, setBackups] = useState<any[]>([]);
  const [showBackupList, setShowBackupList] = useState(false);
  const [backupPath, setBackupPath] = useState<string>('');

  useEffect(() => {
    if (show) {
      loadBackups();
    }
  }, [show]);

  const loadBackups = async () => {
    const list = await getBackupList();
    setBackups(list);
    try {
      const path = await getBackupDirectory();
      setBackupPath(path);
    } catch (e) {
      console.error("Failed to get backup path", e);
    }
  };

  const handleCreateBackup = async () => {
    try {
      await exportDatabaseNative();
      alert("Backup created successfully in Documents folder!");
      loadBackups();
    } catch (e) {
      alert("Failed to create backup: " + e);
    }
  };

  const handleDeleteBackup = async (fileName: string) => {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      try {
        await deleteBackup(fileName);
        loadBackups();
      } catch (e) {
        alert("Failed to delete backup: " + e);
      }
    }
  };

  const handleNativeRestore = async (fileName: string) => {
    if (confirm(`Restore from ${fileName}? This will overwrite current data.`)) {
      try {
        await restoreFromBackup(fileName);
        alert("Database restored successfully! Reloading...");
        window.location.reload();
      } catch (e) {
        alert("Restore failed: " + e);
      }
    }
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Settings size={20} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">App Settings</h3>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Version 0.0.50 (v0.0.2)</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              {/* TTS Speed */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 size={18} className="text-indigo-500" />
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">TTS Speaking Rate</label>
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

              {/* Data Management */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Database size={14} /> Data Management
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={handleCreateBackup}
                    className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 border border-indigo-500 shadow-lg shadow-indigo-100 active:scale-95"
                  >
                    <Download size={16} /> Generate New Backup (.bkp)
                  </button>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setShowBackupList(!showBackupList)}
                      className={`w-full p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 border cursor-pointer ${
                        showBackupList 
                          ? 'bg-slate-800 border-slate-700 text-white' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      <Database size={16} /> {showBackupList ? "Close Backup Manager" : "Manage Saved Backups"}
                    </button>

                    <AnimatePresence>
                      {showBackupList && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-3 bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-inner"
                        >
                          <div className="flex flex-col gap-1 mb-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                              <FolderOpen size={12} /> Backup Location:
                            </p>
                            <p className="text-[8px] font-bold text-slate-400 break-all bg-white p-2 rounded-lg border border-slate-100 truncate opacity-60">
                              {backupPath || 'Documents Folder'}
                            </p>
                          </div>

                          <div className="space-y-2">
                            {backups.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-10 gap-3 opacity-30">
                                <Database size={40} />
                                <p className="text-[10px] font-black uppercase tracking-widest">No local backups found</p>
                              </div>
                            ) : (
                              backups.map((b, idx) => (
                                <div key={idx} className="flex items-stretch gap-2">
                                  <button
                                    onClick={() => handleNativeRestore(b.name)}
                                    className="flex-1 text-left p-4 bg-white hover:bg-emerald-50 rounded-2xl border border-slate-100 transition-all group flex items-center justify-between shadow-sm active:scale-[0.98] overflow-hidden"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-8 h-8 rounded-xl bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100">
                                        <Database size={14} />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold text-slate-700 truncate">{b.name}</span>
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">System Backup</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                                      <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hidden sm:block">Restore</span>
                                      <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBackup(b.name)}
                                    className="w-14 bg-white hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-2xl border border-slate-100 transition-all active:scale-90 flex items-center justify-center flex-shrink-0 shadow-sm"
                                    title="Delete backup"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                          
                          <div className="pt-4 border-t border-slate-200 mt-4">
                             <input 
                              type="file" 
                              id="restore-db-manual" 
                              className="hidden" 
                              accept=".bkp,.json"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (confirm("This will overwrite your current data. Continue?")) {
                                    const reader = new FileReader();
                                    reader.onload = async (ev) => {
                                      try {
                                        const data = typeof ev.target?.result === 'string' ? ev.target.result : '';
                                        await importDatabase(data);
                                        alert("Database restored successfully! The app will reload.");
                                        window.location.reload();
                                      } catch (err) {
                                        alert("Invalid backup file: " + err);
                                      }
                                    };
                                    reader.readAsText(file);
                                  }
                                }
                              }}
                            />
                            <label 
                              htmlFor="restore-db-manual"
                              className="block text-center p-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 cursor-pointer shadow-lg active:scale-95 transition-all"
                            >
                              Import External File Manually
                            </label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic px-2">
                  * Backups are stored safely in your device's <strong>Documents</strong> folder. 
                  Deleting them here will permanently remove them from storage.
                </p>
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
                      className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                        globalSettings.density === d 
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
                      className={`w-full p-5 rounded-[2.5rem] text-left transition-all border-2 flex items-center justify-between group ${
                        globalSettings.proficiencyLevel === level.id 
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
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        globalSettings.proficiencyLevel === level.id ? 'bg-white border-white' : 'border-slate-100'
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
                    💡 <strong>Tip para Samsung A54:</strong> Coloca el modelo en la carpeta de Descargas y usa esta ruta: <br/>
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
                      onClose();
                    }
                  }}
                  className="w-full py-5 rounded-2xl bg-red-50 text-red-600 font-extrabold text-[12px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                >
                  WIPE ALL HISTORY
                </motion.button>
                
                <div className="flex flex-col items-center gap-2 py-4">
                  <p className="text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.4em]">Reader<span className="text-indigo-400">ON</span> • Premium Edition</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Version 0.0.50: UX Redesign & Irregulars</p>
                  <div className="flex gap-4 opacity-30 mt-2">
                    <div className="text-[7px] font-black uppercase tracking-[0.2em]">Build 20260506-F</div>
                    <div className="text-[7px] font-black uppercase tracking-[0.2em]">© 2026 ReaderON AI</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
