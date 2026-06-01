import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, Square, Headphones, Play, Sparkles } from 'lucide-react';

interface LinguaSkillsSectionProps {
  onBack: () => void;
  speakText: (text: string, lang?: string) => Promise<void>;
  stopSpeaking: () => Promise<void>;
}

const LISTENING_TIPS = [
  {
    title: 'Entender la idea general y los detalles en la prueba de Listening de Linguaskill',
    paragraphs: [
      'Algunas preguntas en la prueba de Listening de Linguaskill requieren que comprendas la idea general (gist) o los detalles de una grabación. En algunas tareas, habrá un audio corto y una sola pregunta. En otras, escucharás un diálogo más largo (más de un hablante) o un monólogo (un solo hablante) y habrá dos o más preguntas por responder.',
      'Preguntas de idea general (Gist): Analizan el "panorama completo"; evalúan tu comprensión global de lo que escuchas. Debes escuchar toda la grabación (o la parte en la que se enfoca la pregunta) e identificar y combinar toda la información relevante, la cual probablemente aparecerá a lo largo de todo el audio. La información que necesitas puede estar expresada directamente o de forma implícita, por ejemplo, mediante la entonación que usa el hablante o los comentarios que realiza.',
      'Preguntas de detalle: Evalúan tu comprensión de puntos específicos de información dentro de la grabación. Es más probable que estos detalles se encuentren en una sola frase u oración, en lugar de en toda la grabación o en una sección amplia de la misma. Al escuchar para identificar detalles, debes concentrarte en toda la información de la parte relevante de la grabación para elegir la respuesta correcta.',
      'Sinónimos y paráfrasis: Las palabras que escuches en el texto, tanto para las preguntas de idea general como de detalle, pueden no ser las mismas que aparecen en la pregunta. Se utilizarán sinónimos o paráfrasis para asegurar que estés escuchando para comprender y no solo para emparejar palabras. Aprenderás más sobre sinónimos y paráfrasis en una lección posterior.',
      'Distractores: Al responder preguntas de idea general o de detalle en la prueba de Linguaskill, habrá "distracción" en la grabación y/o en las otras opciones de la pregunta. Es decir, información que parece estar conectada pero que no responde a la pregunta. Para las preguntas de idea general, esta distracción estará distribuida por toda la grabación o en la sección en la que se enfoca la pregunta. En el caso de las preguntas de detalle, el distractor estará en la misma parte de la grabación que la respuesta correcta.'
    ]
  },
  {
    title: 'Identificación de sinónimos y paráfrasis en el Listening de Linguaskill',
    paragraphs: [
      'Responder a las tareas de la prueba de Listening de Linguaskill implica comprender y extraer información de una variedad de textos de audio. En la mayoría de los casos, especialmente en los niveles más altos, es necesario identificar sinónimos y paráfrasis de las palabras que lees en las preguntas y opciones, en lugar de escuchar exactamente las mismas palabras.',
      'Sinónimo: Es una palabra o frase que tiene el mismo significado, o casi el mismo, que otra palabra o frase; por ejemplo, "examen" es un sinónimo de "prueba".',
      'Paráfrasis: Cuando parafraseamos algo que una persona ha dicho o escrito, lo repetimos utilizando palabras diferentes, a menudo de forma más sencilla y corta.',
      'Para completar las tareas, antes de escuchar, lee la pregunta y las opciones e intenta predecir otras formas en las que el hablante o los hablantes podrían expresar las mismas ideas. Cuando escuches un sinónimo o una paráfrasis en un texto, presta atención al lenguaje que lo rodea para confirmar si lo que has oído es exactamente lo que pide la pregunta. Puedes comprobarlo la segunda vez que escuches el audio.',
      'En esta lección, practicarás habilidades que te ayudarán a identificar sinónimos y paráfrasis. Luego, tendrás la oportunidad de practicar una tarea de muestra de Linguaskill Business Listening para la cual estas habilidades serán de gran utilidad.'
    ]
  },
  {
    title: 'Entender el propósito y la función en el Listening de Linguaskill',
    paragraphs: [
      'Algunas preguntas de opción múltiple en la prueba de Listening se centran en el propósito y la función, por ejemplo, por qué un hablante introduce un punto determinado o hace un comentario particular. Por lo general, el hablante no expresará su propósito o función de manera explícita, especialmente en los niveles más altos, y es posible que debas escuchar varios fragmentos de información para identificar por qué ha dicho algo.',
      'Para responder a preguntas de este tipo, lee las opciones detenidamente para decidir cuál coincide con lo que dice el hablante. Los distractores (opciones incorrectas) incluirán algo de información que el hablante menciona, pero no serán correctos debido a pequeños detalles en la redacción, por ejemplo, en la elección del verbo o del adjetivo.',
      'En esta lección, analizarás algunos ejemplos de lenguaje utilizado para expresar propósito y función, y tendrás la oportunidad de practicar con una pregunta de ejemplo de Linguaskill Listening.'
    ]
  },
  {
    title: 'Entender opiniones y sentimientos en el Listening de Linguaskill',
    paragraphs: [
      'Las tareas de la prueba de Listening de Linguaskill pueden requerir que comprendas la opinión o el sentimiento del hablante. Esta información podría estar expresada directamente o de forma implícita. Para completar la tarea, es posible que debas seleccionar la opción correcta de opción múltiple o relacionar una afirmación con lo que dice un hablante. La distracción —es decir, las opciones o afirmaciones alternativas que resultan tentadoras pero no son correctas— puede presentarse de diferentes maneras, tales como:',
      'Las opiniones o sentimientos de otro hablante en un diálogo o en un monólogo corto independiente.',
      'Una opinión o un sentimiento que el hablante menciona pero con el que no está de acuerdo.',
      'Opiniones o sentimientos que están relacionados con el hablante, pero que no encajan con la redacción de la pregunta. Por ejemplo, la pregunta puede referirse a un sentimiento actual, pero la opción puede referirse a un sentimiento que el hablante tuvo en el pasado.',
      'En esta lección, analizarás lenguaje relacionado con opiniones y sentimientos, y practicarás completando una tarea de muestra de la prueba de Listening de Linguaskill.'
    ]
  },
  {
    title: 'Entender la actitud en el Listening de Linguaskill',
    paragraphs: [
      'Algunas preguntas de la prueba de Listening de Linguaskill se centran en la actitud del hablante. La actitud puede ser, por ejemplo, el sentimiento o el punto de vista de la persona que habla. Estas preguntas pueden ser de opción múltiple, donde debes elegir qué actitud expresa el hablante, o pueden ser tareas en las que escuchas a tres personas diferentes hablando sobre un tema relacionado y debes relacionar a cada hablante con una actitud.',
      'En cualquier caso, deberás escuchar con atención, ya que la actitud puede no expresarse de forma directa. Tendrás que utilizar pistas lingüísticas para identificarla. Por ejemplo, la elección de las palabras puede indicar una actitud positiva o negativa, o el uso de estructuras condicionales puede indicar arrepentimiento o esperanza.',
      'En esta lección, aprenderás a identificar algunas de las diferentes formas de expresar la actitud y practicarás respondiendo preguntas reales de Linguaskill de este tipo.'
    ]
  },
  {
    title: 'Entender el acuerdo en el Listening de Linguaskill',
    paragraphs: [
      'Las tareas de la prueba de Listening de Linguaskill que se basan en diálogos pueden incluir una pregunta centrada en el acuerdo. Esto podría consistir en identificar cuándo los dos hablantes están de acuerdo entre sí o mantienen la misma opinión sobre algo. Also puede haber una pregunta enfocada en algo en lo que los hablantes no están de acuerdo.',
      'Para responder a estas preguntas con éxito, es necesario escuchar una sección extensa del diálogo, ya que la información necesaria puede estar expresada en uno o más comentarios realizados por cada hablante. Las opiniones de los hablantes pueden expresarse de forma directa o estar implícitas.',
      'La pregunta requiere que relaciones las opiniones expresadas con el otro hablante y también con las opciones de la pregunta de opción múltiple. Ten en cuenta que un hablante puede exponer un punto que coincida con una de las opciones, pero es posible que el otro hablante no esté de acuerdo con ese punto o que ni siquiera lo mencione.',
      'Para desarrollar tu habilidad al responder este tipo de preguntas, concéntrate en características lingüísticas comunes que pueden usarse en la pregunta o en el texto:',
      'Adjetivos: Por ejemplo, para expresar opiniones positivas o negativas.',
      'Sinónimos y paráfrasis: Es decir, las mismas ideas expresadas con palabras y expresiones diferentes.',
      'Estructuras comparativas: Por ejemplo, para indicar qué punto es más o menos importante.',
      'Verbos modales: Por ejemplo, para indicar qué consideran los hablantes que es una buena idea.',
      'Conectores (linking words): Por ejemplo, para introducir un punto de contraste.',
      'En esta lección, aprenderás a identificar y responder preguntas que se centran en el acuerdo y practicarás con una pregunta real de Linguaskill de este tipo.'
    ]
  }
];

