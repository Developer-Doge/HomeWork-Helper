const Discord = require('discord.js')
module.exports = {
	name: 'leaderboard',
	description: "Displays guilds point's leaderboard.",
  security: 'None',
	async execute(message, args, prefix, client, eco) {
		let lb = await eco.leaderboard(message.guild.id, 10);
        const embed = new Discord.MessageEmbed()
        .setAuthor(
          message.guild.name,
          message.guild.iconURL()
          )
        .setColor("RANDOM");
        lb.forEach(u => {
            embed.addField(`${u.position}. ${client.users.cache.get(u.user).tag}`, `Money: ${u.money} 💸`);
        });
        return message.channel.send(embed);
	},
};
    