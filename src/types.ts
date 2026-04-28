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
  updatedAt?: string;
  notes?: { word: string, def: string }[];
}

export type AppMode = 'HOME' | 'CAPTURE' | 'PRACTICE' | 'ANALYSIS' | 'HISTORY' | 'STUDY' | 'EBOOKS' | 'EBOOK_DETAIL' | 'PHONETICS' | 'COGNATES';

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