export const LinguaSkillsSection: React.FC<LinguaSkillsSectionProps> = ({ onBack, speakText, stopSpeaking }) => {
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);
  const [activeParaIdx, setActiveParaIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const cancelPlaybackRef = useRef(false);

  // Stop playback when component unmounts
  useEffect(() => {
    return () => {
      cancelPlaybackRef.current = true;
      stopSpeaking();
    };
  }, [stopSpeaking]);

  const stopPlayback = async () => {
    cancelPlaybackRef.current = true;
    await stopSpeaking();
    setActiveCardIdx(null);
    setActiveParaIdx(null);
    setIsPlaying(false);
  };

  const playParagraph = async (cardIndex: number, paraIndex: number, text: string) => {
    await stopPlayback();
    cancelPlaybackRef.current = false;
    setIsPlaying(true);
    setActiveCardIdx(cardIndex);
    setActiveParaIdx(paraIndex);
    
    try {
      await speakText(text, 'es-ES');
    } catch (e) {
      console.error(e);
    } finally {
      if (!cancelPlaybackRef.current) {
        setIsPlaying(false);
        setActiveCardIdx(null);
        setActiveParaIdx(null);
      }
    }
  };

  const playCard = async (cardIndex: number) => {
    await stopPlayback();
    cancelPlaybackRef.current = false;
    setIsPlaying(true);
    
    const tip = LISTENING_TIPS[cardIndex];
    try {
      // 1. Speak Title
      if (cancelPlaybackRef.current) return;
      setActiveCardIdx(cardIndex);
      setActiveParaIdx(-1); // -1 is Title
      await speakText(tip.title, 'es-ES');

      // 2. Speak Paragraphs
      for (let i = 0; i < tip.paragraphs.length; i++) {
        if (cancelPlaybackRef.current) return;
        setActiveCardIdx(cardIndex);
        setActiveParaIdx(i);
        await speakText(tip.paragraphs[i], 'es-ES');
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!cancelPlaybackRef.current) {
        setIsPlaying(false);
        setActiveCardIdx(null);
        setActiveParaIdx(null);
      }
    }
  };

  const playAllGuide = async () => {
    await stopPlayback();
    cancelPlaybackRef.current = false;
    setIsPlaying(true);

    try {
      for (let c = 0; c < LISTENING_TIPS.length; c++) {
        if (cancelPlaybackRef.current) return;
        
        const tip = LISTENING_TIPS[c];
        
        // Speak Title
        setActiveCardIdx(c);
        setActiveParaIdx(-1);
        await speakText(tip.title, 'es-ES');

        // Speak Paragraphs
        for (let p = 0; p < tip.paragraphs.length; p++) {
          if (cancelPlaybackRef.current) return;
          setActiveCardIdx(c);
          setActiveParaIdx(p);
          await speakText(tip.paragraphs[p], 'es-ES');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!cancelPlaybackRef.current) {
        setIsPlaying(false);
        setActiveCardIdx(null);
        setActiveParaIdx(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 pb-24 font-sans selection:bg-cyan-100">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-white rounded-2xl shadow-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all active:scale-95 border border-slate-100"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">LinguaSkills</h1>
              <p className="text-xs font-black text-cyan-600 uppercase tracking-widest mt-1 flex items-center gap-2">
                <Headphones size={14} /> Listening Guide
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {isPlaying ? (
              <button
                onClick={stopPlayback}
                className="flex items-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-100 active:scale-95 transition-all"
              >
                <Square size={14} fill="currentColor" /> Stop
              </button>
            ) : (
              <button
                onClick={playAllGuide}
                className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-100 active:scale-95 transition-all"
              >
                <Play size={14} fill="currentColor" /> Read Entire Guide
              </button>
            )}
          </div>
        </div>

        {/* List of Tips */}
        <div className="grid gap-6">
          {LISTENING_TIPS.map((tip, index) => {
            const isCardActive = activeCardIdx === index;
            const isTitleActive = isCardActive && activeParaIdx === -1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border transition-all duration-300 ${
                  isCardActive 
                    ? 'border-cyan-200 ring-4 ring-cyan-50 shadow-md' 
                    : 'border-slate-100 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles size={10} /> Tip #{index + 1}
                    </span>
                    <h2 className={`text-xl md:text-2xl font-black leading-tight transition-colors duration-300 ${
                      isTitleActive ? 'text-cyan-600 animate-pulse' : 'text-slate-900'
                    }`}>
                      {tip.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isTitleActive && (
                      <div className="flex gap-1 items-center h-4 px-2 bg-cyan-50 rounded-full">
                        <span className="w-0.5 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-0.5 h-3 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-0.5 h-1 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    )}
                    <button
                      onClick={() => isCardActive && isPlaying ? stopPlayback() : playCard(index)}
                      className={`p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center ${
                        isCardActive && isPlaying
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100'
                      }`}
                      title={isCardActive && isPlaying ? "Stop speaking card" : "Read entire card"}
                    >
                      {isCardActive && isPlaying ? <Square size={18} fill="currentColor" /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {tip.paragraphs.map((p, i) => {
                    const isParaActive = isCardActive && activeParaIdx === i;

                    return (
                      <div 
                        key={i} 
                        className={`flex gap-4 group p-3 rounded-2xl transition-all duration-300 ${
                          isParaActive 
                            ? 'bg-cyan-50/60 shadow-sm border border-cyan-100/50' 
                            : 'hover:bg-slate-50/50 border border-transparent'
                        }`}
                      >
                        <p className={`leading-relaxed font-medium flex-1 text-sm md:text-base transition-colors duration-300 ${
                          isParaActive ? 'text-slate-900 font-semibold' : 'text-slate-600'
                        }`}>
                          {p}
                        </p>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {isParaActive && (
                            <div className="flex gap-1 items-center h-4 px-1.5 bg-cyan-100/60 rounded-full">
                              <span className="w-0.5 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <span className="w-0.5 h-3 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              <span className="w-0.5 h-1 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                            </div>
                          )}
                          <button
                            onClick={() => isParaActive && isPlaying ? stopPlayback() : playParagraph(index, i, p)}
                            className={`p-2 h-9 w-9 flex items-center justify-center rounded-xl transition-all ${
                              isParaActive && isPlaying
                                ? 'bg-rose-50 text-rose-600 opacity-100'
                                : 'bg-slate-100/70 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-cyan-50 hover:text-cyan-600'
                            }`}
                            title={isParaActive && isPlaying ? "Stop" : "Read paragraph"}
                          >
                            {isParaActive && isPlaying ? <Square size={12} fill="currentColor" /> : <Volume2 size={14} />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
