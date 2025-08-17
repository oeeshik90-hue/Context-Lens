import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initDB() {
  db = await open({
    filename: './data.db',
    driver: sqlite3.Database
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    classification TEXT
  )`);
}

export async function insertInteraction(text, classification) {
  await db.run('INSERT INTO interactions (text, classification) VALUES (?, ?)', [text, classification]);
}

export async function getInteractions() {
  return await db.all('SELECT * FROM interactions');
}
