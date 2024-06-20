import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./meter.db');

export default db;