const {SlashCommandBuilder} = require("@discordjs/builders");
const askDMCommand = new SlashCommandBuilder()
    .setName('mp')
    .setDescription('Effectuer une demande de MP à un membre')
    .addUserOption(option => option.setName('membre').setDescription('Membre à qui vous souhaitez envoyer une demande de MP').setRequired(true))
    .addStringOption(option => option.setName('message').setDescription("Message pour accompagner votre demande (facultatif)"));
const nsfwImageCommand = new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('Obtenir une image NSFW')
    .addStringOption(option => option.setName('catégorie').setDescription("Catégorie de l'image (facultatif)"));
module.exports = (client) => {
    console.log('Launched !');
    client.user.setStatus('available');
    client.user.setActivity('v1.06');
    client.application.commands.create(askDMCommand);
    client.application.commands.create(nsfwImageCommand);
}