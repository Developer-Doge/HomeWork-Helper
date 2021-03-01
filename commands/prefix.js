const { MessageMentions } = require("discord.js");
module.exports = {
	name: 'prefix',
	description: 'Send the current prefix.',
	security: "None",
	execute(message, args, prefix, client, token) {
		const guildConf = client.settings.get(message.guild.id);
		message.reply("The current prefix is '" + guildConf.prefix + "'")
	},
};