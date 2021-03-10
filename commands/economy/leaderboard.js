const Discord = require('discord.js')
module.exports = {
  name: 'leaderboard',
  description: "Displays guilds point's leaderboard.",
  security: 'Disabled',
  async execute(message, args, prefix, client, eco) {
    let lb = await eco.leaderboard(message.guild.id, 10);
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.guild.name,
        message.guild.iconURL()
      )
      .setColor("RANDOM")
    console.log(lb)
    lb.forEach(u => {
      console.log(u)
      if (client.users.cache.get(u.user) && client.users.cache.get(u.user).tag) {
        embed.addField(`${u.position}. ${client.users.cache.get(u.user).tag}`, `Money: ${u.money} 💸`)
      }
    });
    return message.channel.send(embed);
  },
};