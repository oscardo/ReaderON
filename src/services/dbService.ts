import { openDB, IDBPDatabase } from 'idb';
import { PlayFile } from '../types';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const DB_NAME = 'ReaderON_DB';
const STORE_NAME = 'practices';
const VERSION = 8;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, VERSION, {
      upgrade(db, oldVersion) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('word_flags')) {
          db.createObjectStore('word_flags', { keyPath: 'wordId' });
        }
        if (!db.objectStoreNames.contains('thousand_words_1')) {
          db.createObjectStore('thousand_words_1', { keyPath: 'words_id' });
        }
        if (!db.objectStoreNames.contains('thousand_words_2')) {
          db.createObjectStore('thousand_words_2', { keyPath: 'words_id' });
        }
        
        if (!db.objectStoreNames.contains('regular_verbs')) {
          db.createObjectStore('regular_verbs', { keyPath: 'regular_verbs_id' });
        }
        
        if (!db.objectStoreNames.contains('idioms_expressions')) {
          db.createObjectStore('idioms_expressions', { keyPath: 'idioms_expressions_id' });
        }

        if (!db.objectStoreNames.contains('irregular_verbs')) {
          db.createObjectStore('irregular_verbs', { keyPath: 'irregular_verbs_id' });
        }

        if (!db.objectStoreNames.contains('c1_words')) {
          db.createObjectStore('c1_words', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('slangs')) {
          db.createObjectStore('slangs', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function savePractice(practice: PlayFile): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, practice);
}

export async function getAllPractices(): Promise<PlayFile[]> {
  const db = await getDB();
  const practices = await db.getAll(STORE_NAME);
  return practices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPracticeById(id: string): Promise<PlayFile | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function deletePractice(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

// FLAG MANAGEMENT
export async function getWordFlag(wordId: number): Promise<{ wordId: number, count: number } | undefined> {
  const db = await getDB();
  return db.get('word_flags', wordId);
}

export async function setWordFlag(wordId: number, count: number): Promise<void> {
  const db = await getDB();
  await db.put('word_flags', { wordId, count });
}

export async function getAllFlags(): Promise<{ wordId: number, count: number }[]> {
  const db = await getDB();
  return db.getAll('word_flags');
}

export async function resetWordFlag(wordId: number): Promise<void> {
  const db = await getDB();
  await db.put('word_flags', { wordId, count: 0 });
}

export async function clearAllFlags(): Promise<void> {
  const db = await getDB();
  await db.clear('word_flags');
}

export async function clearFlagsInRange(start: number, end: number): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('word_flags', 'readwrite');
  const store = tx.objectStore('word_flags');
  const allKeys = await store.getAllKeys();
  for (const key of allKeys) {
    if (typeof key === 'number' && key >= start && key <= end) {
      await store.delete(key);
    }
  }
  await tx.done;
}

// PERSISTENCE FOR THOUSAND WORDS
export async function getWordPersistence(store: 'thousand_words_1' | 'thousand_words_2', words_id: string): Promise<any> {
  const db = await getDB();
  return db.get(store, words_id);
}

export async function saveWordPersistence(store: 'thousand_words_1' | 'thousand_words_2', data: any): Promise<void> {
  const db = await getDB();
  await db.put(store, data);
}

export async function getAllWordPersistence(store: 'thousand_words_1' | 'thousand_words_2'): Promise<any[]> {
  const db = await getDB();
  return db.getAll(store);
}

// PERSISTENCE FOR REGULAR VERBS
export async function getRegularPersistence(id: string): Promise<any> {
  const db = await getDB();
  return db.get('regular_verbs', id);
}

export async function saveRegularPersistence(data: any): Promise<void> {
  const db = await getDB();
  await db.put('regular_verbs', data);
}

export async function getAllRegularPersistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('regular_verbs');
}

export async function clearAllRegularPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('regular_verbs');
}

// PERSISTENCE FOR IDIOMS & EXPRESSIONS
export async function getIdiomPersistence(id: string): Promise<any> {
  const db = await getDB();
  return db.get('idioms_expressions', id);
}

export async function saveIdiomPersistence(data: any): Promise<void> {
  const db = await getDB();
  await db.put('idioms_expressions', data);
}

export async function getAllIdiomPersistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('idioms_expressions');
}

export async function clearAllIdiomPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('idioms_expressions');
}

// PERSISTENCE FOR IRREGULAR VERBS
export async function getIrregularPersistence(id: string): Promise<any> {
  const db = await getDB();
  return db.get('irregular_verbs', id);
}

