const Discord = require('discord.js');

try {
    module.exports = (client, interaction) => {
        if(interaction.isButton()){

            interaction.message.embeds.forEach((embed) => {
                thumbnailValue = embed.thumbnail.url
                descriptionValue = embed.description
                embed.fields.forEach((field) => {
                    fieldValue = field.value;
                });
            });

            if(interaction.user.id === descriptionValue.slice(2, 20)) {

                setTimeout(function(){ 

                    //Demande acceptée
                    if(interaction.customId === "accept") {
                        const askmp = new Discord.MessageEmbed()
                            .setColor("#A8307A")
                            .setTitle("✅・Demande acceptée")
                            .addFields({name: "\u200B", value: `${fieldValue}`})
                            .setThumbnail(thumbnailValue)
                            .setDescription(descriptionValue);
                        interaction.message.edit({embeds: [askmp], components: []});
                        interaction.reply({ content:`Vous avez accepté la demande de MP de ${fieldValue.slice(0, 21)} ✅`, ephemeral: true});
                    }

                    //Demande refusée
                    if(interaction.customId === "deny") {
                        const askmp = new Discord.MessageEmbed()
                            .setColor("#A8307A")
                            .setTitle("❌・Demande refusée")
                            .addFields({name: "\u200B", value: `${fieldValue}`})
                            .setThumbnail(thumbnailValue)
                            .setDescription(descriptionValue);
                        interaction.message.edit({embeds: [askmp], components: []});
                        interaction.reply({ content:`Vous avez refusé la demande de MP de ${fieldValue.slice(0, 21)} ❌`, ephemeral: true});
                    }
                }, 100);
            }
            else {interaction.reply({ content:`Cette demande ne vous est pas destinée`, ephemeral: true});}
        }
    }
}
catch(error){console.log("Erreur interaction.js")}