const { Events } = require('discord.js');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/main.db");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member, client) {
		db.run(`INSERT INTO strafblad(USRID, WARNCOUNT, MUTECOUNT, KICKCOUNT, BANCOUNT) VALUES(${member.id}, 0, 0, 0, 0)`)
		const channel = client.channels.cache.get('948985770528616488');
		channel.send(`Jo <@${member.id}>, Welkom bij **HEADQUARTER-6**!`)
	},
};
