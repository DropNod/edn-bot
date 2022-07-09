const Discord = require('discord.js');
const { guildID, voteChannelID, barRoleID } = require('./identifiers.json');
votersList = [];

module.exports = async (client) => {
    const guild = await client.guilds.fetch(guildID);
    await guild.roles.fetch()
    barRole = await guild.roles.cache.find(role => role.id === barRoleID);
    const voteRole = await guild.roles.cache.find(role => role.name === '🤝 ~ A voté');
    const voteChannel = await guild.channels.fetch(voteChannelID);
    const voteEmbed = new Discord.MessageEmbed()
        .setColor('#7984EB')
        .setAuthor({name:'✅・Votes disponibles !'})
        .setDescription('Vous pouvez voter à nouveau ! Cela nous aide à donne un maximum de visibilité au serveur !');
    voteChannel.send({content:`||<@&${voteRole.id}>||`, embeds:[voteEmbed]});
    await voteRole.delete();
    guild.roles.create({
        name: '🤝 ~ A voté',
        color: [46, 204, 119],
        position: barRole.position + 1
    });
}