export async function saveIrregularPersistence(data: any): Promise<void> {
  const db = await getDB();
  await db.put('irregular_verbs', data);
}

export async function getAllIrregularPersistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('irregular_verbs');
}

export async function clearAllIrregularPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('irregular_verbs');
}

// PERSISTENCE FOR C1 WORDS
export async function getWordRating(id: string): Promise<number> {
  const db = await getDB();
  const data = await db.get('c1_words', id);
  return data?.rating || 0;
}

export async function updateWordRating(id: string, rating: number): Promise<void> {
  const db = await getDB();
  const existing = await db.get('c1_words', id) || { id };
  await db.put('c1_words', { ...existing, rating });
}

export async function getWordRepetitions(id: string): Promise<number> {
  const db = await getDB();
  const data = await db.get('c1_words', id);
  return data?.repetitions || 0;
}

export async function incrementWordRepetition(id: string): Promise<void> {
  const db = await getDB();
  const existing = await db.get('c1_words', id) || { id };
  const repetitions = (existing.repetitions || 0) + 1;
  await db.put('c1_words', { ...existing, repetitions });
}

export async function getAllC1Persistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('c1_words');
}

export async function clearAllC1Persistence(): Promise<void> {
  const db = await getDB();
  await db.clear('c1_words');
}

// PERSISTENCE FOR SLANGS
export async function getSlangRating(id: number): Promise<number> {
  const db = await getDB();
  const data = await db.get('slangs', id);
  return data?.rating || 0;
}

export async function updateSlangRating(id: number, rating: number): Promise<void> {
  const db = await getDB();
  const existing = await db.get('slangs', id) || { id };
  await db.put('slangs', { ...existing, rating });
}

export async function getSlangRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const data = await db.get('slangs', id);
  return data?.repetitions || 0;
}

export async function incrementSlangRepetition(id: number): Promise<void> {
  const db = await getDB();
  const existing = await db.get('slangs', id) || { id };
  const repetitions = (existing.repetitions || 0) + 1;
  await db.put('slangs', { ...existing, repetitions });
}

export async function getAllSlangPersistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('slangs');
}

export async function clearAllSlangPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('slangs');
}

// BACKUP & RESTORE
export async function exportDatabase(): Promise<string> {
  const db = await getDB();
  const backup: any = {
    version: VERSION,
    date: new Date().toISOString(),
    stores: {}
  };
  
  const storeNames = ['practices', 'word_flags', 'thousand_words_1', 'thousand_words_2', 'regular_verbs', 'idioms_expressions', 'irregular_verbs', 'c1_words', 'slangs'];
  for (const name of storeNames) {
    if (db.objectStoreNames.contains(name)) {
      backup.stores[name] = await db.getAll(name);
    }
  }
  
  return JSON.stringify(backup, null, 2);
}

export async function importDatabase(data: string | any): Promise<void> {
  const db = await getDB();
  const backup = typeof data === 'string' ? JSON.parse(data) : data;
  
  if (!backup.stores) return;
  
  for (const name in backup.stores) {
    if (db.objectStoreNames.contains(name)) {
      await db.clear(name as any);
      const tx = db.transaction(name as any, 'readwrite');
      for (const item of backup.stores[name]) {
        await tx.store.put(item);
      }
      await tx.done;
    }
  }
}

export async function exportDatabaseNative(): Promise<string> {
  const json = await exportDatabase();
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const fileName = `${day}${month}${year}${hours}${minutes}.bkp`;
  
  try {
    const result = await Filesystem.writeFile({
      path: fileName,
      data: json,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true
    });
    return result.uri;
  } catch (e) {
    console.error("Native backup failed", e);
    // Fallback or rethrow
    throw e;
  }
}

export async function getBackupList(): Promise<any[]> {
  try {
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.Documents
    });
    return result.files
      .filter(f => f.name.endsWith('.bkp'))
      .sort((a, b) => b.name.localeCompare(a.name));
  } catch (e) {
    return [];
  }
}

export async function deleteBackup(fileName: string): Promise<void> {
  await Filesystem.deleteFile({
    path: fileName,
    directory: Directory.Documents
  });
}

export async function getBackupDirectory(): Promise<string> {
  // On most devices, this returns the absolute path to Documents
  const result = await Filesystem.getUri({
    path: '',
    directory: Directory.Documents
  });
  return result.uri;
}

export async function restoreFromBackup(fileName: string): Promise<void> {
  try {
    const result = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    // result.data is a string because we used Encoding.UTF8
    await importDatabase(result.data);
  } catch (error) {
    console.error("Restore from backup failed:", error);
    throw error;
  }
}
