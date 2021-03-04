module.exports = {
	name: 'reboot',
	description: 'Reboots the server.',
	security: 'Owner',
	execute(message) {
		message.channel.send("Rebooting...").then(sentMessage => {
			sentMessage.delete()
		});
		process.exit()
  },
};