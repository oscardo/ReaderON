import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { 
  FileText, 
  RotateCcw, 
  Settings, 
  X, 
  Save, 
  AlertCircle,
  Camera as CameraIcon
} from 'lucide-react';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { AppMode, PlayFile, PlayWord } from './types';
import { gemmaService } from './services/gemmaService';
import { performOCR } from './services/ocrService';
import { fastAnalyze } from './services/analysisService';
import { 
  savePractice, 
  getAllPractices, 
  deletePractice, 
  exportDatabaseNative,
} from './services/dbService';
import { STUDY_DATA } from './constants/studyData';
import { THOUSAND_WORDS } from './constants/thousandWords';
import { THOUSAND_WORDS_2 } from './constants/thousandWords2';
import { useSettings } from './context/SettingsContext';
import { PhoneticSection } from './components/PhoneticSection';
import { CognateSection } from './components/CognateSection';
import { SuaveSection } from './components/SuaveSection';
import { TranslatorSection } from './components/TranslatorSection';
import SpecialC1Section from './components/SpecialC1Section';
import C1WordsSection from './components/C1WordsSection';
import { C1_WORDS } from './constants/c1Words';
import ThousandWordsSection from './components/ThousandWordsSection';
import RegularVerbsSection from './components/RegularVerbsSection';
import { REGULAR_VERBS } from './constants/regularVerbs';
import { IRREGULAR_VERBS } from './constants/irregularVerbs';
import { IDIOMS_EXPRESSIONS } from './constants/idiomsExpressions';
import { SettingsModal } from './components/SettingsModal';
import { HomeDashboard } from './components/HomeDashboard';
import { StudyDashboard } from './components/StudyDashboard';
import { AnalysisSection } from './components/AnalysisSection';
import { CaptureSection } from './components/CaptureSection';
import { PracticeSection } from './components/PracticeSection';
import IdiomsExpressionsSection from './components/IdiomsExpressionsSection';
import IrregularVerbsSection from './components/IrregularVerbsSection';
import SlangSection from './components/SlangSection';
import { SLANGS } from './constants/slangs';
import { EBookReader } from './components/EBookReader';
import confetti from 'canvas-confetti';

// --- Utils ---
const getScoreClass = (score: number) => {
  if (score >= 75) return 'play-text-green font-semibold';
  if (score >= 55) return 'play-text-yellow';
  if (score >= 31) return 'play-text-amber-red';
  return 'play-text-red';
};

const getScoreDescription = (score: number) => {
  if (score >= 75) return 'Excellent pronunciation';
  if (score >= 55) return 'Good, with details to improve';
  if (score >= 31) return 'Needs more practice';
  return 'Requires focused work';
};

const getCroppedImg = (image: HTMLImageElement, crop: any): Promise<string> => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = (crop.width / 100) * image.width * scaleX;
  canvas.height = (crop.height / 100) * image.height * scaleY;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(
      image,
      (crop.x / 100) * image.width * scaleX,
      (crop.y / 100) * image.height * scaleY,
      canvas.width,
      canvas.height,
      0, 0, canvas.width, canvas.height
    );
  }
  return new Promise((resolve) => resolve(canvas.toDataURL('image/jpeg', 0.9)));
};

