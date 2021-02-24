module.exports = {
	name: 'reboot',
	description: 'Reboots the server.',
	execute(message, args, prefix, client, token) {
		client.destroy().then(() => client.login(token)).catch()
		message.channel.send("Succesfully Rebooted!")
	},
};