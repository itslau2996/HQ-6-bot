const { Events } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv')
const cron = require('cron')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        let newweekwipe = new cron.CronJob('0 1 * * 6', () => {
            db.run('DELETE FROM reservaties')
            console.log('Wiped yo table')
            client.users.send('642288908381585408', `Tables wiped.`)
        })
        newweekwipe.start()
    },
};
