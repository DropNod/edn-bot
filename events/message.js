const Discord = require('discord.js');

const { mpChannelID } = require('./identifiers.json');

async function sendError(author, channel, description) {

    const error = new Discord.MessageEmbed()
        .setColor("#ab311b")
        .setAuthor({ name: "❌・Erreur" })
        .setDescription(`${description}`)

    try {
        await channel.send({ content: `${author}`, embeds: [error] })
            .then(msg => {
                setTimeout(() => msg.delete(), 20000)
            });
    }
    catch (error) { }
}

async function sendEmbed(channel, embed, buttons, author, receiver) {
    try {
        await channel.send({ embeds: [embed], components: [buttons] }).then(msg => {msg.edit({ content: `${receiver}` })});
    }
    catch (error) {
        console.log(`Impossible de poster le message: ${message.content}`);
        sendError(author,channel,"Une erreur s'est produite veuillez réessayer");
    }
}

module.exports = (client, message) => {

    const guild = client.guilds.fetch('935914663856701440');

    //Commande ?mp
    if (message.content.startsWith('?mp') && message.channel.id === mpChannelID && message.author.id != "982594329308700694") {

        //Récupération des arguments
        const args = message.content.slice('mp').split(/ +/);

        //Récupération de la varible "id"
        id = "0"
        try {id = message.mentions.members.first().id}
        catch {}


        if (args.length >= 2 && args[1].includes(id) && message.mentions.members.first().user.bot === false && id != message.author.id && !(message.mentions.members.first().roles.cache.some(role => (role.id === '942751282702213120'))) && !(message.mentions.members.first().roles.cache.some(role => (role.id === '942751346359148585')))) {

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
            sendError(message.author, message.channel,"Vous devez préciser le membre à qui vous voulez effectuer une demande de MP");
        }
        else if (message.mentions.members.first().user.bot === true) {
            sendError(message.author, message.channel,"Vous ne pouvez pas effectuer une demande de MP à un bot");
        }
        else if (id === message.author.id) {
            sendError(message.author, message.channel,"Vous ne pouvez pas effectuer une demande de MP à vous-même");
        }
        else if (message.mentions.members.first().roles.cache.some(role => (role.id === '942751346359148585'))) {
            sendError(message.author, message.channel,"Vous ne pouvez pas effectuer une demande de MP à un membre possédant le rôle <@&942751346359148585>");
        }
        else if (message.mentions.members.first().roles.cache.some(role => (role.id === '942751282702213120'))) {
            sendError(message.author, message.channel,"Inutile d'effectuer une demande, ce membre possède le rôle <@&942751282702213120>");
        }
        message.delete();
    }
    else if (message.author.id != "982594329308700694" && message.channel.id === mpChannelID) {
        sendError(message.author, message.channel,"Vous devez utiliser la commande `?mp @membre` pour effectuer une demande de MP");
        message.delete();
    }
}