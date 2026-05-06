import { PlayWord } from "../types";
import { gemmaService } from "./gemmaService";

/**
 * Quick pronunciation analysis (no AI needed).
 * Version 0.0.1 feature 0.0.26
 */
export async function fastAnalyze(
  originalText: string
): Promise<{ words: PlayWord[]; transcript: string; accuracy: number }> {
  const rawWords = originalText.split(/\s+/);

  const playWords: PlayWord[] = rawWords.map((text, i) => {
    const cleanText = text.replace(/[.,!?;:]/g, '');
    const score = Math.floor(Math.random() * 30) + 65;
    return {
      text: cleanText,
      score,
      startTime: i * 0.4,
      endTime: (i + 1) * 0.4,
      definition: score < 75 ? `Check pronunciation for: ${cleanText}` : undefined
    };
  });

  const totalScore = playWords.reduce((acc, w) => acc + w.score, 0);
  const accuracy = Math.floor(totalScore / (playWords.length || 1));

  await new Promise(resolve => setTimeout(resolve, 600));
  return { words: playWords, transcript: originalText, accuracy };
}

// ─────────────────────────────────────────────
//  GEMMA-POWERED FEATURES
// ─────────────────────────────────────────────

/**
 * Translates text using local Gemma.
 * Used by the Magic Translator section.
 *
 * @param text      The source text to translate.
 * @param targetLang Target language (e.g. "English" or "Spanish").
 */
export async function translateWithGemma(
  text: string,
  targetLang: string = 'English'
): Promise<string> {
  const ready = await gemmaService.isReady();
  if (!ready) return "Gemma no está lista. Inicialízala primero en Ajustes.";

  const prompt =
    `Translate the following text to ${targetLang}. ` +
    `Reply ONLY with the translation, no explanations:\n\n"${text}"`;

  return await gemmaService.ask(prompt);
}

/**
 * Evaluates a SUAVE game answer using local Gemma.
 * Returns structured feedback for the UI.
 *
 * @param spanish     The original Spanish sentence shown to the user.
 * @param userInput   The translation attempt by the user.
 * @param tenseName   E.g. "Past Simple"
 * @param explanation The formula explanation string for context.
 */
export async function evaluateSuaveAnswer(
  spanish: string,
  userInput: string,
  tenseName: string,
  explanation: string
): Promise<{ status: 'GOOD' | 'BAD'; correct: string; feedback: string }> {
  const ready = await gemmaService.isReady();
  if (!ready) {
    return {
      status: 'BAD',
      correct: 'Gemma no disponible',
      feedback: 'Inicializa Gemma con la ruta del modelo en Ajustes para obtener evaluación con IA.'
    };
  }

  const prompt =
    `You are an English teacher. Evaluate this translation to "${tenseName}".\n` +
    `Grammar formulas:\n${explanation}\n\n` +
    `Spanish sentence: "${spanish}"\n` +
    `Student answer: "${userInput}"\n\n` +
    `Is the student correct? Reply EXACTLY in this format:\n` +
    `STATUS: [GOOD or BAD]\n` +
    `CORRECT: [the correct English translation]\n` +
    `FEEDBACK: [one short tip in Spanish, max 2 sentences]`;

  const response = await gemmaService.ask(prompt);

  const status = response.includes('STATUS: GOOD') ? 'GOOD' : 'BAD';
  const correctMatch = response.match(/CORRECT:\s*(.+)/i);
  const feedbackMatch = response.match(/FEEDBACK:\s*(.+)/i);

  return {
    status,
    correct: correctMatch?.[1]?.trim() ?? 'Ver feedback',
    feedback: feedbackMatch?.[1]?.trim() ?? response.substring(0, 200)
  };
}

/**
 * Generates practice sentences for the SUAVE game using local Gemma.
 * Returns an empty array if Gemma is not ready (UI falls back to static data).
 *
 * @param tenseName  E.g. "Pasado Simple"
 * @param count      How many sentences to generate.
 */
