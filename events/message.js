const Discord = require('discord.js');

const { adminChannelID } = require('./identifiers.json');

try {
    module.exports = (client, message) => {

        //commande ?mp
        if (message.content.startsWith('?mp') && message.channel.id === adminChannelID) {
            const args = message.content.slice('mp').split(/ +/);
            id = "0"
            try {id = message.mentions.members.first().id}
            catch {}
            if (args.length >= 2 && args[1].includes(id) && message.mentions.members.first().user.bot === false && id != message.author.id) {
                const askmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setTitle("📩・Demande de MP")
                    .addFields({name: "\u200B", value: `${message.author} souhaite te parler en MP`})
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(args[1])
                    .setFooter({text: 'Effectué avec la commande ?mp'});

                var buttons = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("accept")
                        .setLabel("Accepter")
                        .setStyle("SUCCESS")
                    )
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("deny")
                        .setLabel("Refuser")
                        .setStyle("DANGER")
                    );

                message.channel.send({ embeds: [askmp], components: [buttons] });
            }
            else {
                if (message.author.id != "982594329308700694" && message.channel.id === adminChannelID) {
                    message.delete();
                }
            }

        }
        else {
            if (message.author.id != "982594329308700694" && message.channel.id === adminChannelID) {
                message.delete();
            }
        }
    }
}
catch (error){console.log("Erreur message.js")}
