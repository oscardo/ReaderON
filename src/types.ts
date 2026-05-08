export interface IELTSDetailedScores {
  lexicalResource: number;
  grammaticalRange: number;
  pronunciation: number;
  fluencyCoherence: number;
}

export interface PlayWord {
  text: string;
  score: number; // 0 to 100
  startTime?: number; // seconds
  endTime?: number;   // seconds
  definition?: string;
}

export interface PlayFile {
  id: string;
  name: string;
  originalText: string;
  transcribedText?: string;
  accuracyTotal: number;
  words?: PlayWord[];
  createdAt: string;
  summary?: string;
  ieltsFeedback?: string;
  ieltsScores?: IELTSDetailedScores;
  audioUrl?: string;
  originalImageBase64?: string;
  updatedAt?: string;
  notes?: { word: string, def: string }[];
}

export type AppMode = 'HOME' | 'CAPTURE' | 'PRACTICE' | 'ANALYSIS' | 'HISTORY' | 'STUDY' | 'EBOOKS' | 'EBOOK_DETAIL' | 'PHONETICS' | 'COGNATES' | 'SUAVE' | 'TRANSLATOR' | 'THOUSAND_WORDS' | 'THOUSAND_WORDS_2' | 'REGULAR_VERBS' | 'IRREGULAR_VERBS' | 'IDIOMS' | 'C1_ESSENCIAL' | 'C1_WORDS' | 'SLANG';

export interface Cognate {
  english: string;
  spanish: string;
  pronunciation: string;
  intonation: string;
  example?: string;
  type: 'COGNATE' | 'FALSE_COGNATE';
  meaningActual?: string; // For false cognates
  appearsToSay?: string;     // For false cognates
}

export interface AnalysisState {
  isAnalyzing: boolean;
  error?: string;
}
export interface WordPersistence {
  words_id: string; // e.g., "tw1_1", "tw2_1001"
  words: string;    // English
  palabra: string;  // Spanish
  definicion_ipa: string;
  tipo_gramatical: string;
  flags: number;    // 0 to 5
  num_repeticiones: number;
}

export interface DictionaryEntry {
  id_dictionary: string;
  word: string;
  word_lowercase: string;
  list_of_abbreviations: string;
  word_in_spanish: string;
}

// Version 0.0.1 feature 0.0.41
