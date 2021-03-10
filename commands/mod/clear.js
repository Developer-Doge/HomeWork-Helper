      module.exports = {
        name: 'clear',
        description: 'Clears Messages of Argumented Amount',
        security: 'Mod',
        execute(message) {
            const messageArray = message.content.split(" ");
            const args = messageArray.slice(1);

            let deleteAmount;

             if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Please put a number only!");
      }

      if (parseInt(args[0]) > 100) {
        return message.reply("You can only delete 100 messages at a time!");
      } else {
        deleteAmount = parseInt(args[0]);
      }

      message.delete()
      message.channel.bulkDelete(deleteAmount, true);
      message.reply(`Successfully deleted ${deleteAmount} message(s).`)
      .then(msg => {
        msg.delete({ timeout: 5000 })
      });
    },
  }