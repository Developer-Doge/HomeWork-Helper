module.exports = {
	name: 'ping',
	description: 'Gets server ping.',
	security: 'None',
	execute(message, args, prefix, client, token) {
		message.channel.send(`Latency is, ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
	},
};