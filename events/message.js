const Discord = require('discord.js');
const { botID, mpChannelID, mpClosedRoleID, mpOpenRoleID } = require('./identifiers.json');
const staffRoles = ['935914663928037539', '935914663928037538', '935914663928037537', '935914663915442234'];
const prefix = '?';

module.exports = async (client, message) => {
    function sendError(description) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#DC2845')
            .setAuthor({name:'❌・Erreur'})
            .setDescription(`${description}`);
        message.channel.send({content:`${message.author}`, embeds:[errorEmbed]}).then(msg => {setTimeout(() => msg.delete(), 20000)});
    }
    async function isInTheGuild(mention) {
        try {
            await message.guild.members.fetch(mention.slice(2, 20));
            return true;
        }
        catch {return false}
    }
    if (message.channel.id === mpChannelID && message.author.id != botID){
        if (!message.member.roles.cache.some(role => (staffRoles.includes(role.id)))) {
            if (message.content.startsWith(prefix + 'mp')) {
                const args = message.content.split(/\s+/);
                if (args.length >= 2 && /^<@!?(\d{17,19})>$/g.test(args[1])) {
                    if (message.author.id != args[1].slice(2, 20)) {
                        isInTheGuild = await isInTheGuild(args[1]);
                        if (isInTheGuild === true) {
                            if (!message.mentions.users.first().bot) {
                                if (message.mentions.members.first().roles.cache.some(role => (role.id === mpOpenRoleID))) {
                                    sendError(`Inutile d'effectuer une demande, ce membre possède le rôle <@&${mpOpenRoleID}>`);
                                }
                                else if (message.mentions.members.first().roles.cache.some(role => (role.id === mpClosedRoleID))) {
                                    sendError(`Vous ne pouvez pas effectuer une demande de MP à un membre possédant le rôle <@&${mpClosedRoleID}>`);
                                }
                                else {
                                    let mention = args[1];
                                    if (args.length > 2) {
                                        reason = '>';
                                        args.splice(0, 2);
                                        args.forEach(arg => reason = `${reason} ${arg}`);         
                                    }
                                    else {reason = ''}
                                    const askMPEmbed = new Discord.MessageEmbed()
                                        .setColor('#2F3136')
                                        .setAuthor({name:'📩・Demande de MP'})
                                        .setDescription(`**${message.author.username}** souhaite te parler en MP\n${reason}`)
                                        .setThumbnail(message.author.displayAvatarURL())
                                        .setFooter({text:`ID: ${message.author.id}`});
                                    const embedButtons = new Discord.MessageActionRow()
                                        .addComponents(new Discord.MessageButton().setCustomId('accept').setLabel('Accepter').setStyle('SECONDARY'))
                                        .addComponents(new Discord.MessageButton().setCustomId('deny').setLabel('Refuser').setStyle('SECONDARY'));
                                    message.channel.send({embeds:[askMPEmbed], components:[embedButtons]}).then(msg => {msg.edit({content:mention})});
                                }
                            }
                            else{sendError('Vous ne pouvez pas effectuer une demande de MP à un bot')}
                        }
                        else {sendError("Cet utilisateur n'est plus présent sur le serveur")}
                    }
                    else {sendError('Vous ne pouvez pas effectuer une demande de MP à vous-même')}
                }
                else {sendError('Vous devez utiliser la commande `?mp @membre` pour effectuer une demande de MP')}
            } 
            else {sendError('Vous devez utiliser la commande `?mp @membre` pour effectuer une demande de MP')}
            message.delete()
        }
    }
}