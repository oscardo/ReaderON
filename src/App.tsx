import { 
  Camera, 
  History, 
  Mic, 
  Play, 
  Settings, 
  FileText, 
  ChevronRight,
  ArrowLeft,
  X,
  RotateCcw,
  SkipBack,
  SkipForward,
  Info,
  CheckCircle2,
  AlertCircle,
  Pause,
  Gauge,
  Trash2,
  Edit2,
  Download,
  Share2,
  Volume2,
  Target,
  Save,
  BookOpen,
  ArrowRight,
  Sparkles,
  PenLine,
  Layers,
  Type,
  Layout,
  Zap
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppMode, PlayFile, PlayWord } from './types';
import { performOCR } from './services/ocrService';
import { fastAnalyze } from './services/analysisService';
import { savePractice, getAllPractices, deletePractice } from './services/dbService';
import { STUDY_DATA, SuperCategory, SubCategory } from './constants/studyData';
import { EBOOKS_DATA, EBook, BookPoint, BookSummary } from './constants/ebooksData';
import { PhoneticSection } from './components/PhoneticSection';
import { CognateSection } from './components/CognateSection';
import { useSettings } from './context/SettingsContext';
import { MotionConfig } from 'motion/react';
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
  return 'Very low accuracy';
};

// --- Components ---

