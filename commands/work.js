module.exports = {
	name: 'work',
	description: 'Makes you work',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let add = await eco.work(message.author.id, message.guild.id, 50);
        if (add.cooldown) return message.reply(`You already worked this 45 min. Come back after ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return message.reply(`you worked for 45 minutes and received ${add.amount}`);
	},
};