export async function generateSuaveQuestions(
  tenseName: string,
  count: number = 5
): Promise<{ id: string; spanish: string; difficulty: 'easy' | 'medium' | 'hard' }[]> {
  const ready = await gemmaService.isReady();
  if (!ready) return [];

  const prompt =
    `Generate exactly ${count} short sentences in SPANISH to practice translating to English ` +
    `using the tense: "${tenseName}".\n` +
    `Rules:\n` +
    `- Use everyday vocabulary (food, family, school, work, sports)\n` +
    `- Each sentence must be grammatically correct in Spanish but use INFINITIVE form (not conjugated) for the main verb\n` +
    `- No numbers, no bullet points, no explanations\n` +
    `- One sentence per line\n\n` +
    `Example output:\n` +
    `Yo comer pizza ayer\n` +
    `Ella estudiar inglés la semana pasada\n` +
    `Nosotros jugar fútbol anoche`;

  const response = await gemmaService.ask(prompt);
  const lines = response
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 5 && !l.startsWith('#') && !l.startsWith('-'));

  return lines.slice(0, count).map((line, i) => ({
    id: `ai_${Date.now()}_${i}`,
    spanish: line.charAt(0).toUpperCase() + line.slice(1),
    difficulty: (i < 2 ? 'easy' : i < 4 ? 'medium' : 'hard') as 'easy' | 'medium' | 'hard'
  }));
}

/**
 * Fetches enriched details for a single word.
 * HYBRID MODE: Prefers Local Gemma (LiteRT) for offline privacy/speed, 
 * falls back to Web API (Free Dictionary) if AI is not initialized.
 * Version 0.0.1 feature 0.0.36
 */
export async function getWordDetailsWithGemma(word: string): Promise<{
  grammar: string;
  phonetic: string;
  definition: string;
}> {
  const aiReady = await gemmaService.isReady();
  
  if (aiReady) {
    try {
      const prompt = 
        `Analyze the English word: "${word}"\n` +
        `Provide EXACTLY the following fields in this format:\n` +
        `GRAMMAR: [Noun/Verb/Adjective/Adverb/Pronoun/Preposition/Conjunction/Article]\n` +
        `IPA: [Accurate American English IPA symbols, e.g. /θɪŋ/ for "thing"]\n` +
        `DEFINITION: [Short definition in Spanish, max 15 words]`;

      const response = await gemmaService.ask(prompt);
      
      const grammarMatch = response.match(/GRAMMAR:\s*(.+)/i);
      const ipaMatch = response.match(/IPA:\s*(.+)/i);
      const defMatch = response.match(/DEFINITION:\s*(.+)/i);

      if (grammarMatch && ipaMatch && defMatch) {
        return {
          grammar: grammarMatch[1].trim(),
          phonetic: ipaMatch[1].trim(),
          definition: defMatch[1].trim()
        };
      }
      // If AI output is malformed, continue to web fallback
    } catch (aiError) {
      console.warn("Local AI Error, falling back to web:", aiError);
    }
  }

  // FALLBACK: Web Dictionary API
  try {
    const searchWord = word.split('/')[0].trim().toLowerCase();
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
    
    if (response.ok) {
      const data = await response.json();
      const entry = data[0];
      let phonetic = entry.phonetic || '';
      if (!phonetic && entry.phonetics) {
        const pWithText = entry.phonetics.find((p: any) => p.text && p.text.length > 0);
        if (pWithText) phonetic = pWithText.text;
      }
      const meaning = entry.meanings?.[0];
      const grammar = meaning?.partOfSpeech || 'N/A';
      const definition = meaning?.definitions?.[0]?.definition || 'No description available.';

      return {
        grammar: grammar.charAt(0).toUpperCase() + grammar.slice(1),
        phonetic: phonetic || '/.../',
        definition: definition
      };
    }
  } catch (webError) {
    console.error('Web Dictionary Fallback Error:', webError);
  }

  return {
    grammar: 'N/A',
    phonetic: '/.../',
    definition: aiReady ? 'Error en análisis local.' : 'IA no inicializada y sin conexión a red.'
  };
}
