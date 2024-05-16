const { REST, Routes } = require('discord.js');
const { clientId } = require('./config.json');

const { config } = require('dotenv')
config()

const rest = new REST().setToken(process.env.token);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);