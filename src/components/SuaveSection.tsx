import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Sparkles, Settings2, RefreshCcw, Trophy, Target, Zap, Clock, Star, HelpCircle, Loader2 } from 'lucide-react';
import { SUAVE_DATA, SuaveTense, SuaveQuestion } from '../constants/suaveData';
import { evaluateSuaveAnswer, generateSuaveQuestions } from '../services/analysisService';
import { gemmaService } from '../services/gemmaService';
import confetti from 'canvas-confetti';

interface SuaveSectionProps {
  onBack: () => void;
}

export const SuaveSection: React.FC<SuaveSectionProps> = ({ onBack }) => {
  const [selectedTense, setSelectedTense] = useState<SuaveTense | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(5); // Default to 5 for speed
  const [activeQuestions, setActiveQuestions] = useState<SuaveQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ status: 'BAD' | 'GOOD', score: number, correct: string, feedback: string, needsRetry: boolean } | null>(null);
  const [attempts, setAttempts] = useState(0);
  
  const [totalScore, setTotalScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Gemma integration
  const [isGemmaLoading, setIsGemmaLoading] = useState(false);
  const [isGemmaActive, setIsGemmaActive] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkGemma = async () => {
      const ready = await gemmaService.isReady();
      setIsGemmaActive(ready);
    };
    checkGemma();
  }, []);

  const handleStart = async (tense: SuaveTense) => {
    setSelectedTense(tense);
    setIsGemmaLoading(true);
    
    // Use Gemma to generate dynamic questions
    const generated = await generateSuaveQuestions(tense.nameEs, questionCount);
    
    if (generated.length === 0) {
      // Fallback to static if Gemma fails
      const shuffled = [...tense.questions].sort(() => 0.5 - Math.random());
      setActiveQuestions(shuffled.slice(0, questionCount));
    } else {
      setActiveQuestions(generated);
    }
    
    setIsGemmaLoading(false);
    setCurrentQIndex(0);
    setUserInput('');
    setFeedback(null);
    setAttempts(0);
    setTotalScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsFinished(false);
  };

  const evaluateAnswer = async () => {
    if (!userInput.trim() || !selectedTense) return;
    
    setIsGemmaLoading(true);
    try {
      const q = activeQuestions[currentQIndex];
      
      let result;
      if (isGemmaActive) {
        result = await evaluateSuaveAnswer(
          q.spanish,
          userInput,
          selectedTense.nameEn,
          selectedTense.explanation
        );
      } else {
        // Local/Static fallback logic
        const isMatch = userInput.toLowerCase().includes(q.spanish.toLowerCase().split(' ')[0]); // Very basic check
        result = {
          status: isMatch ? 'GOOD' : 'BAD' as 'GOOD' | 'BAD',
          correct: 'AI Offline - Manual Check required',
          feedback: 'No existe la integración con IA Gemma activa. El análisis local es limitado.'
        };
      }

      let points = 0;
      let needsRetry = false;
      
      if (result.status === 'GOOD') {
        points = 10;
        if (attempts === 0) {
          setCombo(prev => {
            const nc = prev + 1;
            if(nc > maxCombo) setMaxCombo(nc);
            return nc;
          });
        }
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } else {
        points = 0;
        setCombo(0);
        needsRetry = true;
      }
      
      // Combo multiplier logic (only on first attempt)
      const comboBonus = (attempts === 0 && combo > 2) ? Math.floor(combo / 2) : 0;
      const finalPoints = attempts === 0 ? (points + comboBonus) : (points > 0 ? 2 : 0);
      
      setFeedback({ 
        status: result.status, 
        score: finalPoints, 
        correct: result.correct, 
        feedback: result.feedback,
        needsRetry 
      });
      
      if (finalPoints > 0) {
        setTotalScore(prev => prev + finalPoints);
      }
      
      if (needsRetry) {
        setAttempts(prev => prev + 1);
      }
    } catch (e) {
      console.error(e);
      alert("Error en el análisis.");
    } finally {
      setIsGemmaLoading(false);
    }
  };

  const handleRetry = () => {
    setFeedback(null);
    setUserInput('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const nextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setUserInput('');
      setFeedback(null);
      setAttempts(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setIsFinished(true);
      if(totalScore > (activeQuestions.length * 5)) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!feedback) evaluateAnswer();
      else if (feedback.needsRetry) handleRetry();
      else nextQuestion();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-900">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[50%] -right-[10%] w-[70%] h-[70%] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => selectedTense && !isFinished ? setSelectedTense(null) : onBack()}
            className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-50 rounded-2xl transition-all border border-slate-200 text-slate-600 shadow-sm active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              SUAVE <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md">PRO AI</span>
            </h2>
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-black">Powered by Gemma</p>
          </div>
        </div>
        
        {!selectedTense && (
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all border ${showSettings ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'}`}
          >
            <Settings2 size={20} />
          </button>
        )}
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
        {showSettings && !selectedTense && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 mb-8 shadow-xl shadow-slate-200/20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Target size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Configuración de Partida</h3>
                <p className="text-xs font-bold text-slate-400">Ajusta tu experiencia de aprendizaje</p>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 ml-1">Preguntas por Sesión</label>
              <div className="flex gap-4">
                {[10, 15, 20].map(num => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    className={`flex-1 py-5 rounded-[2rem] text-lg font-black transition-all border-2 ${questionCount === num ? 'bg-slate-900 border-slate-900 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-300'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {!selectedTense ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            <div className="col-span-full mb-4 px-2">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Elige tu desafío</h3>
              <p className="text-sm font-medium text-slate-500 mt-2">Domina los 12 tiempos verbales con el método SUAVE y generación dinámica por IA.</p>
              
              {!isGemmaActive && (
                <div className="mt-6 bg-amber-50 border-2 border-amber-100 p-6 rounded-[2rem] flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-amber-700">
                    <AlertCircle size={20} />
                    <span className="font-black text-xs uppercase tracking-widest">No existe la integración con IA Gemma activa</span>
                  </div>
                  <p className="text-[11px] text-amber-600 font-bold leading-relaxed">
                    Las funciones de generación dinámica y evaluación profunda están desactivadas. 
                    Puedes continuar usando el contenido local.
                  </p>
                  <button 
                    onClick={() => setIsGemmaActive(false)} // Just keep it false but allow interaction
                    className="self-start px-4 py-2 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-200"
                  >
                    Analyze without AI (Local)
                  </button>
                </div>
              )}
            </div>
            
            {SUAVE_DATA.map((tense, idx) => (
              <motion.div
                key={tense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleStart(tense)}
                className="bg-white hover:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 hover:border-slate-900 cursor-pointer transition-all group relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-3 py-1.5 rounded-xl bg-indigo-50 text-[9px] font-black text-indigo-600 uppercase tracking-widest group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        Nivel {idx + 1}
                      </span>
                      <Sparkles size={20} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors leading-tight">{tense.nameEs}</h3>
                    <p className="text-sm font-bold text-slate-400 group-hover:text-indigo-200 transition-colors mt-1">{tense.nameEn}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-300">
                      <Zap size={14} className="text-indigo-500" /> Iniciar Práctica
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <ArrowLeft size={18} className="rotate-180" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : isFinished ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <div className="w-40 h-40 relative mb-10">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-[40px] animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[3rem] flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <Trophy size={80} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter">¡Misión Cumplida!</h2>
            <p className="text-lg font-bold text-slate-500 mb-10 text-center max-w-sm leading-relaxed">Has completado {activeQuestions.length} desafíos de {selectedTense.nameEs}.</p>
            
            <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-12">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center shadow-xl shadow-slate-200/30 group hover:bg-slate-900 transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-300">Puntaje Total</p>
                <p className="text-5xl font-black text-indigo-600 group-hover:text-white">{totalScore}</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center shadow-xl shadow-slate-200/30 group hover:bg-slate-900 transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-emerald-300">Max Combo</p>
                <p className="text-5xl font-black text-emerald-500 group-hover:text-white">{maxCombo}x</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button 
                onClick={() => handleStart(selectedTense)}
                className="w-full py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 text-lg"
              >
                <RefreshCcw size={22} /> Reintentar Nivel
              </button>
              <button 
                onClick={() => setSelectedTense(null)}
                className="w-full py-5 bg-white text-slate-700 font-black rounded-[2rem] hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm text-sm uppercase tracking-widest"
              >
                Volver al Menú
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-2xl mx-auto w-full pb-20">
            {/* HUD */}
            <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/40">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                  <span className="text-sm font-black leading-none">{currentQIndex + 1}</span>
                  <div className="w-6 h-0.5 bg-indigo-500 my-1 rounded-full" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">{activeQuestions.length}</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{selectedTense.nameEs}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {Array.from({length: activeQuestions.length}).map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i < currentQIndex ? 'w-4 bg-indigo-500' : i === currentQIndex ? 'w-8 bg-slate-900' : 'w-1.5 bg-slate-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                {combo > 1 && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-amber-500 px-4 py-2 rounded-2xl text-white shadow-lg shadow-amber-200 flex flex-col items-center"
                  >
                    <span className="text-[9px] font-black uppercase tracking-tighter leading-none mb-0.5">COMBO</span>
                    <span className="text-xl font-black leading-none">{combo}x</span>
                  </motion.div>
                )}
                <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 text-center">SCORE</span>
                  <span className="text-3xl font-black text-slate-900 leading-none">{totalScore}</span>
                </div>
              </div>
            </div>

            {/* Explanation - Collapsible */}
            {currentQIndex === 0 && !feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[3rem] mb-8 relative overflow-hidden shadow-2xl shadow-indigo-200"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full -ml-16 -mb-16 blur-2xl" />
                
                <h4 className="font-black text-white text-xl mb-4 flex items-center gap-3">
                  <Star size={24} className="text-amber-400" /> Guía SUAVE & Fórmulas
                </h4>
                <p className="text-indigo-100 text-base font-medium leading-relaxed whitespace-pre-wrap border-l-4 border-indigo-400/50 pl-4">
                  {selectedTense.explanation}
                </p>
              </motion.div>
            )}
            
            {/* Main Practice Card */}
            <div className="bg-white p-2 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                
                <div className="mb-10 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${
                      activeQuestions[currentQIndex].difficulty === 'easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      activeQuestions[currentQIndex].difficulty === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {activeQuestions[currentQIndex].difficulty}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">{activeQuestions[currentQIndex].spanish}</h2>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="relative group">
                    <textarea
                      ref={inputRef}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={feedback !== null && !feedback.needsRetry}
                      placeholder="Escribe tu traducción al inglés..."
                      className={`w-full bg-white border-2 rounded-[2rem] p-8 text-xl font-bold text-slate-900 placeholder:text-slate-300 focus:border-slate-900 focus:ring-8 focus:ring-slate-900/5 transition-all outline-none resize-none shadow-sm disabled:opacity-70 ${feedback && feedback.needsRetry ? 'border-rose-400 bg-rose-50' : 'border-slate-100'}`}
                      rows={3}
                      autoFocus
                    />
                    <div className="absolute bottom-6 right-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] pointer-events-none group-focus-within:text-slate-900 transition-colors">
                      PRESS ENTER ↵
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {(!feedback || isGemmaLoading) ? (
                      <motion.button 
                        key="eval-btn"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={evaluateAnswer}
                        disabled={!userInput.trim() || isGemmaLoading}
                        className="w-full py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:scale-95 shadow-2xl active:scale-95 flex items-center justify-center gap-3 text-xl overflow-hidden relative"
                      >
                        {isGemmaLoading && <Loader2 className="animate-spin absolute left-8" size={24} />}
                        <span>{isGemmaLoading ? "Gemma analizando..." : "Comprobar con IA"}</span>
                        <ArrowLeft size={24} className="rotate-180" />
                      </motion.button>
                    ) : (
                      <motion.div 
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`p-8 rounded-[2.5rem] border-2 bg-white relative overflow-hidden shadow-2xl ${
                          feedback.status === 'GOOD' ? 'border-emerald-500 shadow-emerald-500/10' :
                          'border-rose-500 shadow-rose-500/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                              feedback.status === 'GOOD' ? 'bg-emerald-500 text-white' :
                              'bg-rose-500 text-white'
                            }`}>
                              {feedback.status === 'GOOD' ? <Trophy size={32} /> : <XCircle size={32} />}
                            </div>
                            <div>
                              <span className={`font-black text-3xl tracking-tighter block leading-none mb-1 ${
                                feedback.status === 'GOOD' ? 'text-emerald-600' : 'text-rose-600'
                              }`}>{feedback.status === 'GOOD' ? 'EXCELENTE' : 'MEJORABLE'}</span>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Análisis por Gemma</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`font-black text-4xl block leading-none ${feedback.score > 0 ? 'text-slate-900' : 'text-slate-300'}`}>+{feedback.score}</span>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">PTS EARNED</p>
                          </div>
                        </div>
                        
                        <div className="mt-5 pt-5 border-t border-slate-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={18} className="text-indigo-500" />
                            <h4 className="text-sm font-black text-slate-800">Feedback de Gemma</h4>
                          </div>

                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Lo correcto según IA:</p>
                            <p className="font-black text-lg text-emerald-700">{feedback.correct}</p>
                          </div>
                          
                          <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-xl shadow-indigo-100 text-sm font-medium">
                            <p className="leading-relaxed italic">
                              "{feedback.feedback}"
                            </p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={feedback.needsRetry ? handleRetry : nextQuestion}
                          className={`w-full mt-8 py-5 font-black rounded-2xl transition-all flex items-center justify-center gap-3 text-lg ${
                            feedback.needsRetry 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200' 
                            : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-xl'
                          }`}
                        >
                          {feedback.needsRetry ? (
                            <><RefreshCcw size={22} /> Intentar de nuevo</>
                          ) : (
                            <>Continuar desafío <ArrowLeft size={24} className="rotate-180" /></>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Version 0.0.1 feature 0.0.24