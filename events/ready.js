const { Events } = require('discord.js');
const cron = require('cron');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/main.db');
const msgArray = ["Soms zit het even niet mee, dan moet jij degene zijn die de juiste beslissingen neemt.  Kies eens voor jezelf. Anderen zijn belangrijk, maar je moet zelf niet ongelukkig worden van het geluk van anderen.\nOnthoud dit voor altijd 💙", "Gegroet zielige NPC'S,\nEen fijne dag gewenst en veel plezier met het zijn van kleine NPC'S. Groetjes jullie held... Marvelous Marcy :heart::orange_heart::yellow_heart::green_heart::light_blue_heart::purple_heart:", "Gelukkig nieuwdag! Vandaag krijgt iedereen hopelijk een fantastische dag waarin er veel mooie dingen gebeuren. Dus maakt er wat moois van. U GOT THIS!", "Soms zit het even niet mee, dan moet jij degene zijn die de juiste beslissingen neemt.  Kies eens voor jezelf. Anderen zijn belangrijk, maar je moet zelf niet ongelukkig worden van het geluk van anderen.\nOnthoud dit voor altijd 💙", "Gegroet zielige NPC'S,\nEen fijne dag gewenst en veel plezier met het zijn van kleine NPC'S. Groetjes jullie held... Marvelous Marcy :heart::orange_heart::yellow_heart::green_heart::light_blue_heart::purple_heart:", "Wat een prachtige nieuwe dag staat ons te wachten!\nMaar eerst vraagt iedereen zich natuurlijk af wat Jordy gaat dromen?\nKomt Roos erin voor? Vast en zeker! Gaat hij weer van de glijbaan op pijnlijke wijze? Likely so!\nIs Sanne nog steeds in de buik van dikke Jordy? Gaat Djimo hem weer beledigen? Maakt Finn zijn verschijning? Of Matthijs? Zoveel vragen... we kunnen alleen afwachten wat onze Jordy deze keer weer zal overkomen... Bless his soul.", "Gelukkig nieuwdag mensen, vandaag is het een dag om onze grote vriend Maarten te aanbidden. Wees daarom extra dankbaar dat je wakker wordt in dezelfde wereld als Maarten. Een zeer prettige dag gewenst, gegroet.", "Gelukkig Nieuwda….\nNee, wacht eens even…\nGa slapen stelletje underachievers!\nDe nacht is prachtig, maar vooral wanneer jullie in je nest liggen en de straten leeg zijn, geluidsvervuiling tot het minimum wordt gehouden en geen kinderstem in de verste verte te horen is.\n*Zucht… een bot mag dromen.", "Gelukkig nieuwdag, een dag met een lach. Deze dag is gewoon zoals alle dagen, maar jij maakt hem bijzonder, dus niet klagen. Geniet van je leven, zoals dat je is gegeven🔥",  "Hey, gelukkig nieuwdag, Helaas is er 404 op het bericht wat hier had kunnen zijn, hiervoor heb ik jou nodig, stuur jouw eigen gelukkignieuwdag bericht in, via de dm van <@642288908381585408>, en zie hem terug in de server!", "Gelukkig nieuw dag allemaal. Ik wens u allen een zeer fijne dag. Iedereen met toetsen, examens en alle andere stressvolle events: **U GOT THIS!!**", "Gegroet HQ-Levensformen, een nieuwe dag is aangebroken. Pak deze kans om vreugd te verspreiden met je medemens en geniet van alle kleine dingen die dit leven ons bied! Go have an awesome day! 🫵🙏💙", "Gelukkig nieuwdag\nWhomp whomp ~ zawarudo.mp4", "Hallo iedereen,\nGelukkig nieuwdag iedereen!\nEen heel fijne dag toegewenst!"]

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
        let cheeseping = new cron.CronJob('0 10-23 * * *', () => { // aandacht voor onze kaasvrouw
            if (Math.floor(Math.random() * 10) === 9) {
                general.send("Onze emperor <@&1247841569155842059> moet aandacht krijgen, all hail the kaas master");
            }
        })
        async function starting() {
            wipe1.start()
            wipe2.start()
            streaksMSG.start()
            cheeseping.start();
            console.log("All crons started.")
        };
        starting()
    },
};
