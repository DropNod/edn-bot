const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

client.on('ready', () => require('./events/ready.js')(client));
client.on('messageCreate', message => require('./events/message.js')(client, message));
client.on("interactionCreate", interaction => require('./events/interaction.js')(client, interaction));
client.login(process.env.TOKEN);