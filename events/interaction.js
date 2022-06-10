const Discord = require('discord.js');
const { mpChannelID } = require('./identifiers.json');

module.exports = async (client, interaction) => {
    async function isInTheGuild(id) {
        try {
            await interaction.guild.members.fetch(id).then(u => user = u);
            return user;
        }
        catch {return false}
    }
    async function sendNotifDM (user, description) {
        const notifDMEmbed = new Discord.MessageEmbed()
            .setColor('#7984EB')
            .setAuthor({name:'📣・Notification'})
            .setDescription(description);
        try {await user.send({embeds:[notifDMEmbed]})}
        catch {}
    }
    if(interaction.channel.id === mpChannelID && interaction.isButton()){
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