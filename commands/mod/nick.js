module.exports = {
	name: 'nick',
	description: 'Changes a users nickanme',
    security: 'Owner',
	async execute(message, args, prefix, client, eco) {
		let user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a User to change their nickname!")

    let nickname = args.slice(1).join(" ") // =nickname (user) (nickname kdjv)
    if(!nickname) return message.reply("Please specify a nickname!")

    let member = message.guild.members.cache.get(user.id);
    await member.setNickname(nickname);

    message.channel.send(`Set ${user}'s nickname to "${nickname}"!`)
	},
};