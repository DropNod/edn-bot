const Discord = require('discord.js');
const { mpChannelID, mpClosedRoleID, mpOpenRoleID } = require('./identifiers.json');

module.exports = async (client, interaction) => {
    async function isInTheGuild(id) {
        try {
            await interaction.guild.members.fetch(id).then(u => user = u);
            return user;
        }
        catch {return false}
    }
    function sendError(description) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#DC2845')
            .setAuthor({name:'❌・Erreur'})
            .setDescription(description);
        interaction.reply({embeds:[errorEmbed], ephemeral:true});
    }
    if (interaction.isCommand()) {
        if (interaction.commandName === 'mp') {
            if (interaction.channel.id === mpChannelID) {
                commandUser = interaction.options.getUser('membre');
                if (interaction.options.getString('message') !== null) {
                    commandMessage = '> ' + interaction.options.getString('message')
                }
                else {commandMessage = ''}
                if (interaction.user !== commandUser) {
                    if (!commandUser.bot) {
                        commandMember = await interaction.guild.members.fetch(commandUser.id);
                        if (commandMember.roles.cache.some(role => (role.id === mpOpenRoleID))) {
                            sendError(`Inutile d'effectuer une demande, ce membre possède le rôle <@&${mpOpenRoleID}>`);
                        }
                        else if (commandMember.roles.cache.some(role => (role.id === mpClosedRoleID))) {
                            sendError(`Vous ne pouvez pas effectuer une demande de MP à un membre possédant le rôle <@&${mpClosedRoleID}>`);
                        }
                        else {
                            const askMPEmbed = new Discord.MessageEmbed()
                                .setColor('#2F3136')
                                .setAuthor({name:'📩・Demande de MP'})
                                .setDescription(`**${interaction.user.username}** souhaite te parler en MP\n${commandMessage}`)
                                .setThumbnail(interaction.user.displayAvatarURL())
                                .setFooter({text:`ID: ${interaction.user.id}`});
                            const embedButtons = new Discord.MessageActionRow()
                                .addComponents(new Discord.MessageButton().setCustomId('accept').setLabel('Accepter').setStyle('SECONDARY'))
                                .addComponents(new Discord.MessageButton().setCustomId('deny').setLabel('Refuser').setStyle('SECONDARY'));
                            interaction.reply({content:commandUser.toString(), embeds:[askMPEmbed], components:[embedButtons]});
                        }
                    }
                    else{sendError('Vous ne pouvez pas effectuer une demande de MP à un bot')}
                }
                else {sendError('Vous ne pouvez pas effectuer une demande de MP à vous-même')}
            }
            else {sendError('Vous ne pouvez pas utiliser cette commande dans ce salon')}
        }
    }
    if (interaction.channel.id === mpChannelID && interaction.isButton()) {
        async function sendNotifDM (user, description) {
            const notifDMEmbed = new Discord.MessageEmbed()
                .setColor('#7984EB')
                .setAuthor({name:'📣・Notification'})
                .setDescription(description);
            try {await user.send({embeds:[notifDMEmbed]})}
            catch {}
        }
        if(interaction.user.id === interaction.message.content.slice(2, 20)) {
            description = interaction.message.embeds[0].description;
            thumbnail = interaction.message.embeds[0].thumbnail.url;
            footerText = interaction.message.embeds[0].footer.text;
            id = footerText.slice(4)
            isInTheGuild = await isInTheGuild(id);
            if (isInTheGuild !== false) {
                if(interaction.customId === 'accept') {
                    const askDMEmbed = new Discord.MessageEmbed().setColor('#3BA561').setAuthor({name:'✅・Demande acceptée'}).setDescription(description).setFooter({text:footerText}).setThumbnail(thumbnail);
                    interaction.message.edit({components:[], embeds:[askDMEmbed]});
                    sendNotifDM(user, `**${interaction.user.username}** a accepté votre demande de MP ✅`)
                    interaction.reply({content:`Vous avez accepté la demande de MP de ${isInTheGuild}`, ephemeral:true});
                }
                else {
                    const askDMEmbed = new Discord.MessageEmbed().setColor('#DC2845').setAuthor({name:'❌・Demande refusée'}).setDescription(description).setFooter({text:footerText}).setThumbnail(thumbnail);
                    interaction.message.edit({components:[], embeds:[askDMEmbed]});
                    sendNotifDM(user, `**${interaction.user.username}** a refusé votre demande de MP ❌`)
                    interaction.reply({content:`Vous avez refusé la demande de MP de ${isInTheGuild}`, ephemeral:true});
                }
            }
        }
        else {interaction.reply({ content:'Cette demande ne vous est pas destinée', ephemeral: true});}
    }
}