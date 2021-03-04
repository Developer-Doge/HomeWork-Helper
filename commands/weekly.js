module.exports = {
	name: 'weekly',
	description: 'Claims Weekly Reward',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let add = await eco.weekly(message.author.id, message.guild.id, 100);
        if (add.cooldown) return message.reply(`You already claimed your weekly coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return message.reply(`you claimed ${add.amount} as your weekly coins and now you have total ${add.money} coins.`);
	},
};