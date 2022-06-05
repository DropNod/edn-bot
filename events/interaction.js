const Discord = require('discord.js');


module.exports = (client, interaction) => {

    if(interaction.isButton()){

        if(interaction.user.id === interaction.message.content.slice(2, 20)) {

            interaction.message.embeds.forEach((embed) => {
                thumbnailValue = embed.thumbnail.url
                descriptionValue = embed.description
            })

            //Demande acceptée
            if(interaction.customId === "accept") {

                //Embed "Demande acceptée"
                const askmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "✅・Demande acceptée" })
                    .setDescription(`${descriptionValue}`)
                    .setThumbnail(thumbnailValue);

                //Embed "Demande acceptée notif mp"
                const notifmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "📣・Notification" })
                    .setDescription(`**${interaction.user.username}** a accepté votre demande de MP ✅`);

                //Actions
                interaction.message.edit({embeds: [askmp], components: []});
                interaction.reply({ content:`Vous avez accepté la demande de MP de ${descriptionValue.slice(0, 21)} ✅`, ephemeral: true});
                client.users.fetch(descriptionValue.slice(2, 20)).then((user) => {
                    try {
                        user.send({ embeds: [notifmp] });	
                    } catch (err){
                        console.log("err");
                    }
                });
            }

            //Demande refusée
            if(interaction.customId === "deny") {

                //Embed "Demande refusée"
                const askmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "❌・Demande refusée" })
                    .setDescription(`${descriptionValue}`)
                    .setThumbnail(thumbnailValue)

                //Embed "Demande refusée notif mp"
                const notifmp = new Discord.MessageEmbed()
                    .setColor("#A8307A")
                    .setAuthor({ name: "📣・Notification" })
                    .setDescription(`**${interaction.user.username}** a refusé votre demande de MP ❌`);
                
                //Actions
                interaction.message.edit({embeds: [askmp], components: []});
                interaction.reply({ content:`Vous avez refusé la demande de MP de ${descriptionValue.slice(0, 21)} ❌`, ephemeral: true});
                client.users.fetch(descriptionValue.slice(2, 20)).then((user) => {
                    try {
                        user.send({ embeds: [notifmp] });	
                    } catch (err){
                        console.log("err");
                    }
                });
            }
        }
        else {interaction.reply({ content:`Cette demande ne vous est pas destinée`, ephemeral: true});}
    }
}
