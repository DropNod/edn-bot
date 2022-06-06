const Discord = require('discord.js');

const { mpChannelID } = require('./identifiers.json');

async function sendEmbed(channel, embed, buttons, author, receiver) {
    try {
        await channel.send({ embeds: [embed], components: [buttons] }).then(msg => {msg.edit({ content: `${receiver}` })});
    }
    catch (error) {
        console.log(`Impossible de poster le message: ${message.content}`);
        channel.send({ content: `${author} **une erreur s'est produite veuillez réessayer**` })
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
            });
    }
}

module.exports = (client, message) => {

    //Commande ?mp
    if (message.content.startsWith('?mp') && message.channel.id === mpChannelID && message.author.id != "982594329308700694") {

        //Récupération des arguments
        const args = message.content.slice('mp').split(/ +/);

        //Récupération de la varible "id"
        id = "0"
        try {id = message.mentions.members.first().id}
        catch {}


        if (args.length >= 2 && args[1].includes(id) && message.mentions.members.first().user.bot === false && id != message.author.id) {

            //Récupération de la variable "reason"
            reason = `${message.content.slice(25)}`;
            if (reason != "") {
                reason = `> ${reason}`.replace(/\n/g, " ");
            }

            //Embed "Demande de MP"
            const askmp = new Discord.MessageEmbed()
                .setColor("#A8307A")
                .setAuthor({ name: "📩・Demande de MP" })
                .setDescription(`**${message.author.username}** souhaite te parler en MP\n${reason}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter({ text:`ID: ${message.author.id}` })

            //Boutons "Demande de MP"
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

            //Envoi de l'embed
            sendEmbed(message.channel, askmp, buttons, message.author, args[1]);

        }
        else if (args.length === 1) {
            message.channel.send({ content: `${message.author} **vous devez préciser le membre à qui vous voulez effectuer une demande de MP**` })
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
                .catch();
        }
        else if (message.mentions.members.first().user.bot === true) {
            message.channel.send({ content: `${message.author} **vous ne pouvez pas effectuer une demande de MP à un bot**` })
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
                .catch();
        }
        else if (id === message.author.id) {
            message.channel.send({ content: `${message.author} **vous ne pouvez pas effectuer une demande de MP à vous-même**` })
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
                .catch();
        }
        message.delete();
    }
    else if (message.author.id != "982594329308700694" && message.channel.id === mpChannelID) {
            message.channel.send({ content:`${message.author}` + " **vous devez utiliser la commande** `?mp @membre` **pour effectuer une demande de MP**" })
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
                .catch();
            message.delete();
    }
}