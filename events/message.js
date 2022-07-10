const Discord = require('discord.js');
const { botID, mpChannelID, voteChannelID } = require('./identifiers.json');
const staffRoles = ['935914663928037539', '935914663928037538', '935914663928037537', '935914663915442234'];


module.exports = async (client, message) => {
    function sendError(description) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#DC2845')
            .setAuthor({name:'❌・Erreur'})
            .setDescription(description);
        message.channel.send({content:message.author.toString(), embeds:[errorEmbed]}).then(msg => {setTimeout(() => msg.delete(), 20000)});
    }
    if (message.channel.id === mpChannelID && message.author.id !== botID && !message.member.roles.cache.some(role => (staffRoles.includes(role.id)))){
        sendError('Vous devez utiliser la commande `/mp` pour effectuer une demande de MP');
        message.delete();
    }
    if(message.content === '$v' || message.content.startsWith('$v ') || message.content.startsWith('$vote')) {
        await message.guild.roles.fetch();
        const voteRole = await message.guild.roles.cache.find(role => role.name === '🤝 ~ A voté');
        message.member.roles.add(voteRole);
    }
}