import { openDB, IDBPDatabase } from 'idb';
import { PlayFile } from '../types';

const DB_NAME = 'ReaderON_DB';
const STORE_NAME = 'practices';
const VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
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
