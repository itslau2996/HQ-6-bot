const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

async function sync() {
    db.run(`CREATE TABLE IF NOT EXISTS strafblad (
    USRID TEXT PRIMARY KEY,
    WARNCOUNT INTEGER,
    MUTECOUNT INTEGER,
    KICKCOUNT INTEGER,
    BANCOUNT INTEGER
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS warns (
    USRID TEXT,
    REASON TEXT,
    MOD TEXT
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS users (
    USRID TEXT PRIMARY KEY,
    USRNAME TEXT,
    count INTEGER
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS reservaties (
            USRID TEXT PRIMARY KEY,
            gear TEXT NOT NULL,
            week INTEGER,
            daypart TEXT,
            project TEXT
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS omnummer (
            gear TEXT,
            name TEXT
    )`)
}
sync()
console.log('Succesfully created tables.')
