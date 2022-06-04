const Discord = require('discord.js');

module.exports = (client, interaction) => {

    if(interaction.isButton()){
        if(interaction.user === interaction.message.mentions.members.first().user) {
            
            interaction.message.embeds.forEach((embed) => {
                thumbnailValue = embed.thumbnail.url
                embed.fields.forEach((field) => {
                    fieldValue = field.value;
                });
            });

            setTimeout(function(){ 

                        //Demande acceptée
                if(interaction.customId === "accept") {
                    const askmp = new Discord.MessageEmbed()
                        .setColor("#A8307A")
                        .setTitle("✅・Demande acceptée")
                        .addFields({name: "\u200B", value: `${fieldValue}`})
                        .setThumbnail(thumbnailValue);
                    interaction.message.edit({embeds: [askmp], components: []});
                    interaction.reply({ content:`Vous avez accepté la demande d'ami de ${fieldValue.slice(0, 21)} ✅`, ephemeral: true});
                    interaction.message.reply({ content:`${fieldValue.slice(0, 21)} votre demande a été acceptée ✅`});
                }

                //Demande refusée
                if(interaction.customId === "deny") {
                    const askmp = new Discord.MessageEmbed()
                        .setColor("#A8307A")
                        .setTitle("❌・Demande refusée")
                        .addFields({name: "\u200B", value: `${fieldValue}`})
                        .setThumbnail(thumbnailValue);
                    interaction.message.edit({embeds: [askmp], components: []});
                    interaction.reply({ content:`Vous avez refusé la demande d'ami de ${fieldValue.slice(0, 21)} ❌`, ephemeral: true});
                    interaction.message.reply({ content:`${fieldValue.slice(0, 21)} votre demande a été refusée ❌`});
                }
            }, 100);
        }
    }
}