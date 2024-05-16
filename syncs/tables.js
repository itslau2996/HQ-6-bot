const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')


db.run(`ALTER TABLE users ADD COLUMN resbans INTEGER DEFAULT 0`, function(err) {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Table Altered!')
    }
})
async function junction() {

    let sql = `INSERT INTO omnummer(name) VALUES('Windows 1'),('Windows 2'),('Windows 3'),('Apple 1'),('Apple 2'),('Apple 3'),('VR 1'),('VR 2'),('VR 3'),('Headset 1'),('Headset 2'),('Headset 3'),('BANNED')`
    db.run(sql, function (err) {
        if (err) {
            console.log(err.message)
        } else {
            console.log('junction created')
        }
    })
}

junction()
