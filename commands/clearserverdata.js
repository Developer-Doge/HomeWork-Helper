

module.exports = {
	name: 'clearserversavedata',
	description: "Resets server's save data",
    security: 'Owner',
	execute(message, args, prefix, client) {
		client.settings.delete(guild.id);
		message.reply('Succesfully reset data.')
	},
};