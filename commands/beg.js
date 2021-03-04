module.exports = {
	name: 'beg',
	description: 'Makes you beg',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let add = await eco.beg(message.author.id, message.guild.id, 20);
        if (add.cooldown) return message.reply(`You already begged. Come back after ${add.time.seconds} seconds.`);
        return message.reply(`You begged and now have ${add.amount}.`);
	},
};