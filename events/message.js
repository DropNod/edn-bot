const Discord = require('discord.js');

const { mpChannelID } = require('./identifiers.json');

module.exports = (client, message) => {

    console.log(message.content);

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
                .setDescription(`${message.author} **souhaite te parler en MP**\n${reason}`)
                .setThumbnail(message.author.displayAvatarURL())

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
            message.channel.send({ embeds: [askmp], components: [buttons] })
                .then(msg => {msg.edit({ content: `${args[1]}` })})
                .catch();
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