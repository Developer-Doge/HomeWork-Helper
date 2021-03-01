module.exports = {
	name: 'reboot',
	description: 'Reboots the server.',
	security: 'Owner',
	execute(message, args, prefix, client, token) {
		message.channel.send("Rebooting...").then(sentMessage => {
			sentMessage.delete()
		});
		process.exit()
  },
};