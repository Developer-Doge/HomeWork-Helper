module.exports = {
	name: 'add',
	description: 'Adds cash',
    security: 'Owner',
	async execute(message, args, prefix, client, eco) {
        const pointsToAdd = parseInt(args[1], 10);
		let add = await eco.addMoney(message.mentions.users.first().id, message.guild.id, pointsToAdd);
	},
};