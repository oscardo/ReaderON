import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Languages, Sparkles, Loader2, Copy, Volume2, Trash2, Camera, Eraser, Target } from 'lucide-react';
import { translateWithGemma } from '../services/analysisService';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { performOCR } from '../services/ocrService';

interface TranslatorSectionProps {
  onBack: () => void;
}

export const TranslatorSection: React.FC<TranslatorSectionProps> = ({ onBack }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [targetLang, setTargetLang] = useState('English');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    try {
      const result = await translateWithGemma(sourceText, targetLang);
      setTranslatedText(result);
    } catch (e) {
      alert("Error en la traducción con Gemma.");
    } finally {
      setIsLoading(false);
    }
  };

  const speak = async (text: string) => {
    try {
      await TextToSpeech.speak({
        text,
        lang: targetLang === 'English' ? 'en-US' : 'es-ES',
        rate: 1.0,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCamera = async () => {
    try {
      const image = await CapCamera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      if (image.dataUrl) {
        setIsLoading(true);
        const text = await performOCR(image.dataUrl);
        setSourceText(text);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FF] min-h-screen font-sans">
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 shadow-sm transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Magic Translator</h2>
            <p className="text-[10px] text-indigo-500 uppercase tracking-widest font-black">Powered by Gemma 4</p>
          </div>
        </div>
        <Languages className="text-indigo-600" size={24} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {/* Input Area */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-indigo-100/50 border border-indigo-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Texto de Origen</span>
            <div className="flex gap-2">
              <button onClick={handleCamera} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Camera size={18} />
              </button>
              <button onClick={() => setSourceText('')} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                <Eraser size={18} />
              </button>
            </div>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Escribe o pega aquí lo que quieras traducir..."
            className="w-full h-32 bg-transparent text-xl font-bold text-slate-900 placeholder:text-slate-200 outline-none resize-none"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <select 
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-4 font-black text-xs uppercase tracking-widest text-slate-600 outline-none focus:border-indigo-500"
          >
            <option value="English">Translate to English</option>
            <option value="Spanish">Traducir a Español</option>
          </select>
          <button 
            onClick={handleTranslate}
            disabled={!sourceText.trim() || isLoading}
            className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
          </button>
        </div>

        {/* Result Area */}
        <AnimatePresence>
          {translatedText && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em]">Traducción IA</span>
                  <div className="flex gap-2">
                    <button onClick={() => speak(translatedText)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Volume2 size={18} />
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(translatedText);
                      alert("Copiado al portapapeles");
                    }} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-2xl font-black leading-tight">
                  {translatedText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-8">
          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100/50">
            <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Target size={14} /> Tip Maestro
            </h4>
            <p className="text-sm font-medium text-indigo-900/70 leading-relaxed">
              Gemma no solo traduce, entiende el contexto. Usa frases completas para obtener resultados más precisos y naturales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Version 0.0.1 feature 0.0.24
