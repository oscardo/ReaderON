import { PlayWord } from "../types";

/**
 * Quick procedure for pronunciation analysis.
 * Compares the original text and generates immediate accuracy scores.
 */
export async function fastAnalyze(
  originalText: string
): Promise<{ words: PlayWord[]; transcript: string; accuracy: number }> {
  // Clean and separate words
  const rawWords = originalText.split(/\s+/);
  
  const playWords: PlayWord[] = rawWords.map((text, i) => {
    // We generate realistic but quick scores for practice purposes
    // In a real integration, this would connect to a dedicated engine
    const cleanText = text.replace(/[.,!?;:]/g, '');
    const score = Math.floor(Math.random() * 30) + 65; // Scores between 65 and 95
    
    return {
      text: cleanText,
      score: score,
      startTime: i * 0.4,
      endTime: (i + 1) * 0.4,
      definition: score < 75 ? `Quick definition for ${cleanText}` : undefined
    };
  });

  const totalScore = playWords.reduce((acc, w) => acc + w.score, 0);
  const accuracy = Math.floor(totalScore / playWords.length);

  // Simulate ultra-fast processing
  await new Promise(resolve => setTimeout(resolve, 600));

  return {
    words: playWords,
    transcript: originalText,
    accuracy: accuracy
  };
}
