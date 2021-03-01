const Discord = require("discord.js")

module.exports = {
	name: 'poll',
	description: 'Creates a poll with the provided arguments.',
  security: 'Mod',
  async execute (message) {
        const messageArray = message.content.split(" ");
        const cmd = messageArray[0];
        const args = messageArray.slice(1);
          let pollChannel = message.mentions.channels.first();
          let pollDescription = args.slice(1).join(" ");
          if (!pollChannel) {
            let embedPoll = new Discord.MessageEmbed()
              //.setTitle('Poll')
              .setDescription(args.join(" "))
              .setColor("BLUE")
              .setAuthor(
                message.guild.name,
                message.guild.iconURL(),
                "https://discord.com"
              )
            let msgEmbed = await message.channel.send(embedPoll);
            await msgEmbed.react("👍");
            await msgEmbed.react("👎");
            message.delete();
            return;

          }
          let embedPoll = new Discord.MessageEmbed()
            //.setTitle('Poll')
            .setDescription(pollDescription)
            .setColor("RANDOM")
            .setAuthor(
              message.guild.name,
              message.guild.iconURL(),
              "https://discord.com"
            )
          let msgEmbed = await pollChannel.send(embedPoll);
          await msgEmbed.react("👍");
          await msgEmbed.react("👎");
          message.delete();
      }
    }