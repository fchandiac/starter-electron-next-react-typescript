import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDb() {
  const db = await open({ filename: './data/database.sqlite', driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT,
      name TEXT,
      role TEXT CHECK(role IN ('admin','operator'))
    );
    CREATE TABLE IF NOT EXISTS permissions (
      id INTEGER PRIMARY KEY,
      permission TEXT,
      config BOOLEAN
    );
    CREATE TABLE IF NOT EXISTS config (
      id INTEGER PRIMARY KEY,
      userId INTEGER,
      role TEXT,
      report_mail BOOLEAN,
      sender_mail TEXT,
      pass_sender_mail TEXT
    );
  `);
  return db;
}
