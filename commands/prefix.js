const { MessageMentions } = require("discord.js");
module.exports = {
	name: 'prefix',
	description: 'Send the current prefix.',
	security: 'None',
	execute(message, args, prefix, client) {
		const guildConf = client.settings.get(message.guild.id);
		message.reply("The current prefix is '" + guildConf.prefix + "'")
	},
};