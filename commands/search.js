module.exports = {
	name: 'search',
	description: 'Makes you search',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let add = await eco.search(message.author.id, message.guild.id, 20);
        if (add.cooldown) return message.reply(`You already searched. Come back after ${add.time.seconds} seconds.`);
        return message.reply(`You searched and now have ${add.amount}.`);
	},
};