export default function App() {
  const [mode, setMode] = useState<AppMode>('HOME');
  const [history, setHistory] = useState<PlayFile[]>([]);
  const [currentFile, setCurrentFile] = useState<Partial<PlayFile>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  // Renaming State
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [tempName, setTempName] = useState('');

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Analysis Interaction
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const [ttsCurrentWordIdx, setTtsCurrentWordIdx] = useState<number | null>(null);
  const [selectedWordForModal, setSelectedWordForModal] = useState<PlayWord | null>(null);
  const [isFetchingDefinition, setIsFetchingDefinition] = useState(false);
  const [manualVocab, setManualVocab] = useState<{ word: string, def: string }[]>([]);
  const [showVocabForm, setShowVocabForm] = useState(false);
  const [newVocab, setNewVocab] = useState({ word: '', def: '' });
  const longPressTimer = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings
  const { settings: globalSettings, updateSettings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);

  // Auto-save analyzed content
  useEffect(() => {
    if (mode === 'ANALYSIS' && currentFile.id && !isProcessing) {
      const save = async () => {
        const fileToSave = {
          ...(currentFile as PlayFile),
          name: tempName,
          updatedAt: new Date().toISOString(),
          notes: manualVocab
        };
        await savePractice(fileToSave);
      };
      
      const timeoutId = setTimeout(save, 5000); // Debounced save after 5 seconds of direct inactivity
      return () => clearTimeout(timeoutId);
    }
  }, [mode, currentFile.id, tempName, manualVocab, isProcessing]);

  // Filtering and Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'accuracy' | 'name'>('date');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [accuracyRange, setAccuracyRange] = useState({ min: 0, max: 100 });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Study Mode State
  const [activeSuperCategory, setActiveSuperCategory] = useState<SuperCategory | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);

  // EBooks State
  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  const [activeBookPoint, setActiveBookPoint] = useState<BookPoint | null>(null);
  const [activeBookColor, setActiveBookColor] = useState<string>('indigo');

  // Load history from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllPractices();
        setHistory(data);
      } catch (e) {
        setStatusMessage('Error loading history');
      }
    };
    loadData();
  }, []);

  const replayWordSnippet = (word: PlayWord) => {
    if (!audioRef.current || word.startTime === undefined || word.endTime === undefined) return;
    
    // Play original audio segment
    audioRef.current.currentTime = word.startTime;
    audioRef.current.play();
    setIsPlaying(true);

    const durationMs = (word.endTime - word.startTime) * 1000;
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        // After original, play correct pronunciation via TTS
        setTimeout(() => {
          speakWord(word.text);
        }, 500);
      }
    }, durationMs + 200);
  };

  const filteredHistory = history
    .filter(item => {
      const matchName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchAccuracy = item.accuracyTotal >= accuracyRange.min && item.accuracyTotal <= accuracyRange.max;
      const matchDateStart = dateRange.start ? new Date(item.createdAt) >= new Date(dateRange.start) : true;
      const matchDateEnd = dateRange.end ? new Date(item.createdAt) <= new Date(dateRange.end) : true;
      return matchName && matchAccuracy && matchDateStart && matchDateEnd;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'accuracy') return b.accuracyTotal - a.accuracyTotal;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const replayPhrase = (idx: number) => {
    if (!currentFile.words || !audioRef.current) return;
    
    // Find sentence boundaries (punctuation)
    let startIdx = idx;
    while (startIdx > 0 && !/[.!?]/.test(currentFile.words[startIdx - 1].text)) {
      startIdx--;
    }
    
    let endIdx = idx;
    while (endIdx < currentFile.words.length - 1 && !/[.!?]/.test(currentFile.words[endIdx].text)) {
      endIdx++;
    }

    const startWord = currentFile.words[startIdx];
    const endWord = currentFile.words[endIdx];

    if (startWord.startTime !== undefined && endWord.endTime !== undefined) {
      audioRef.current.currentTime = startWord.startTime;
      audioRef.current.play();
      setIsPlaying(true);

      const durationMs = (endWord.endTime - startWord.startTime) * 1000;
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
          // After original, play correct pronunciation for the phrase
          const phraseText = currentFile.words!.slice(startIdx, endIdx + 1).map(w => w.text).join(' ');
          setTimeout(() => {
            speakWord(phraseText);
          }, 600);
        }
      }, durationMs + 200);
    }
  };

  const speakWord = (text: string, lang: string = 'en-US', isFullText: boolean = false) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    // Try to find exact match or fallback to en
    const voice = voices.find(v => v.lang === lang) || 
                  voices.find(v => v.lang.startsWith(lang.split('-')[0])) ||
                  voices.find(v => v.lang.startsWith('en'));
    
    if (voice) utterance.voice = voice;
    utterance.lang = lang;
    utterance.rate = globalSettings.speechRate; // Use global setting

    if (isFullText) {
      utterance.onboundary = (event: any) => {
        if (event.name === 'word') {
          // Efficiently find word index by character position
          const before = text.substring(0, event.charIndex);
          const wordsBefore = before.trim().split(/\s+/).length;
          // Only update if it's a valid change to avoid excess renders
          setTtsCurrentWordIdx(prev => prev === wordsBefore - 1 ? prev : wordsBefore - 1);
        }
      };
      utterance.onend = () => setTtsCurrentWordIdx(null);
      utterance.onerror = () => setTtsCurrentWordIdx(null);
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleWordInteraction = (idx: number | null) => {
    setActiveWordIdx(idx);
    if (idx !== null && currentFile.words) {
      if ('vibrate' in navigator) navigator.vibrate(20);
    }
  };

  const fetchWordDefinition = async (word: string) => {
    if (!word) return;
    setIsFetchingDefinition(true);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase().replace(/[^a-z]/g, '')}`);
      if (response.ok) {
        const data = await response.json();
        const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";
        setSelectedWordForModal(prev => prev ? { ...prev, definition } : null);
      } else {
        setSelectedWordForModal(prev => prev ? { ...prev, definition: "Definition not found." } : null);
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
    } finally {
      setIsFetchingDefinition(false);
    }
  };

  const handleWordClick = async (word: PlayWord) => {
    if (word.score < 75) {
      setSelectedWordForModal(word);
      speakWord(word.text);
      if (!word.definition) {
        fetchWordDefinition(word.text);
      }
    } else {
      replayWordSnippet(word);
    }
  };

  const startLongPress = (idx: number) => {
    longPressTimer.current = window.setTimeout(() => {
      setActiveWordIdx(idx);
    }, 400); // 400ms for long press
  };

  const endLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const saveCurrentAnalysis = async () => {
    if (currentFile.id) {
      const fileToSave = {
        ...(currentFile as PlayFile),
        name: tempName,
        updatedAt: new Date().toISOString(),
        notes: manualVocab
      };
      await savePractice(fileToSave);
      const updated = await getAllPractices();
      setHistory(updated);
      alert("Practice saved successfully!");
    }
  };

  const handleStartPractice = () => {
    fileInputRef.current?.click();
  };

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage('Scanning text (OCR)...');
    
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageBase64 = reader.result as string;
        const text = await performOCR(imageBase64);
        
        const defaultName = `Practice_${new Date().toLocaleDateString().replace(/\//g, '-')}_${new Date().getHours()}${new Date().getMinutes()}`;
        
        const newFile: Partial<PlayFile> = {
          id: crypto.randomUUID(),
          name: defaultName,
          originalText: text,
          createdAt: new Date().toISOString(),
          accuracyTotal: 0
        };
        
        setCurrentFile(newFile);
        setTempName(defaultName);
        setIsProcessing(false);
        setMode('PRACTICE');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      alert("Error processing image");
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await analyzePronunciation(base64Audio, audioUrl);
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone error:", error);
      alert("Please enable the microphone to practice.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const analyzePronunciation = async (_base64Audio: string, audioUrl: string) => {
    setIsProcessing(true);
    setStatusMessage('Analyzing pronunciation...');
    
    try {
      const { words, transcript, accuracy } = await fastAnalyze(
        currentFile.originalText || ''
      );

      const completedFile: PlayFile = {
        ...(currentFile as PlayFile),
        name: tempName,
        transcribedText: transcript,
        accuracyTotal: accuracy,
        words: words,
        summary: "Quick analysis completed. Focus on sections with low accuracy.",
        audioUrl: audioUrl,
        notes: manualVocab
      };

      await savePractice(completedFile);
      const updatedHistory = await getAllPractices();
      setHistory(updatedHistory);
      
      setCurrentFile(completedFile);
      setIsProcessing(false);
      setMode('ANALYSIS');
      
      if (accuracy >= 80) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error: any) {
      console.error(error);
      alert("Error during rapid analysis.");
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this practice session?')) {
      await deletePractice(id);
      const updated = await getAllPractices();
      setHistory(updated);
      setMode('HOME');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio Playback Handlers
  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 1.0, 1.5, 1.75, 2.0, 2.5, 3.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const skipAudio = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration, audioRef.current.currentTime + seconds));
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = percent * duration;
    setPlaybackProgress(percent * 100);
  };

  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    if (isScrubbing) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const progressContainer = document.getElementById('audio-progress-container');
        if (progressContainer && audioRef.current && duration) {
          const rect = progressContainer.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
          audioRef.current.currentTime = percent * duration;
        }
      };
      const stopScrubbing = () => setIsScrubbing(false);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', stopScrubbing);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', stopScrubbing);
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', stopScrubbing);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', stopScrubbing);
      };
    }
  }, [isScrubbing, duration]);

  return (
    <MotionConfig transition={globalSettings.reducedMotion ? { duration: 0 } : undefined}>
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center pb-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Audio Element */}
      {currentFile.audioUrl && (
        <audio 
          ref={audioRef} 
          src={currentFile.audioUrl} 
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            setCurrentTime(el.currentTime);
            if (el.duration) {
              setPlaybackProgress((el.currentTime / el.duration) * 100);
            }
          }}
        />
      )}

      {/* Header */}
      <header className="w-full max-w-2xl px-6 py-6 flex justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100/50">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 cursor-pointer"
          title="Go to home"
        >
          <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-200/50">
            <FileText size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">ReaderON</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-500/70">Master your Speech</p>
          </div>
        </motion.div>
        
        <div className="flex gap-1.5">
          {mode !== 'HOME' && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isRecording) stopRecording();
                setMode('HOME');
              }}
              className="p-3 text-slate-500 hover:bg-slate-100/80 rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
              title="Return to home"
            >
              <RotateCcw size={20} strokeWidth={2.5} />
            </motion.button>
          )}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(true)}
            className="p-3 text-slate-500 hover:bg-slate-100/80 rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
            title="Open settings and configuration"
          >
            <Settings size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </header>

      <main className="w-full max-w-2xl px-6 pt-8 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {mode === 'HOME' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Hero Action Card */}
              <div className="bento-card p-10 relative overflow-hidden group border-indigo-100/50">
                <div className="relative z-10 flex flex-col items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">New Start</div>
                  <h2 className="text-4xl font-black text-slate-900 leading-[0.9] tracking-tighter">Boost your <br/><span className="text-indigo-600">fluency</span> today</h2>
                  <p className="text-slate-500 max-w-xs font-medium leading-relaxed mb-4 text-sm">Scan books, articles or notes and get instant feedback on your American pronunciation.</p>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartPractice}
                    className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-5 rounded-3xl font-black shadow-2xl transition-all cursor-pointer" 
                    title="Take a photo of a text to practice"
                  >
                    <Camera size={22} strokeWidth={2.5} />
                    START PRACTICE
                    <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCapture} />
                  </motion.button>
                </div>
                {/* Visual Flair */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] opacity-40 group-hover:bg-indigo-100 transition-colors" />
                <div className="absolute top-1/2 left-[85%] w-24 h-24 border-4 border-indigo-50/50 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Study Entry Card */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  onClick={() => setMode('STUDY')}
                  className="bento-card p-8 relative overflow-hidden group cursor-pointer border-blue-100/50"
                >
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Structured</div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Master <br/>Classes</h2>
                    <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Step-by-step tutoring modules for all levels.</p>
                    
                    <div className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Open Module <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                  {/* Visual Flair */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors" />
                </motion.div>

                {/* EBooks Entry Card */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  onClick={() => setMode('EBOOKS')}
                  className="bento-card p-8 relative overflow-hidden group cursor-pointer border-emerald-100/50"
                >
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Library</div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Digital <br/>Library</h2>
                    <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Executive summaries for speaking and grammar.</p>
                    
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Explore Books <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                  {/* Visual Flair */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-50/50 rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors" />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phonetics Entry Card */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  onClick={() => setMode('PHONETICS')}
                  className="bento-card p-8 relative overflow-hidden group cursor-pointer border-purple-100/50 border-r-4 border-r-purple-500"
                >
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Guide</div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Phonetics</h2>
                    <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Master American & British sounds with examples.</p>
                    
                    <div className="inline-flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Start Guide <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                </motion.div>

                {/* Cognates Entry Card */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  onClick={() => setMode('COGNATES')}
                  className="bento-card p-8 relative overflow-hidden group cursor-pointer border-indigo-100/50 border-l-4 border-l-indigo-600"
                >
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Vocabulary</div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Cognates</h2>
                    <p className="text-slate-400 max-w-xs text-xs font-medium leading-relaxed mb-2">Boost fluency with 400+ linguistic pairs.</p>
                    
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Learn More <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* History Section Controls */}
              <div className="space-y-5">
                <div className="flex flex-col gap-4 px-4">
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-black text-slate-900">Your Progress</h3>
                    <p className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">{history.length} Sessions</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <input 
                      type="text" 
                      placeholder="Search by name..." 
                      className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-2 text-sm font-semibold outline-none focus:border-indigo-500 transition-all shadow-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-sm border ${showAdvancedFilters ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-100' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}
                      title={showAdvancedFilters ? "Hide advanced filters" : "Show advanced search filters"}
                    >
                      FILTERS {showAdvancedFilters ? '▲' : '▼'}
                    </button>
                    <select 
                      className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-sm font-bold text-slate-600 outline-none focus:border-indigo-500 shadow-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      title="Sort session list"
                    >
                      <option value="date">Recent</option>
                      <option value="accuracy">Best Score</option>
                      <option value="name">Alphabetical</option>
                    </select>
                  </div>

                  <AnimatePresence>
                    {showAdvancedFilters && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white rounded-2xl border border-slate-100 p-4 grid grid-cols-2 gap-4"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accuracy range (%)</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              placeholder="Min" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-xs"
                              value={accuracyRange.min}
                              onChange={(e) => setAccuracyRange({ ...accuracyRange, min: parseInt(e.target.value) || 0 })}
                            />
                            <input 
                              type="number" 
                              placeholder="Max" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-xs"
                              value={accuracyRange.max}
                              onChange={(e) => setAccuracyRange({ ...accuracyRange, max: parseInt(e.target.value) || 100 })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="date" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px]"
                              value={dateRange.start}
                              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            />
                            <input 
                              type="date" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px]"
                              value={dateRange.end}
                              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid gap-4 px-1">
                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                      <div className="bg-slate-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <History size={24} className="text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-bold mb-1">No results</p>
                      <p className="text-slate-300 text-sm">Change filters or start practicing</p>
                    </div>
                  ) : (
                    filteredHistory.map((item, idx) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          setCurrentFile(item);
                          setTempName(item.name);
                          setManualVocab(item.notes || []);
                          setMode('ANALYSIS');
                        }}
                        className="bg-white p-5 rounded-3xl flex items-center justify-between border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
                        title="View detailed analysis and feedback for this session"
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-inner ${item.accuracyTotal >= 75 ? 'bg-emerald-500 text-emerald-50' : item.accuracyTotal >= 55 ? 'bg-amber-400 text-amber-50' : 'bg-red-500 text-red-50'}`}>
                            {item.accuracyTotal}%
                          </div>
                          <div>
                            <p className="font-black text-slate-800 transition-colors group-hover:text-indigo-600">{item.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                              <div className="w-1 h-1 bg-slate-200 rounded-full" />
                              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.words?.length || 0} words</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                          <ChevronRight size={18} strokeWidth={3} />
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {mode === 'PHONETICS' && (
            <PhoneticSection 
              onBack={() => setMode('HOME')}
              speakText={speakWord}
            />
          )}

          {mode === 'COGNATES' && (
            <CognateSection 
              onBack={() => setMode('HOME')}
              speakText={speakWord}
            />
          )}

          {mode === 'STUDY' && (
            <motion.div 
              key="study"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1 flex flex-col"
            >
              {/* Study Header */}
              <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                        if (activeSubCategory) {
                            setActiveSubCategory(null);
                        } else if (activeSuperCategory) {
                            setActiveSuperCategory(null);
                        } else {
                            setMode('HOME');
                        }
                    }}
                    className="p-2 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <ArrowLeft size={20} className="text-slate-400" />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">
                        {activeSubCategory ? activeSuperCategory?.title : 'Grammar Explorer'}
                    </span>
                    <h3 className="text-lg font-black text-slate-800 leading-none">
                        {activeSubCategory ? activeSubCategory.title : activeSuperCategory ? activeSuperCategory.title : 'Super Categories'}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveSubCategory(null); setActiveSuperCategory(null); setMode('HOME'); }} 
                  className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Study Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                {!activeSuperCategory ? (
                    /* Render Super Categories List */
                    <div className="grid gap-4 px-1">
                        {STUDY_DATA.map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setActiveSuperCategory(cat)}
                                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 hover:shadow-lg transition-all group"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                <Sparkles size={16} />
                                            </div>
                                            <h4 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{cat.title}</h4>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed max-w-sm">{cat.description}</p>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                                        <ArrowRight size={20} strokeWidth={3} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : !activeSubCategory ? (
                    /* Render Sub Categories List */
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6">
                            <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Definition</h4>
                            <p className="text-slate-600 leading-relaxed font-medium">{activeSuperCategory.description}</p>
                        </div>
                        
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-6">Sub Categories</h4>
                        <div className="grid gap-4 px-1">
                            {activeSuperCategory.subCategories.map((sub, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setActiveSubCategory(sub)}
                                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200 hover:shadow-lg transition-all group flex justify-between items-center"
                                >
                                    <h5 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{sub.title}</h5>
                                    <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                                        <ChevronRight size={18} strokeWidth={3} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Render Sub Category Content */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">English Description</h4>
                                    <p className="text-slate-800 text-lg font-bold leading-relaxed">{activeSubCategory.descriptionEn}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Translation (Spanish)</h4>
                                    <p className="text-slate-500 text-lg font-medium italic leading-relaxed">{activeSubCategory.descriptionEs}</p>
                                </div>
                            </div>
                            
                            <div className="pt-8 border-t border-slate-50 space-y-6">
                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    Common Examples
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {activeSubCategory.examples.map((example, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => speakWord(example)}
                                            className="px-5 py-3 bg-slate-50 rounded-2xl text-slate-700 font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-all cursor-pointer shadow-sm border border-transparent hover:border-indigo-100 flex items-center gap-2"
                                        >
                                            <Volume2 size={14} className="opacity-0 group-hover:opacity-100" />
                                            {example}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setActiveSubCategory(null)}
                            className="w-full py-5 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100 text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:shadow-xl hover:shadow-indigo-100 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                        >
                            <ArrowLeft size={18} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Back to Sub Categories
                        </button>
                    </div>
                )}
              </div>
            </motion.div>
          )}

          {mode === 'EBOOKS' && (
            <motion.div 
              key="ebooks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1 flex flex-col"
            >
              {/* EBooks Header */}
              <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                        if (activeBook) {
                            setActiveBook(null);
                        } else {
                            setMode('HOME');
                        }
                    }}
                    className="p-2 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <ArrowLeft size={20} className="text-slate-400" />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">
                        Curriculum Library
                    </span>
                    <h3 className="text-lg font-black text-slate-800 leading-none">
                        {activeBook ? activeBook.title : 'EBooks Resume'}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveBook(null); setMode('HOME'); }} 
                  className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* EBooks Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                {!activeBook ? (
                    <div className="grid gap-4 px-1">
                        {EBOOKS_DATA.map((book, idx) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setActiveBook(book)}
                                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-emerald-200 hover:shadow-lg transition-all group"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                <BookOpen size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{book.title}</h4>
                                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">{book.level}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed max-w-sm mt-2">{book.description}</p>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-xl text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                                        <ArrowRight size={20} strokeWidth={3} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-3">Overview</h4>
                            <p className="text-slate-600 leading-relaxed font-medium">{activeBook.description}</p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                { label: 'Speaking', content: activeBook.summary.speaking, icon: <Volume2 size={18}/>, color: 'blue' },
                                { label: 'Grammar', content: activeBook.summary.grammar, icon: <Target size={18}/>, color: 'purple' },
                                { label: 'Pronunciation', content: activeBook.summary.pronunciation, icon: <Mic size={18}/>, color: 'amber' },
                                { label: 'Writing', content: activeBook.summary.writing, icon: <PenLine size={18}/>, color: 'emerald' },
                                { label: 'Reading', content: activeBook.summary.reading, icon: <BookOpen size={18}/>, color: 'indigo' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`p-4 rounded-2xl transition-colors ${
                                            item.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' :
                                            item.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-100' :
                                            item.color === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-100' :
                                            item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' :
                                            'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                                        }`}>
                                            {item.icon}
                                        </div>
                                        <div className="space-y-2.5 flex-1">
                                            <h5 className="font-black text-slate-900 uppercase tracking-widest text-[11px] opacity-60">{item.label}</h5>
                                            <ul className="space-y-2">
                                                {item.content.map((point, pIdx) => (
                                                    <li 
                                                        key={pIdx} 
                                                        onClick={() => {
                                                            if (point.detail) {
                                                                setActiveBookPoint(point);
                                                                setActiveBookColor(item.color);
                                                                setMode('EBOOK_DETAIL');
                                                            }
                                                        }}
                                                        className={`text-slate-700 text-sm font-semibold leading-relaxed flex items-start gap-2.5 ${point.detail ? 'cursor-pointer hover:text-emerald-600 transition-colors' : ''}`}
                                                    >
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                                                            item.color === 'blue' ? 'bg-blue-400' :
                                                            item.color === 'purple' ? 'bg-purple-400' :
                                                            item.color === 'amber' ? 'bg-amber-400' :
                                                            item.color === 'emerald' ? 'bg-emerald-400' :
                                                            'bg-indigo-400'
                                                        }`} />
                                                        <div className="flex-1 flex items-center justify-between gap-2">
                                                            <span>{point.text}</span>
                                                            {point.detail && (
                                                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md whitespace-nowrap">Show Details</span>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button 
                            onClick={() => setActiveBook(null)}
                            className="w-full py-5 rounded-[2rem] bg-emerald-50 border-2 border-emerald-100 text-emerald-600 font-black text-sm uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:shadow-xl hover:shadow-emerald-100 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                        >
                            <ArrowLeft size={18} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
                        </button>
                    </div>
                )}
              </div>
            </motion.div>
          )}

          {mode === 'EBOOK_DETAIL' && activeBookPoint && activeBookPoint.detail && (
            <motion.div
              key="ebook-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 flex-1 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setMode('EBOOKS')}
                            className="p-2 hover:bg-slate-50 rounded-xl transition-all"
                        >
                            <ArrowLeft size={20} className="text-slate-400" />
                        </button>
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-black text-${activeBookColor === 'emerald' ? 'emerald' : activeBookColor === 'purple' ? 'purple' : activeBookColor === 'amber' ? 'amber' : activeBookColor === 'blue' ? 'blue' : 'indigo'}-600 uppercase tracking-widest leading-none mb-1`}>
                                Topic Detail
                            </span>
                            <h3 className="text-lg font-black text-slate-800 leading-none">
                                {activeBookPoint.detail.titleEn}
                            </h3>
                        </div>
                    </div>
                    <button 
                        onClick={() => setMode('EBOOKS')} 
                        className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-12 pr-1">
                    {/* Bilingual Description */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                English Explanation
                            </div>
                            <p className="text-slate-700 leading-relaxed font-semibold">
                                {activeBookPoint.detail.descEn}
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                                Explicación en Español
                            </div>
                            <p className="text-slate-700 leading-relaxed font-semibold">
                                {activeBookPoint.detail.descEs}
                            </p>
                        </div>
                    </div>

                    {/* Characteristics */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <h4 className={`text-xs font-black text-${activeBookColor === 'emerald' ? 'emerald' : activeBookColor === 'purple' ? 'purple' : activeBookColor === 'amber' ? 'amber' : activeBookColor === 'blue' ? 'blue' : 'indigo'}-600 uppercase tracking-widest flex items-center gap-2`}>
                            <Info size={16} /> Key Characteristics
                        </h4>
                        <div className="grid gap-3">
                            {activeBookPoint.detail.characteristics.map((char, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                                        activeBookColor === 'blue' ? 'bg-blue-400' :
                                        activeBookColor === 'purple' ? 'bg-purple-400' :
                                        activeBookColor === 'amber' ? 'bg-amber-400' :
                                        activeBookColor === 'emerald' ? 'bg-emerald-400' :
                                        'bg-indigo-400'
                                    }`} />
                                    <p className="text-slate-700 text-sm font-bold leading-relaxed">{char}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-4">
                        <h4 className={`text-xs font-black text-${activeBookColor === 'emerald' ? 'emerald' : activeBookColor === 'purple' ? 'purple' : activeBookColor === 'amber' ? 'amber' : activeBookColor === 'blue' ? 'blue' : 'indigo'}-600 uppercase tracking-widest pl-4`}>
                            Usage & Examples
                        </h4>
                        <div className="grid gap-4">
                            {activeBookPoint.detail.examples.map((ex, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Normal Sentence</span>
                                            <p className="text-slate-500 font-medium italic">{ex.original}</p>
                                        </div>
                                        {ex.transformed && (
                                            <div className="flex flex-col gap-1">
                                                <span className={`text-[10px] font-black text-${activeBookColor === 'blue' ? 'blue' : activeBookColor === 'purple' ? 'purple' : activeBookColor === 'amber' ? 'amber' : activeBookColor === 'emerald' ? 'emerald' : 'indigo'}-500 uppercase tracking-widest`}>Transformed Structure</span>
                                                <p className="text-slate-900 text-lg font-black">{ex.transformed}</p>
                                            </div>
                                        )}
                                        {ex.note && (
                                            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                                                <span className="font-bold">Note:</span> {ex.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => setMode('EBOOKS')}
                        className={`w-full py-5 rounded-[2rem] border-2 font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group active:scale-[0.98] ${
                            activeBookColor === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-100' :
                            activeBookColor === 'purple' ? 'bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-purple-100' :
                            activeBookColor === 'amber' ? 'bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-600 hover:text-white hover:shadow-amber-100' :
                            activeBookColor === 'emerald' ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-emerald-100' :
                            'bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-indigo-100'
                        }`}
                    >
                        <ArrowLeft size={18} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Back to Book Summary
                    </button>
                </div>
            </motion.div>
          )}

          {mode === 'PRACTICE' && (
            <motion.div 
              key="practice"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col gap-6"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowRenameModal(true)}
                    className="flex items-center gap-2 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all"
                    title="Rename this practice session"
                  >
                    <span className="font-black text-slate-700 max-w-[200px] truncate">{tempName}</span>
                    <Edit2 size={14} className="text-slate-400" />
                  </button>
                </div>
                <button 
                  onClick={() => { if (isRecording) stopRecording(); setMode('HOME'); }} 
                  className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
                  title="Close and return home"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Text Area */}
              <div className="flex-1 bento-card p-12 relative min-h-[400px] flex flex-col border-indigo-100/30">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white">
                      <Sparkles size={18} />
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">AI Reading Guide</div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => speakWord(currentFile.originalText || '', 'en-US', true)}
                    className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center gap-2 text-[10px] font-black hover:bg-slate-800 transition-all uppercase tracking-widest"
                    title="Listen to full model reading"
                  >
                    <Volume2 size={16} /> Listen to Full Model
                  </motion.button>
                </div>
                
                <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                  <div className="max-w-prose w-full mx-auto space-y-8 py-4">
                    {(() => {
                      const words = currentFile.words || currentFile.originalText?.split(' ').map(t => ({ text: t, score: 0 }));
                      if (!words) return null;
                      
                      const sentences: any[][] = [];
                      let currentSentence: any[] = [];
                      words.forEach(w => {
                        currentSentence.push(w);
                        if (/[.!?]/.test(w.text)) {
                          sentences.push(currentSentence);
                          currentSentence = [];
                        }
                      });
                      if (currentSentence.length > 0) sentences.push(currentSentence);

                      return sentences.map((sentence, sIdx) => {
                        const isSentenceCurrent = sentence.some((w, idx) => {
                          const globalIdx = words.indexOf(w);
                          return (isPlaying && currentTime >= (w.startTime || 0) && currentTime <= (w.endTime || 0)) || (ttsCurrentWordIdx === globalIdx);
                        });

                        return (
                          <motion.p 
                            key={sIdx}
                            animate={{ 
                              opacity: isSentenceCurrent ? 1 : 0.6,
                              scale: isSentenceCurrent ? 1.01 : 1,
                              x: isSentenceCurrent ? 4 : 0
                            }}
                            className={`text-2xl leading-[1.8] text-slate-800 transition-all duration-500 text-justify indent-12 tracking-tight ${isSentenceCurrent ? 'font-semibold' : 'font-medium'}`}
                          >
                            {sentence.map((word, wIdx) => {
                              const globalIdx = words.indexOf(word);
                              const isCurrent = (isPlaying && currentTime >= (word.startTime || 0) && currentTime <= (word.endTime || 0)) || (ttsCurrentWordIdx === globalIdx);
                              return (
                                <motion.span 
                                  key={wIdx} 
                                  animate={{ 
                                    color: isCurrent ? '#ffffff' : isSentenceCurrent ? '#1e293b' : '#64748b',
                                    backgroundColor: isCurrent ? '#4f46e5' : 'transparent',
                                  }}
                                  className="inline-block transition-all duration-200 rounded-lg px-1.5 py-0.5 mx-0.5"
                                >
                                  {word.text}
                                </motion.span>
                              );
                            })}
                          </motion.p>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

                {/* Control Deck */}
                <div className="bento-card p-6 shadow-2xl shadow-indigo-100/20 border-indigo-100/50 mb-8 space-y-6">
                  
                  {/* Playback Settings (Speed) */}
                  <div className="flex justify-center items-center gap-4">
                    <button 
                      onClick={handleSpeedChange}
                      className="flex items-center gap-2 bg-indigo-50 px-5 py-2.5 rounded-2xl text-[10px] font-black text-indigo-600 hover:bg-indigo-100 transition-all uppercase tracking-widest"
                    >
                      <Gauge size={14} />
                      Speed: {playbackSpeed.toFixed(2)}x
                    </button>
                  </div>

                <div className="flex justify-center items-center gap-10">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skipAudio(-10)}
                    className="p-4 text-slate-400 hover:bg-slate-50 rounded-full transition-all"
                    title="Skip back 10 seconds"
                  >
                    <SkipBack size={28} />
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isRecording) {
                        stopRecording();
                      } else {
                        startRecording();
                      }
                    }}
                    className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all relative ${isRecording ? 'bg-red-500 shadow-red-200' : 'bg-indigo-600 shadow-indigo-200'}`}
                    title={isRecording ? "Stop recording" : "Start recording"}
                  >
                    <AnimatePresence mode="wait">
                      {isRecording ? (
                        <motion.div 
                          key="stop"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="w-8 h-8 bg-white rounded-xl"
                        />
                      ) : (
                        <motion.div
                          key="mic"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                        >
                          <Mic size={40} className="text-white" strokeWidth={2.5} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Recording pulse ring */}
                    {isRecording && (
                      <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-25" />
                    )}
                  </motion.button>

                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => skipAudio(10)}
                    className="p-4 text-slate-400 hover:bg-slate-50 rounded-full transition-all"
                    title="Skip forward 10 seconds"
                  >
                    <SkipForward size={28} />
                  </motion.button>
                </div>

                <div className="text-center pt-2">
                   <div className="inline-flex items-center gap-5 px-6 py-2.5 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span className={`font-black font-mono text-xl ${isRecording ? 'text-red-500' : 'text-slate-400'}`}>
                          {formatTime(recordingTime)}
                        </span>
                      </div>
                      <div className="w-px h-4 bg-slate-200" />
                      <button 
                        onClick={togglePlayback}
                        disabled={!currentFile.audioUrl}
                        className={`font-bold text-sm tracking-tight transition-colors ${currentFile.audioUrl ? 'text-indigo-600 hover:text-indigo-700' : 'text-slate-300 cursor-not-allowed'}`}
                      >
                        {isPlaying ? 'PAUSE' : 'PLAY'}
                      </button>
                   </div>
                </div>
              </div>

              {/* Progress bar for audio */}
              <div className="fixed bottom-0 left-0 w-full h-1.5 bg-slate-100">
                <motion.div 
                  className="h-full bg-indigo-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${playbackProgress}%` }}
                />
              </div>
            </motion.div>
          )}

          {mode === 'ANALYSIS' && (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pb-12"
            >
              {/* Top Stats */}
              <div className="flex flex-col gap-5">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-[0.2em] mb-2">Overall Accuracy Score</p>
                  <p className={`text-7xl font-black ${currentFile.accuracyTotal! >= 75 ? 'text-emerald-600' : currentFile.accuracyTotal! >= 55 ? 'text-amber-600' : 'text-red-600'}`}>
                    {currentFile.accuracyTotal}%
                  </p>
                  <div className="mt-4 bg-slate-50 px-5 py-2 rounded-full border border-slate-100 flex items-center gap-2">
                    <Info size={14} className="text-indigo-500" />
                    <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{getScoreDescription(currentFile.accuracyTotal!)}</span>
                  </div>
                </div>

                {/* IELTS BANDS */}
                {currentFile.ieltsScores && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Lexical', score: currentFile.ieltsScores.lexicalResource, color: 'bg-blue-500' },
                      { label: 'Grammar', score: currentFile.ieltsScores.grammaticalRange, color: 'bg-purple-500' },
                      { label: 'Pronunciation', score: currentFile.ieltsScores.pronunciation, color: 'bg-indigo-500' },
                      { label: 'Fluency', score: currentFile.ieltsScores.fluencyCoherence, color: 'bg-indigo-700' },
                    ].map((m, i) => (
                      <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{m.label}</span>
                        <span className="text-2xl font-black text-slate-900">{m.score.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Audio Analysis Player */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                   <span>Original Audio</span>
                   <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                
                {/* Progress Bar Container */}
                <div 
                  id="audio-progress-container"
                  className="h-2 bg-slate-100 rounded-full cursor-pointer relative overflow-hidden"
                  onMouseDown={(e) => { setIsScrubbing(true); handleScrub(e); }}
                  onTouchStart={(e) => { setIsScrubbing(true); handleScrub(e); }}
                >
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-indigo-500"
                    style={{ width: `${playbackProgress}%` }}
                  />
                  {/* Scrub handle subtle indicator */}
                  <div 
                    className="absolute top-0 w-1 h-full bg-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${playbackProgress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center px-2 pt-2">
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={handleSpeedChange}
                        className="bg-slate-50 text-slate-500 text-[10px] font-black px-3 py-1.5 rounded-xl hover:bg-slate-100"
                        title="Change playback speed"
                      >
                         Speed: {playbackSpeed.toFixed(1)}x
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => skipAudio(-10)} 
                        className="text-slate-400 hover:text-indigo-600"
                        title="Skip back 10 seconds"
                      >
                        <SkipBack size={20} />
                      </button>
                      <button 
                        onClick={togglePlayback}
                        className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-100"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                      </button>
                      <button 
                        onClick={() => skipAudio(10)} 
                        className="text-slate-400 hover:text-indigo-600"
                        title="Skip forward 10 seconds"
                      >
                        <SkipForward size={20} />
                      </button>
                   </div>

                   <div className="w-16" /> {/* Spacer */}
                </div>
              </div>

              {/* Word Detail Area */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-700">
                      <Target size={22} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-slate-900 text-lg font-black uppercase tracking-widest">Detailed Analysis</h3>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TIP: Tap red words for help</p>
                  </div>
                </div>
                
                <div className="text-2xl leading-[2.1] text-slate-800 text-justify indent-12 tracking-tight">
                  {currentFile.words?.map((word, idx) => {
                    const isSpokenByAudio = isPlaying && currentTime >= (word.startTime || 0) && currentTime <= (word.endTime || 0);
                    const isSpokenByTTS = ttsCurrentWordIdx === idx;
                    const isActive = isSpokenByAudio || isSpokenByTTS;
                    
                    return (
                      <span 
                        key={idx} 
                        className="relative inline-block group"
                        onMouseEnter={() => handleWordInteraction(idx)}
                        onMouseLeave={() => handleWordInteraction(null)}
                      >
                        <motion.span 
                          whileHover={{ y: -1 }}
                          animate={{ 
                            backgroundColor: isActive ? '#4f46e5' : 'transparent',
                            color: isActive ? '#ffffff' : undefined,
                            scale: isActive ? 1.1 : 1,
                            zIndex: isActive ? 10 : 1
                          }}
                          onClick={() => handleWordClick(word)}
                          className={`inline-block px-1.5 rounded-lg cursor-pointer transition-all ${isActive ? 'font-black' : getScoreClass(word.score)} ${!isActive && word.score < 55 ? 'border-b-2 border-red-500' : ''}`}
                        >
                          {word.text}
                        </motion.span>
                      
                      {word.score < 75 && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); speakWord(word.text); }}
                          className="inline-flex items-center justify-center w-6 h-6 bg-indigo-50 text-indigo-600 rounded-lg ml-1 hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-indigo-100 active:scale-90"
                          title="Listen to correct pronunciation"
                        >
                          <Volume2 size={12} strokeWidth={3} />
                        </button>
                      )}

                      <AnimatePresence>
                        {activeWordIdx === idx && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black shadow-2xl flex flex-col items-center pointer-events-none"
                          >
                            <span className={word.score >= 75 ? 'text-emerald-400' : 'text-red-400'}>{word.score}% Pronunciation</span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="mx-1 focus:outline-none" />
                    </span>
                  );
                })}
              </div>
            </div>

              {/* Vocabulary Builder */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2.5 rounded-xl text-amber-700">
                      <Settings size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-black uppercase tracking-wider text-sm">Vocabulary Builder</h3>
                      <p className="text-[10px] text-slate-400 font-bold">Customize your word bank</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowVocabForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-[1.2rem] hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 font-black text-xs uppercase tracking-widest"
                    title="Add a new custom word or phrase"
                  >
                    <PenLine size={16} strokeWidth={2.5} /> Add Word
                  </motion.button>
                </div>

                <div className="grid gap-4">
                  {/* Automatic words from current file */}
                  {currentFile.words?.filter(w => w.score < 75).map((word, i) => (
                    <div key={`auto-${i}`} className="flex items-center justify-between bg-slate-50 p-5 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800 text-lg">{word.text}</span>
                          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase">{word.score}%</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{word.definition || 'Needs focus and repetition'}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => replayWordSnippet(word)} className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm hover:shadow-md transition-all"><Play size={16} fill="currentColor" /></button>
                      </div>
                    </div>
                  ))}

                  {/* Manual words */}
                  {manualVocab.map((vocab, i) => (
                    <div key={`manual-${i}`} className="flex items-center justify-between bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 group hover:border-indigo-300 transition-all">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 text-lg">{vocab.word}</span>
                        <span className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{vocab.def}</span>
                      </div>
                      <button 
                        onClick={() => {
                          const updated = manualVocab.filter((_, idx) => idx !== i);
                          setManualVocab(updated);
                          if (currentFile.id) {
                            savePractice({
                              ...currentFile,
                              notes: updated,
                              updatedAt: new Date().toISOString()
                            }).then(async () => {
                              setHistory(await getAllPractices());
                            });
                          }
                        }}
                        className="p-3 text-red-300 hover:text-red-500 hover:bg-white rounded-xl transition-all active:scale-90"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Summary */}
              {currentFile.summary && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-indigo-900 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="bg-white/10 p-2.5 rounded-xl">
                          <Info size={22} className="text-indigo-200" />
                       </div>
                       <h3 className="text-white text-lg font-black uppercase tracking-widest">Session Summary</h3>
                    </div>
                    <p className="text-indigo-50 text-lg leading-relaxed font-medium">
                      {currentFile.summary}
                    </p>
                  </div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                </motion.div>
              )}

              {/* Page Actions */}
              <div className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="flex-1 flex gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMode('HOME')}
                    className="flex-1 min-w-[120px] bg-white border-2 border-slate-100 text-slate-500 font-extrabold px-6 py-4 rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95"
                    title="Return to home"
                  >
                    <RotateCcw size={18} strokeWidth={2.5} /> HOME
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveCurrentAnalysis}
                    className="flex-3 min-w-[180px] bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                    title="Save changes to this session"
                  >
                    <Save size={20} strokeWidth={2.5} /> SAVE ANALYSIS
                  </motion.button>
                </div>
                
                <div className="flex gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const content = `
PRACTICE: ${currentFile.name}
---------------------------------
Date: ${currentFile.createdAt ? new Date(currentFile.createdAt).toLocaleString() : ''}
Overall Accuracy: ${currentFile.accuracyTotal}%

TRANSCRIPTION:
${currentFile.transcribedText}

HIGHLIGHTED VOCABULARY:
${currentFile.words?.filter(w => w.score < 75).map(w => `- ${w.text} (${w.score}%): ${w.definition}`).join('\n')}

MANUAL NOTES:
${manualVocab.map(v => `- ${v.word}: ${v.def}`).join('\n')}
                        `;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${currentFile.name}_analysis.txt`;
                        a.click();
                    }}
                    className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                    title="Export TXT"
                  >
                    <Download size={22} strokeWidth={2.5} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.print()}
                    className="w-14 h-14 bg-white border-2 border-slate-100 text-slate-800 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm"
                    title="Print PDF"
                  >
                    <FileText size={22} strokeWidth={2.5} />
                  </motion.button>
                  {currentFile.id && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (confirm('Delete this practice session?')) {
                          handleDelete(currentFile.id!);
                        }
                      }}
                      className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      title="Delete"
                    >
                      <Trash2 size={22} strokeWidth={2.5} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Rename Modal */}
      <AnimatePresence>
        {showRenameModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit2 size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Rename Practice Session</h3>
                <p className="text-slate-400 text-sm mt-1">Give your session a unique name</p>
              </div>
              
              <input 
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                placeholder="Practice name..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
                onKeyDown={(e) => e.key === 'Enter' && setShowRenameModal(false)}
              />
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRenameModal(false)}
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all uppercase tracking-widest text-sm"
              >
                SAVE NAME
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Portal */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[300] flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-center max-w-xs w-full shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-8" />
                <p className="text-slate-900 font-extrabold text-xl text-center leading-tight">{statusMessage}</p>
                <div className="mt-4 flex gap-1">
                   <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                   <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                   <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Word Details Modal */}
      <AnimatePresence>
        {selectedWordForModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-[400] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedWordForModal(null)}
                className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-600 transition-colors"
              >
                <X size={24} strokeWidth={3} />
              </button>

              <div className="flex flex-col items-center gap-6">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-white text-2xl font-black shadow-xl ${selectedWordForModal.score >= 75 ? 'bg-emerald-500 shadow-emerald-100' : 'bg-red-500 shadow-red-100'}`}>
                  {selectedWordForModal.score}%
                </div>
                
                <div className="text-center">
                  <h2 className="text-3xl font-black text-slate-900">{selectedWordForModal.text}</h2>
                  <p className="text-xs font-black text-indigo-700 uppercase tracking-widest mt-2">Pronunciation Details</p>
                </div>

                <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center space-y-4">
                  {isFetchingDefinition ? (
                    <div className="flex flex-col items-center py-4 gap-2">
                       <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Fetching definition...</span>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700 leading-relaxed font-bold">
                      {selectedWordForModal.definition || "Definition not found."}
                    </p>
                  )}
                  <div className="pt-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speakWord(selectedWordForModal.text)}
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                      title="Listen to correct pronunciation"
                    >
                      <Volume2 size={20} strokeWidth={2.5} /> LISTEN MODEL
                    </motion.button>
                  </div>
                </div>

                <button 
                  onClick={() => replayPhrase(currentFile.words?.indexOf(selectedWordForModal) || 0)}
                  className="w-full py-4 rounded-2xl border-2 border-slate-100 text-slate-700 font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  title="Play segment of your original recording"
                >
                  <SkipBack size={16} /> Replay Original Phrase
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Vocab Form */}
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
                  onChange={e => setNewVocab(v => ({...v, word: e.target.value}))}
                />
                <textarea 
                  placeholder="Definition or notes..."
                  className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-indigo-500 h-32 resize-none"
                  value={newVocab.def}
                  onChange={e => setNewVocab(v => ({...v, def: e.target.value}))}
                />
              </div>
              <div className="flex gap-3">
                 <button onClick={() => setShowVocabForm(false)} className="flex-1 py-4 font-black text-slate-400 bg-slate-50 rounded-2xl">Close</button>
                  <button 
                    disabled={!newVocab.word}
                    onClick={() => {
                      const updatedVocab = [...manualVocab, newVocab];
                      setManualVocab(updatedVocab);
                      setNewVocab({word: '', def: ''});
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
      
      {/* Settings Modal */}
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
                        className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                          globalSettings.fontSize === size 
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
                  <p className="text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.3em]">ReaderON • Premium Edition</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
