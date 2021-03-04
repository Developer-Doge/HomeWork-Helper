module.exports = {
	name: 'daily',
	description: 'Claims Daily Reward',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let add = await eco.daily(message.author.id, message.guild.id, 100);
        if (add.cooldown) return message.reply(`You already claimed your daily coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return message.reply(`you claimed ${add.amount} as your daily coins and now you have total ${add.money} coins.`);
	},
};