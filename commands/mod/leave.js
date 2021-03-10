module.exports = {
	name: 'leave',
	description: 'Leaves the server!',
    security: 'Owner',
	execute(message, args, prefix, client, eco) {
		client.guilds.cache.get(message.guild.id)
    .leave()
	},
};