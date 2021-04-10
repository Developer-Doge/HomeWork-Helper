      module.exports = {
        name: 'lock',
        description: 'Locks channe;',
        security: 'Mod',
        execute(message) {
          const targetChannel = message.mentions.channels.first() || message.channel;
          // Guild ID is the same as the everyone role ID
          const everyoneID = message.guild.id;
  
          targetChannel.updateOverwrite(everyoneID, {
              SEND_MESSAGES: false,
          });
  
          targetChannel.send(`**${targetChannel.name}** has been locked :lock:`);
      }
  }