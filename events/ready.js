const { Events } = require('discord.js');
const cron = require('cron');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/main.db');
const msgArray = ["Gelukkig Nieuwda….\nNee, wacht eens even…\nGa slapen stelletje underachievers!\nDe nacht is prachtig, maar vooral wanneer jullie in je nest liggen en de straten leeg zijn, geluidsvervuiling tot het minimum wordt gehouden en geen kinderstem in de verste verte te horen is.\n*Zucht… een bot mag dromen.", "Gelukkig nieuwdag, een dag met een lach. Deze dag is gewoon zoals alle dagen, maar jij maakt hem bijzonder, dus niet klagen. Geniet van je leven, zoals dat je is gegeven🔥","Hey, gelukkig nieuwdag, Helaas is er 404 op het bericht wat hier had kunnen zijn, hiervoor heb ik jou nodig, stuur jouw eigen gelukkignieuwdag bericht in, via de dm van <@642288908381585408>, en zie hem terug in de server!", "Gelukkig nieuw dag allemaal. Ik wens u allen een zeer fijne dag. Iedereen met toetsen, examens en alle andere stressvolle events: **U GOT THIS!!**", "Gegroet HQ-Levensformen, een nieuwe dag is aangebroken. Pak deze kans om vreugd te verspreiden met je medemens en geniet van alle kleine dingen die dit leven ons bied! Go have an awesome day! 🫵🙏💙", "Gelukkig nieuwdag\nWhomp whomp ~ zawarudo.mp4", "Hallo iedereen,\nGelukkig nieuwdag iedereen!\nEen heel fijne dag toegewenst!"]

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        const admChannel = client.channels.cache.get("1235684112602501181");
        const general = client.channels.cache.get("973633429944025199");
        console.log(`Ready! Logged in as ${client.user.tag}`);
        let wipe1 = new cron.CronJob('0 1 * * 6', () => { // Vrijdag
            db.run('DELETE FROM reservaties')
            client.users.send('642288908381585408', `Tables wiped.`)
            admChannel.send("Reservaties zijn verwijderd")
        })
        let wipe2 = new cron.CronJob('0 19 * * 3', () => { // Woensdag
            db.run('DELETE FROM reservaties')
            client.users.send('642288908381585408', `Tables wiped.`)
            admChannel.send("Reservaties zijn verwijderd")
        })
        let streaksMSG = new cron.CronJob('0 0 * * *', () => { // Goodmorning eoeooeoe
            general.send(msgArray[Math.floor(Math.random() * msgArray.length)])
            
        })
        async function starting() {
            wipe1.start()
            wipe2.start()
            streaksMSG.start()
            console.log("All crons started.")
        };
        starting()
    },
};
