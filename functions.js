const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    gearcheck: async function (gear) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT name FROM omnummer WHERE gear = ?`;
            db.get(sql, [gear], (err, row) => {
                resolve(row.name);
            });
        });
    },
    available: async function(gear, dp, db) {
        return new Promise((resolve, reject) => {
            var value = null
            db.get(`SELECT accId FROM reservaties WHERE (gear= ${gear} AND daypart= '${dp}')`, async (err, row) => {
                if (typeof row === 'undefined') {
                    value = 'open'
                } else {
                    value = 'closed'
                }
                resolve(value)
            })

        })
    },
    getAccId: async function (id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT accId FROM users WHERE discordId = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) {
                    console.log(err)
                }
                resolve(row.accId);
            });
        });
    },
    getDiscId: async function (id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT discordId FROM users WHERE accId = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) {
                    console.log(err)
                }
                resolve(row.discordId);
            });
        });
    },
    getCount: async function(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(accId) FROM reservaties WHERE accId = ?'
            db.get(sql, [id], (err, row) => {
                if (err) {
                    console.log(err)
                }
                const number = parseInt(JSON.stringify(row).replace(/\D/g,''))
                resolve(number)
            });
        })
    },
    log: async function(accid, reason, issuer) {

    }
}