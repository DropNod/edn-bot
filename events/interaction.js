const Discord = require('discord.js');
const { mpChannelID } = require('./identifiers.json');

async function DMmember(user, embed) {
    try {
        await user.send({ embeds: [embed] });
    }
    catch (error) {
        (console.log(`Impossible de MP: ${user}`));
    }
}

module.exports = (client, interaction) => {

    if(interaction.channel.id === mpChannelID && interaction.isButton()){

        if(interaction.user.id === interaction.message.content.slice(2, 20)) {

            //Récupéraction des variables de l'embed
            interaction.message.embeds.forEach((embed) => {
                descriptionValue = embed.description
                thumbnailValue = embed.thumbnail.url
                footerValue = embed.footer.text
            })

            //Demande acceptée
            if(interaction.customId === "accept") {

                //Embed "Demande acceptée"
                const askmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "✅・Demande acceptée" })
                    .setDescription(descriptionValue)
                    .setFooter({ text: `${footerValue}` })
                    .setThumbnail(thumbnailValue);

                //Embed "Demande acceptée notif mp"
                const notifmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "📣・Notification" })
                    .setDescription(`**${interaction.user.username}** a accepté votre demande de MP ✅`);

                //Actions
                interaction.message.edit({embeds: [askmp], components: []});

                client.users.fetch(footerValue.slice(3)).then( user => {
                    interaction.reply({ content:`Vous avez accepté la demande de MP de ${user}`, ephemeral: true});
                    DMmember(user, notifmp);
                });
            }

            //Demande refusée
            if(interaction.customId === "deny") {

                //Embed "Demande refusée"
                const askmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "❌・Demande refusée" })
                    .setDescription(descriptionValue)
                    .setFooter({ text: `${footerValue}` })
                    .setThumbnail(thumbnailValue)

                //Embed "Demande refusée notif mp"
                const notifmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "📣・Notification" })
                    .setDescription(`**${interaction.user.username}** a refusé votre demande de MP ❌`);
                
                //Actions
                interaction.message.edit({embeds: [askmp], components: []});
                client.users.fetch(footerValue.slice(3)).then( user => {
                    interaction.reply({ content:`Vous avez refusé la demande de MP de ${user}`, ephemeral: true});
                    DMmember(user, notifmp);
                });
            }
        }
        else {interaction.reply({ content:`Cette demande ne vous est pas destinée`, ephemeral: true});}
    }
}