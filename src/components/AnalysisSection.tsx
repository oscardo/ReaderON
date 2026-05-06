import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Trash2, 
  Edit2, 
  Download, 
  Share2, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Sparkles, 
  Zap, 
  Info, 
  X,
  Target,
  PenLine
} from 'lucide-react';
import { PlayFile, PlayWord } from '../types';

interface AnalysisSectionProps {
  currentFile: Partial<PlayFile>;
  onBack: () => void;
  onDelete: (id: string) => void;
  onRename: () => void;
  onExport: () => void;
  tempName: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackProgress: number;
  onScrub: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartScrub: () => void;
  onStopScrub: () => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  duration: number;
  currentTime: number;
  activeWordIdx: number | null;
  ttsCurrentWordIdx: number | null;
  replayWordSnippet: (word: PlayWord) => void;
  replayPhrase: (idx: number) => void;
  speakWord: (text: string, lang?: string, isFullText?: boolean) => void;
  manualVocab: { word: string, def: string }[];
  setShowVocabForm: (show: boolean) => void;
  getScoreClass: (score: number) => string;
  getScoreDescription: (score: number) => string;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  currentFile,
  onBack,
  onDelete,
  onRename,
  onExport,
  tempName,
  isPlaying,
  onTogglePlay,
  playbackProgress,
  onScrub,
  onStartScrub,
  onStopScrub,
  playbackSpeed,
  setPlaybackSpeed,
  duration,
  currentTime,
  activeWordIdx,
  ttsCurrentWordIdx,
  replayWordSnippet,
  replayPhrase,
  speakWord,
  manualVocab,
  setShowVocabForm,
  getScoreClass,
  getScoreDescription
}) => {
  const [selectedWordForModal, setSelectedWordForModal] = useState<PlayWord | null>(null);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      key="analysis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Analysis Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <motion.button 
            whileHover={{ x: -4 }}
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={16} /> BACK TO HISTORY
          </motion.button>
          
          <div className="flex gap-2">
            <button onClick={onRename} className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all" title="Rename this practice session">
              <Edit2 size={18} />
            </button>
            <button onClick={() => currentFile.id && onDelete(currentFile.id)} className="p-3 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all" title="Delete this session from history">
              <Trash2 size={18} />
            </button>
            <button onClick={onExport} className="p-3 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all" title="Export this analysis data">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{tempName}</h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Analysis Result</span>
              <div className="w-1 h-1 bg-slate-200 rounded-full" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(currentFile.createdAt!).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Accuracy</p>
              <p className={`text-4xl font-black ${getScoreClass(currentFile.accuracyTotal || 0)}`}>{currentFile.accuracyTotal}%</p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="max-w-[120px]">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Verdict</p>
              <p className="text-[10px] font-bold text-slate-600 leading-tight">{getScoreDescription(currentFile.accuracyTotal || 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Visualizer */}
      <div className="bento-card p-10 bg-white border border-slate-100 shadow-xl shadow-slate-200/20">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles size={16} className="text-indigo-500" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Transcription & Accuracy Breakdown</h3>
        </div>
        
        <div className="flex flex-wrap gap-x-2 gap-y-4 leading-loose min-h-[150px]">
          {currentFile.words?.map((word, idx) => (
            <span 
              key={idx}
              onClick={() => replayWordSnippet(word)}
              onContextMenu={(e) => {
                e.preventDefault();
                replayPhrase(idx);
              }}
              className={`
                px-2.5 py-0.5 rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 relative group
                ${getScoreClass(word.score || 0)}
                ${activeWordIdx === idx ? 'bg-indigo-600 text-white !play-text-white shadow-lg shadow-indigo-200 -translate-y-1' : 'hover:bg-slate-50 hover:-translate-y-0.5'}
                ${ttsCurrentWordIdx === idx ? 'ring-2 ring-indigo-400 ring-offset-2' : ''}
              `}
            >
              {word.text}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-xl uppercase tracking-widest">
                  {word.score}% Accuracy
                </span>
              </div>
            </span>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Native Level</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Understandable</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Critical</span>
            </div>
            <div className="ml-auto text-[10px] font-bold text-indigo-400 flex items-center gap-2">
                <Info size={12} />
                <span>Tap word to replay, long tap for phrase</span>
            </div>
        </div>
      </div>

      {/* Vocabulary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bento-card p-8 bg-slate-900 text-white relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-300">
                  <Zap size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest">Custom Vocabulary</h3>
              </div>
              <button 
                onClick={() => setShowVocabForm(true)}
                className="w-10 h-10 rounded-2xl bg-white text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
              >
                <PenLine size={18} />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar-white">
              {manualVocab.map((v, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <p className="font-black text-indigo-300 text-sm mb-1">{v.word}</p>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{v.def}</p>
                </div>
              ))}
              {manualVocab.length === 0 && (
                <div className="py-12 text-center opacity-30">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">No custom notes</p>
                </div>
              )}
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="bento-card p-8 bg-white border border-slate-100 flex flex-col justify-between">
           <div className="space-y-6">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                 <Target size={20} />
               </div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Global Review</h3>
             </div>
             <p className="text-slate-500 text-xs font-medium leading-relaxed">
               Use the TTS player below to listen to the entire text with perfect pronunciation. 
               We recommend following along with your eyes while listening to internalize patterns.
             </p>
           </div>
           
           <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => speakWord(currentFile.originalText || '', 'en-US', true)}
             className="w-full py-5 bg-slate-50 border border-slate-100 text-indigo-600 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
           >
             LISTEN FULL TEXT
           </motion.button>
        </div>
      </div>

      {/* Floating Audio Controller */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] p-4 flex flex-col gap-3"
        >
          {/* Progress Bar */}
          <div className="px-4 pt-2">
            <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden group cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(79,70,229,0.4)]"
                style={{ width: `${playbackProgress}%` }}
              />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={playbackProgress}
                onChange={onScrub}
                onMouseDown={onStartScrub}
                onMouseUp={onStopScrub}
                onTouchStart={onStartScrub}
                onTouchEnd={onStopScrub}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] font-black text-indigo-600 tabular-nums">{formatTime(currentTime)}</span>
              <span className="text-[10px] font-black text-slate-300 tabular-nums">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 pb-2">
            <button 
              onClick={() => setPlaybackSpeed(playbackSpeed === 1.0 ? 0.75 : playbackSpeed === 0.75 ? 0.5 : 1.0)}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-[10px] font-black text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all uppercase tracking-widest"
            >
              {playbackSpeed}x
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <SkipBack size={20} />
              </button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onTogglePlay}
                className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-slate-200 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} className="ml-1" fill="white" />}
              </motion.button>

              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <SkipForward size={20} />
              </button>
            </div>

            <button 
              onClick={() => { if(currentFile.audioUrl) { /* Logic to restart original */ } }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedWordForModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedWordForModal(null)}>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-sm bg-white rounded-[3rem] shadow-2xl p-10 space-y-8 overflow-hidden relative"
               onClick={e => e.stopPropagation()}
             >
                <div className="space-y-2 text-center">
                  <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedWordForModal.text}</h4>
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${getScoreClass(selectedWordForModal.score || 0)} bg-slate-50`}>
                      {selectedWordForModal.score}% Correct
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => replayWordSnippet(selectedWordForModal)}
                    className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all"
                  >
                    <Volume2 size={20} /> LISTEN & COMPARE
                  </button>
                  <button 
                    onClick={() => speakWord(selectedWordForModal.text)}
                    className="w-full py-5 bg-slate-50 text-slate-600 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                  >
                    <Target size={18} /> PURE TTS MODEL
                  </button>
                </div>

                <button 
                  onClick={() => setSelectedWordForModal(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all"
                >
                  <X size={20} />
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