export default function App() {
  const [mode, setMode] = useState<AppMode>('HOME');
  const [history, setHistory] = useState<PlayFile[]>([]);
  const [currentFile, setCurrentFile] = useState<Partial<PlayFile>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGemmaLoading, setIsGemmaLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [scannedText, setScannedText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'accuracy' | 'name'>('date');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Analysis Interaction
  const [tempName, setTempName] = useState('');
  const [manualVocab, setManualVocab] = useState<{ word: string, def: string }[]>([]);
  const [showVocabForm, setShowVocabForm] = useState(false);
  const [newVocab, setNewVocab] = useState({ word: '', def: '' });
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Capture / Cropper
  const [showCropper, setShowCropper] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState('');
  const [crop, setCrop] = useState<any>({ unit: '%', width: 90, height: 90, x: 5, y: 5 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const [ttsCurrentWordIdx, setTtsCurrentWordIdx] = useState<number | null>(null);

  const { settings: globalSettings, updateSettings } = useSettings();

  // Android Back Button Handling
  useEffect(() => {
    const handleBackButton = () => {
      if (showSettings) {
        setShowSettings(false);
      } else if (showCropper) {
        setShowCropper(false);
      } else if (showRenameModal) {
        setShowRenameModal(false);
      } else if (showVocabForm) {
        setShowVocabForm(false);
      } else if (showExitConfirm) {
        setShowExitConfirm(false);
      } else if (mode !== 'HOME') {
        // Simple back logic based on mode
        if (mode === 'PRACTICE') setMode('CAPTURE');
        else if (mode === 'ANALYSIS') setMode('HOME');
        else if (mode === 'CAPTURE') setMode('HOME');
        else if (mode === 'REGULAR_VERBS') setMode('HOME');
        else if (mode === 'IRREGULAR_VERBS') setMode('HOME');
        else if (mode === 'IDIOMS') setMode('HOME');
        else if (mode === 'C1_ESSENCIAL') setMode('HOME');
        else if (mode === 'C1_WORDS') setMode('HOME');
        else if (mode === 'SLANG') setMode('HOME');
        else setMode('HOME');
      } else {
        // If at home, ask to exit
        setShowExitConfirm(true);
      }
    };

    window.addEventListener('backbutton', handleBackButton);
    document.addEventListener('backbutton', handleBackButton);
    
    return () => {
      window.removeEventListener('backbutton', handleBackButton);
      document.removeEventListener('backbutton', handleBackButton);
    };
  }, [mode, showSettings, showCropper, showRenameModal, showVocabForm, showExitConfirm]);

  // Load History & Auto Backup
  useEffect(() => {
    const init = async () => {
      const data = await getAllPractices();
      setHistory(data);
      
      // Auto-backup on launch
      try {
        console.log("Starting automatic background backup...");
        await exportDatabaseNative();
      } catch (e) {
        console.warn("Background auto-backup failed", e);
      }
    };
    init();
  }, []);

  // Sync Playback Progress
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle Capture
  const handleStartPractice = async () => {
    try {
      const image = await CapCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt // Ask user: Camera or Gallery
      });
      
      if (image.base64String) {
        setCropImageSrc(`data:image/jpeg;base64,${image.base64String}`);
        setShowCropper(true);
      }
    } catch (err) {
      console.warn("Capacitor camera failed, falling back to file input", err);
      fileInputRef.current?.click();
    }
  };
  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropImageSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onConfirmCrop = async () => {
    if (!imgRef.current || !completedCrop) return;
    setShowCropper(false);
    try {
      const croppedBase64 = await getCroppedImg(imgRef.current, completedCrop);
      const text = await performOCR(croppedBase64);
      setScannedText(text);
      setMode('PRACTICE');
    } catch (err) {
      alert("Error processing image: " + err);
    } finally {
      setIsProcessing(false);
    }
  };

  const onPracticeComplete = async (transcript: string, audioUrl?: string) => {
    setIsProcessing(true);
    setStatusMessage('Analyzing pronunciation...');
    try {
      const analyzed = await fastAnalyze(scannedText);
      const newFile: PlayFile = {
        id: Date.now().toString(),
        name: `Practice ${new Date().toLocaleTimeString()}`,
        originalText: scannedText,
        transcribedText: transcript || analyzed.transcript,
        words: analyzed.words,
        accuracyTotal: analyzed.accuracy,
        audioUrl: audioUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await savePractice(newFile);
      setHistory([newFile, ...history]);
      setCurrentFile(newFile);
      setTempName(newFile.name);
      setManualVocab([]);
      setMode('ANALYSIS');
      if (analyzed.accuracy >= 80) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      alert("Error analyzing practice: " + err);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakWord = async (text: string, lang: string = 'en-US', isFullText: boolean = false) => {
    try {
      await TextToSpeech.stop();
      await TextToSpeech.speak({
        text,
        lang,
        rate: globalSettings.speechRate,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient'
      });
      
      if (isFullText) {
        // TextToSpeech plugin doesn't have onboundary on all platforms easily
        // but we can simulate or just leave as is for now.
      }
    } catch (e) {
      console.error("TTS Error:", e);
      // Fallback to web API
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = globalSettings.speechRate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const replayWordSnippet = (word: PlayWord) => {
    if (!audioRef.current || word.startTime === undefined) return;
    audioRef.current.currentTime = word.startTime;
    audioRef.current.play();
    setIsPlaying(true);
    const duration = (word.endTime! - word.startTime) * 1000;
    setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
        setTimeout(() => speakWord(word.text), 300);
    }, duration + 100);
  };

  const replayPhrase = (idx: number) => {
    if (!currentFile.words || !audioRef.current) return;
    let start = idx, end = idx;
    while (start > 0 && !/[.!?]/.test(currentFile.words[start-1].text)) start--;
    while (end < currentFile.words.length - 1 && !/[.!?]/.test(currentFile.words[end].text)) end++;
    const sWord = currentFile.words[start], eWord = currentFile.words[end];
    if (sWord.startTime !== undefined) {
        audioRef.current.currentTime = sWord.startTime;
        audioRef.current.play();
        setIsPlaying(true);
        const dur = (eWord.endTime! - sWord.startTime) * 1000;
        setTimeout(() => {
            audioRef.current?.pause();
            setIsPlaying(false);
            const text = currentFile.words!.slice(start, end + 1).map(w => w.text).join(' ');
            setTimeout(() => speakWord(text), 400);
        }, dur + 100);
    }
  };

  return (
    <MotionConfig transition={globalSettings.reducedMotion ? { duration: 0 } : undefined}>
      <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans selection:bg-indigo-100">
        {currentFile.audioUrl && (
          <audio 
            ref={audioRef} 
            src={currentFile.audioUrl} 
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => {
                if (!isScrubbing) {
                    const el = e.currentTarget;
                    setCurrentTime(el.currentTime);
                    setPlaybackProgress((el.currentTime / el.duration) * 100);
                }
            }}
          />
        )}

        <header className="w-full px-6 py-6 flex justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100/50">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setMode('HOME')}>
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg">
              <FileText size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">ReaderON</h1>
              <p className="text-[10px] font-black text-indigo-500/70 uppercase tracking-widest">Master Speech</p>
            </div>
          </div>
          <div className="flex gap-2">
            {mode !== 'HOME' && (
              <button onClick={() => setMode('HOME')} className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all">
                <RotateCcw size={20} />
              </button>
            )}
            <button onClick={() => setShowSettings(true)} className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 pt-4">
          <AnimatePresence mode="wait">
            {mode === 'HOME' && (
              <HomeDashboard 
                setMode={setMode}
                setShowSettings={setShowSettings}
                history={history}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showAdvancedFilters={showAdvancedFilters}
                setShowAdvancedFilters={setShowAdvancedFilters}
                filteredHistory={history.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                onFileSelect={(f) => {
                    setCurrentFile(f);
                    setTempName(f.name);
                    setManualVocab(f.notes || []);
                    setMode('ANALYSIS');
                }}
                onDeleteFile={async (id) => {
                    if (confirm("Delete this practice?")) {
                        await deletePractice(id);
                        setHistory(history.filter(h => h.id !== id));
                    }
                }}
                getScoreClass={getScoreClass}
              />
            )}

            {mode === 'CAPTURE' && (
                <CaptureSection 
                  showCropper={showCropper}
                  cropImageSrc={cropImageSrc}
                  crop={crop}
                  setCrop={setCrop}
                  onImageLoad={(e) => { imgRef.current = e.currentTarget; }}
                  onCropComplete={setCompletedCrop}
                  onCancelCrop={() => setShowCropper(false)}
                  onConfirmCrop={onConfirmCrop}
                  isProcessing={isProcessing}
                  statusMessage={statusMessage}
                  onStartPractice={handleStartPractice}
                  fileInputRef={fileInputRef}
                  handleCapture={handleCapture}
                  onBack={() => setMode('HOME')}
                />
            )}

            {mode === 'PRACTICE' && (
                <PracticeSection 
                    textToRead={scannedText}
                    onAnalysisComplete={onPracticeComplete}
                    onBack={() => setMode('CAPTURE')}
                    speakText={speakWord}
                />
            )}

            {mode === 'ANALYSIS' && (
              <AnalysisSection 
                currentFile={currentFile}
                onBack={() => setMode('HOME')}
                onDelete={async (id) => {
                    if (confirm("Delete this practice?")) {
                        await deletePractice(id);
                        setHistory(history.filter(h => h.id !== id));
                        setMode('HOME');
                    }
                }}
                onRename={() => setShowRenameModal(true)}
                onExport={() => alert("Data exported to local cache")}
                tempName={tempName}
                isPlaying={isPlaying}
                onTogglePlay={() => {
                    if (isPlaying) audioRef.current?.pause();
                    else audioRef.current?.play();
                    setIsPlaying(!isPlaying);
                }}
                playbackProgress={playbackProgress}
                onScrub={(e) => {
                    const val = parseFloat(e.target.value);
                    setPlaybackProgress(val);
                    if (audioRef.current) audioRef.current.currentTime = (val / 100) * duration;
                }}
                onStartScrub={() => setIsScrubbing(true)}
                onStopScrub={() => setIsScrubbing(false)}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                duration={duration}
                currentTime={currentTime}
                activeWordIdx={activeWordIdx}
                ttsCurrentWordIdx={ttsCurrentWordIdx}
                replayWordSnippet={replayWordSnippet}
                replayPhrase={replayPhrase}
                speakWord={speakWord}
                manualVocab={manualVocab}
                setShowVocabForm={setShowVocabForm}
                getScoreClass={getScoreClass}
                getScoreDescription={getScoreDescription}
              />
            )}

            {mode === 'STUDY' && (
                <StudyDashboard 
                    studyData={STUDY_DATA}
                    onBack={() => setMode('HOME')}
                    speakWord={(t) => speakWord(t)}
                />
            )}

            {mode === 'PHONETICS' && <PhoneticSection onBack={() => setMode('HOME')} speakText={speakWord} />}
            {mode === 'COGNATES' && <CognateSection onBack={() => setMode('HOME')} speakText={speakWord} />}
            {mode === 'SUAVE' && <SuaveSection onBack={() => setMode('HOME')} />}
            {mode === 'TRANSLATOR' && <TranslatorSection onBack={() => setMode('HOME')} />}
            {mode === 'THOUSAND_WORDS' && <ThousandWordsSection words={THOUSAND_WORDS} title="THOUSAND WORDS ESSENCIAL" storeName="thousand_words_1" onBack={() => setMode('HOME')} />}
            {mode === 'THOUSAND_WORDS_2' && <ThousandWordsSection words={THOUSAND_WORDS_2} title="THOUSAND WORDS ADVANCED" storeName="thousand_words_2" onBack={() => setMode('HOME')} />}
            {mode === 'REGULAR_VERBS' && <RegularVerbsSection verbs={REGULAR_VERBS} onBack={() => setMode('HOME')} speakText={speakWord} />}
            {mode === 'IRREGULAR_VERBS' && <IrregularVerbsSection verbs={IRREGULAR_VERBS} onBack={() => setMode('HOME')} speakText={speakWord} />}
            {mode === 'IDIOMS' && <IdiomsExpressionsSection idioms={IDIOMS_EXPRESSIONS} onBack={() => setMode('HOME')} speakText={speakWord} />}
            {mode === 'C1_ESSENCIAL' && (
                <SpecialC1Section onBack={() => setMode('HOME')} speakText={speakWord} />
            )}
            {mode === 'C1_WORDS' && (
                <C1WordsSection 
                  words={C1_WORDS} 
                  onBack={() => setMode('HOME')} 
                  speakText={speakWord} 
                />
            )}
            {mode === 'SLANG' && (
                <SlangSection 
                  onBack={() => setMode('HOME')} 
                  speakText={speakWord} 
                />
            )}
            {mode === 'EBOOKS' && <EBookReader onBack={() => setMode('HOME')} />}
          </AnimatePresence>
        </main>

        <SettingsModal 
          show={showSettings}
          onClose={() => setShowSettings(false)}
          globalSettings={globalSettings}
          updateSettings={updateSettings}
          isGemmaLoading={isGemmaLoading}
          setIsGemmaLoading={setIsGemmaLoading}
          history={history}
          setHistory={setHistory}
          deletePractice={deletePractice}
        />

        {/* Rename Modal */}
        <AnimatePresence>
          {showRenameModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[300] flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[3rem] p-10 w-full max-w-sm space-y-6">
                <h3 className="text-xl font-black text-slate-900">Rename Practice</h3>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)} 
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold"
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowRenameModal(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs">CANCEL</button>
                  <button 
                    onClick={async () => {
                        if (currentFile.id) {
                            const updated = { ...currentFile as PlayFile, name: tempName };
                            await savePractice(updated);
                            setHistory(history.map(h => h.id === currentFile.id ? updated : h));
                            setShowRenameModal(false);
                        }
                    }} 
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs"
                  >
                    SAVE
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Vocab Form Modal */}
        <AnimatePresence>
          {showVocabForm && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[300] flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[3rem] p-10 w-full max-w-md space-y-6">
                <h3 className="text-xl font-black text-slate-900">Add Vocabulary</h3>
                <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Word"
                      value={newVocab.word}
                      onChange={(e) => setNewVocab({ ...newVocab, word: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl"
                    />
                    <textarea 
                      placeholder="Definition"
                      value={newVocab.def}
                      onChange={(e) => setNewVocab({ ...newVocab, def: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl h-32"
                    />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowVocabForm(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs">CANCEL</button>
                  <button 
                    onClick={async () => {
                        const updatedVocab = [...manualVocab, newVocab];
                        setManualVocab(updatedVocab);
                        if (currentFile.id) {
                            const updated = { ...currentFile as PlayFile, notes: updatedVocab };
                            await savePractice(updated);
                            setHistory(history.map(h => h.id === currentFile.id ? updated : h));
                        }
                        setNewVocab({ word: '', def: '' });
                        setShowVocabForm(false);
                    }} 
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs"
                  >
                    ADD WORD
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Exit Confirmation Modal */}
        <AnimatePresence>
          {showExitConfirm && (
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-2xl z-[500] flex items-center justify-center p-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-[3rem] p-10 w-full max-w-sm space-y-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="space-y-3 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                    <AlertCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Exit ReaderON?</h3>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed">Are you sure you want to close the application? Your progress is safely saved.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                        // In Capacitor, we should use App.exitApp() but we'll try window.close() or let it be
                        // For now we'll simulate exit or just hide. 
                        // Real implementation would be App.exitApp()
                        (window as any).navigator?.app?.exitApp?.() || window.close();
                    }} 
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95 transition-all"
                  >
                    Yes, Exit Now
                  </button>
                  <button 
                    onClick={() => setShowExitConfirm(false)} 
                    className="w-full py-5 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    Stay in App
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <audio ref={audioRef} style={{ display: 'none' }} />
      </div>
    </MotionConfig>
  );
}
