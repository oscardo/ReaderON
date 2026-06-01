import { openDB, IDBPDatabase } from 'idb';
import { PlayFile } from '../types';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const DB_NAME = 'ReaderON_DB';
const STORE_NAME = 'practices';
const VERSION = 17;

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
        if (!db.objectStoreNames.contains('phrasal_verbs')) {
          db.createObjectStore('phrasal_verbs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_up_out')) {
          db.createObjectStore('phrasal_verbs_up_out', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_off')) {
          db.createObjectStore('phrasal_verbs_off', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_on')) {
          db.createObjectStore('phrasal_verbs_on', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_in')) {
          db.createObjectStore('phrasal_verbs_in', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_back')) {
          db.createObjectStore('phrasal_verbs_back', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_through')) {
          db.createObjectStore('phrasal_verbs_through', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_over_down')) {
          db.createObjectStore('phrasal_verbs_over_down', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_do_make')) {
          db.createObjectStore('phrasal_verbs_do_make', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_at_in_on')) {
          db.createObjectStore('phrasal_verbs_at_in_on', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_about_for')) {
          db.createObjectStore('phrasal_verbs_about_for', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('phrasal_verbs_generally')) {
          db.createObjectStore('phrasal_verbs_generally', { keyPath: 'id' });
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
    const numKey = Number(key);
    if (!isNaN(numKey) && numKey >= start && numKey <= end) {
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

// PERSISTENCE FOR PHRASAL VERBS
export async function getPhrasalVerbRating(id: number): Promise<number> {
  const db = await getDB();
  const data = await db.get('phrasal_verbs', id);
  return data?.rating || 0;
}

export async function updatePhrasalVerbRating(id: number, rating: number): Promise<void> {
  const db = await getDB();
  const existing = await db.get('phrasal_verbs', id) || { id };
  await db.put('phrasal_verbs', { ...existing, rating });
}

export async function getPhrasalVerbRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const data = await db.get('phrasal_verbs', id);
  return data?.repetitions || 0;
}

export async function incrementPhrasalVerbRepetition(id: number): Promise<void> {
  const db = await getDB();
  const existing = await db.get('phrasal_verbs', id) || { id };
  const repetitions = (existing.repetitions || 0) + 1;
  await db.put('phrasal_verbs', { ...existing, repetitions });
}

export async function getAllPhrasalVerbPersistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('phrasal_verbs');
}

export async function clearAllPhrasalVerbPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs');
}

// PERSISTENCE FOR PHRASAL VERBS UP/OUT
export async function getPhrasalVerbUpOutRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const data = await db.get('phrasal_verbs_up_out', id);
  return data?.repetitions || 0;
}

export async function incrementPhrasalVerbUpOutRepetition(id: number): Promise<void> {
  const db = await getDB();
  const existing = await db.get('phrasal_verbs_up_out', id) || { id };
  const repetitions = (existing.repetitions || 0) + 1;
  await db.put('phrasal_verbs_up_out', { ...existing, repetitions });
}

export async function clearAllPhrasalVerbUpOutPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_up_out');
}

// PERSISTENCE FOR PHRASAL VERBS OFF
export async function getPhrasalVerbOffRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_off', id);
  return entry ? entry.count : 0;
}

export async function incrementPhrasalVerbOffRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getPhrasalVerbOffRepetitions(id);
  await db.put('phrasal_verbs_off', { id, count: current + 1 });
}

export async function clearAllPhrasalVerbOffPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_off');
}

export async function getPhrasalVerbOnRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_on', id);
  return entry ? entry.count : 0;
}

export async function incrementPhrasalVerbOnRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getPhrasalVerbOnRepetitions(id);
  await db.put('phrasal_verbs_on', { id, count: current + 1 });
}

export async function clearAllPhrasalVerbOnPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_on');
}

// PERSISTENCE FOR PHRASAL VERBS IN
export async function getPhrasalVerbInRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_in', id);
  return entry ? entry.count : 0;
}

export async function incrementPhrasalVerbInRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getPhrasalVerbInRepetitions(id);
  await db.put('phrasal_verbs_in', { id, count: current + 1 });
}

export async function clearAllPhrasalVerbInPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_in');
}

// PERSISTENCE FOR PHRASAL VERBS BACK
export async function getPhrasalVerbBackRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_back', id);
  return entry ? entry.count : 0;
}

export async function incrementPhrasalVerbBackRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getPhrasalVerbBackRepetitions(id);
  await db.put('phrasal_verbs_back', { id, count: current + 1 });
}

export async function clearAllPhrasalVerbBackPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_back');
}

// PERSISTENCE FOR PHRASAL VERBS THROUGH
export async function getPhrasalVerbThroughRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_through', id);
  return entry ? entry.count : 0;
}

export async function incrementPhrasalVerbThroughRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getPhrasalVerbThroughRepetitions(id);
  await db.put('phrasal_verbs_through', { id, count: current + 1 });
}

export async function clearAllPhrasalVerbThroughPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_through');
}

// PERSISTENCE FOR PHRASAL VERBS OVER/DOWN
export async function getPhrasalVerbOverDownRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_over_down', id);
  return entry ? entry.count : 0;
}

export async function incrementPhrasalVerbOverDownRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getPhrasalVerbOverDownRepetitions(id);
  await db.put('phrasal_verbs_over_down', { id, count: current + 1 });
}

export async function clearAllPhrasalVerbOverDownPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_over_down');
}

// PERSISTENCE FOR PHRASAL VERBS DO/MAKE
export async function getDoMakeRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_do_make', id);
  return entry ? entry.count : 0;
}

export async function incrementDoMakeRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getDoMakeRepetitions(id);
  await db.put('phrasal_verbs_do_make', { id, count: current + 1 });
}

export async function clearAllDoMakePersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_do_make');
}

// PERSISTENCE FOR AT/IN/ON
export async function getAtInOnRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_at_in_on', id);
  return entry ? entry.count : 0;
}

export async function incrementAtInOnRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getAtInOnRepetitions(id);
  await db.put('phrasal_verbs_at_in_on', { id, count: current + 1 });
}

export async function clearAllAtInOnPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_at_in_on');
}

// PERSISTENCE FOR ABOUT/FOR
export async function getAboutForRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_about_for', id);
  return entry ? entry.count : 0;
}

export async function incrementAboutForRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getAboutForRepetitions(id);
  await db.put('phrasal_verbs_about_for', { id, count: current + 1 });
}

export async function clearAllAboutForPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_about_for');
}

// PERSISTENCE FOR GENERALLY (BE, GET, HAVE, DO)
export async function getGenerallyRepetitions(id: number): Promise<number> {
  const db = await getDB();
  const entry = await db.get('phrasal_verbs_generally', id);
  return entry ? entry.count : 0;
}

export async function incrementGenerallyRepetition(id: number): Promise<void> {
  const db = await getDB();
  const current = await getGenerallyRepetitions(id);
  await db.put('phrasal_verbs_generally', { id, count: current + 1 });
}

export async function clearAllGenerallyPersistence(): Promise<void> {
  const db = await getDB();
  await db.clear('phrasal_verbs_generally');
}

// BACKUP & RESTORE
export async function exportDatabase(): Promise<string> {
  const db = await getDB();
  const backup: any = {
    version: VERSION,
    date: new Date().toISOString(),
    stores: {}
  };
  
  const storeNames = ['practices', 'word_flags', 'thousand_words_1', 'thousand_words_2', 'regular_verbs', 'idioms_expressions', 'irregular_verbs', 'c1_words', 'slangs', 'phrasal_verbs', 'phrasal_verbs_up_out', 'phrasal_verbs_off', 'phrasal_verbs_on', 'phrasal_verbs_in', 'phrasal_verbs_back', 'phrasal_verbs_through', 'phrasal_verbs_over_down', 'phrasal_verbs_do_make', 'phrasal_verbs_at_in_on', 'phrasal_verbs_about_for', 'phrasal_verbs_generally'];
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
  
  const backupDir = 'Backup/ReaderOn/ReaderOnBackup';
  const fileName = `${backupDir}/${day}${month}${year}${hours}${minutes}.bkp`;
  
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
      path: 'Backup/ReaderOn/ReaderOnBackup',
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
    path: `Backup/ReaderOn/ReaderOnBackup/${fileName}`,
    directory: Directory.Documents
  });
}

export async function getBackupDirectory(): Promise<string> {
  // On most devices, this returns the absolute path to Documents
  const result = await Filesystem.getUri({
    path: 'Backup/ReaderOn/ReaderOnBackup',
    directory: Directory.Documents
  });
  return result.uri;
}

export async function restoreFromBackup(fileName: string): Promise<void> {
  try {
    const result = await Filesystem.readFile({
      path: `Backup/ReaderOn/ReaderOnBackup/${fileName}`,
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
