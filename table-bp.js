const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

async function sync() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    accId INTEGER PRIMARY KEY,
    discordId TEXT UNIQUE NOT NULL,
    muteCount INTEGER DEFAULT 0,
    kickCount INTEGER DEFAULT 0,
    banCount INTEGER DEFAULT 0,
    warnCount INTEGER DEFAULT 0,
    accTip INTEGER DEFAULT 0,
    resbans INTEGER DEFAULT 0
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS warns (
    accId INTEGER,
    reason TEXT,
    mod TEXT
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
    accId INTEGER PRIMARY KEY,
    username TEXT,
    pronoun TEXT,
    resScore INTEGER DEFAULT 0,
    age INTEGER NOT NULL,
    birthday TEXT,
    musicName TEXT,
    musicSrc TEXT,
    movieName TEXT,
    movieSrc TEXT,
    serieName TEXT,
    serieSrc TEXT
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS reservaties (
    ResID INTEGER PRIMARY KEY,    
    accId INTEGER NOT NULL,
    gear INTEGER NOT NULL,
    daypart TEXT,
    project TEXT
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS omnummer (
    gear INTEGER PRIMARY KEY,
    name TEXT UNIQUE
    )`)
    console.log('Succesfully created tables.')

}

sync()