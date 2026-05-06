import { openDB, IDBPDatabase } from 'idb';
import { PlayFile } from '../types';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const DB_NAME = 'ReaderON_DB';
const STORE_NAME = 'practices';
const VERSION = 4;

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
        
        if (!db.objectStoreNames.contains('dictionary')) {
          const dictStore = db.createObjectStore('dictionary', { keyPath: 'id_dictionary' });
          dictStore.createIndex('word', 'word');
          dictStore.createIndex('word_lowercase', 'word_lowercase');
        }
        
        if (!db.objectStoreNames.contains('regular_verbs')) {
          db.createObjectStore('regular_verbs', { keyPath: 'regular_verbs_id' });
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
export async function getVerbPersistence(id: string): Promise<any> {
  const db = await getDB();
  return db.get('regular_verbs', id);
}

export async function saveVerbPersistence(data: any): Promise<void> {
  const db = await getDB();
  await db.put('regular_verbs', data);
}

export async function getAllVerbPersistence(): Promise<any[]> {
  const db = await getDB();
  return db.getAll('regular_verbs');
}

// DICTIONARY
export async function saveDictionaryEntry(entry: any): Promise<void> {
  const db = await getDB();
  await db.put('dictionary', entry);
}

export async function searchDictionary(query: string): Promise<any[]> {
  const db = await getDB();
  const tx = db.transaction('dictionary', 'readonly');
  const index = tx.store.index('word_lowercase');
  
  const results = [];
  const lowerQuery = query.toLowerCase();
  const range = IDBKeyRange.bound(lowerQuery, lowerQuery + '\uffff');
  let cursor = await index.openCursor(range);
  
  while (cursor && results.length < 50) {
    results.push(cursor.value);
    cursor = await cursor.continue();
  }
  return results;
}

export async function getDictionaryByLetter(letter: string): Promise<any[]> {
  const db = await getDB();
  const tx = db.transaction('dictionary', 'readonly');
  const index = tx.store.index('word_lowercase');
  
  const results = [];
  const lowerLetter = letter.toLowerCase();
  const range = IDBKeyRange.bound(lowerLetter, lowerLetter + '\uffff');
  let cursor = await index.openCursor(range);
  
  while (cursor && results.length < 150) {
    results.push(cursor.value);
    cursor = await cursor.continue();
  }
  return results;
}

// BACKUP & RESTORE
export async function exportDatabase(): Promise<string> {
  const db = await getDB();
  const backup: any = {
    version: VERSION,
    date: new Date().toISOString(),
    stores: {}
  };
  
  const storeNames = ['practices', 'word_flags', 'thousand_words_1', 'thousand_words_2', 'dictionary', 'regular_verbs'];
  for (const name of storeNames) {
    if (db.objectStoreNames.contains(name)) {
      backup.stores[name] = await db.getAll(name);
    }
  }
  
  return JSON.stringify(backup, null, 2);
}

export async function importDatabase(jsonString: string): Promise<void> {
  const db = await getDB();
  const backup = JSON.parse(jsonString);
  
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
    // Sort by name descending (newest first based on ddmmyyyyhhmm format if we were smarter, 
    // but simple string sort works for most cases)
    return result.files
      .filter(f => f.name.endsWith('.bkp'))
      .sort((a, b) => b.name.localeCompare(a.name));
  } catch (e) {
    return [];
  }
}

export async function restoreFromBackup(fileName: string): Promise<void> {
  const result = await Filesystem.readFile({
    path: fileName,
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  });
  await importDatabase(result.data);
}
