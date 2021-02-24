module.exports = {
	name: 'join',
	description: 'Simulates joining',
	execute(message) {
		client.emit('guildMemberAdd', message.member);
	},
};