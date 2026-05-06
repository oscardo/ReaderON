import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Square, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  Volume2,
  AlertCircle
} from 'lucide-react';

interface PracticeSectionProps {
  textToRead: string;
  onAnalysisComplete: (transcript: string, audioUrl?: string) => void;
  onBack: () => void;
  speakText: (text: string) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({ 
  textToRead, 
  onAnalysisComplete, 
  onBack,
  speakText
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const startRecording = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported on this device.");
      return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        
        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            onAnalysisComplete(transcriptRef.current.trim(), audioUrl);
            setIsAnalyzing(false);
        };

        transcriptRef.current = '';
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              transcriptRef.current += event.results[i][0].transcript + ' ';
            }
          }
        };

        recognitionRef.current.onend = () => {
          if (isRecording) {
            try { recognitionRef.current.start(); } catch(e) {}
          }
        };

        mediaRecorderRef.current.start();
        recognitionRef.current.start();
        setIsRecording(true);
        setRecordingTime(0);
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => {
              if (prev >= 15) {
                  stopRecording();
                  return 15;
              }
              return prev + 1;
          });
        }, 1000);
    } catch (e) {
      console.error("Failed to start recording", e);
      alert("Please ensure microphone access is granted.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    setIsAnalyzing(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex-1 flex flex-col h-full"
    >
      {/* Header */}
      <div className="bg-white px-8 pt-16 pb-8 border-b border-slate-100 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Oral Practice</h2>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Read the scanned text aloud</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Text to Read Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
           <div className="flex items-center gap-2 mb-6">
             <Sparkles size={16} className="text-indigo-500" />
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Text</h3>
           </div>
           
           <p className="text-2xl font-bold text-slate-800 leading-relaxed text-center italic">
             "{textToRead}"
           </p>

           <div className="mt-8 flex justify-center">
             <button 
               onClick={() => speakText(textToRead)}
               className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
             >
               <Volume2 size={16} /> LISTEN REFERENCE
             </button>
           </div>

           {/* Decorative background circle */}
           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-50" />
        </div>

        {/* Recorder Section */}
        <div className="flex flex-col items-center justify-center py-10 space-y-8">
          <div className="relative">
            {/* Progress Ring */}
            <svg className="w-48 h-48 -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-100"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 88}
                animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - recordingTime / 15) }}
                className="text-indigo-600"
              />
            </svg>
            
            {/* Control Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isAnalyzing}
                className={`w-32 h-32 rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl transition-all ${
                  isRecording ? 'bg-red-500 text-white shadow-red-200' : 'bg-slate-900 text-white shadow-slate-200'
                }`}
              >
                {isRecording ? <Square size={32} fill="white" /> : <Mic size={32} fill="white" />}
                <span className="text-[10px] font-black uppercase tracking-widest mt-2">
                  {isRecording ? 'STOP' : 'START'}
                </span>
              </motion.button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              {isRecording ? 'Recording your voice...' : isAnalyzing ? 'Analyzing patterns...' : 'Tap to start recording'}
            </h4>
            {isRecording && (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-2xl font-black tabular-nums text-slate-800">{recordingTime}s / 15s</span>
                </div>
            )}
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <div className="fixed inset-0 z-[300] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-6">
           <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
             <Loader2 size={40} className="animate-spin" />
           </div>
           <div className="text-center space-y-2">
             <h3 className="text-xl font-black text-slate-900">Evaluating Performance</h3>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Comparing phonemes and rhythm...</p>
           </div>
        </div>
      )}

      {/* Safety Alert if no transcript after recording */}
      {!isRecording && !isAnalyzing && transcriptRef.current === '' && recordingTime > 0 && (
          <div className="px-8 pb-8">
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-700 font-bold leading-relaxed">
                      We didn't catch any audio. Please ensure you speak clearly and grant microphone permissions if requested.
                  </p>
              </div>
          </div>
      )}
    </motion.div>
  );
};
