

module.exports = {
	name: 'pay',
	description: 'Pays points to person',
  security: 'None',
	execute(message, args, prefix, client, eco) {
    const user = message.mentions.users.first() || client.users.get(args[0]);
    const user2 = message.author
    if(!user) return message.reply("You must mention someone or give their ID!");

    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) 
      return message.reply("You didn't tell me how many points to give...")

    // Get their current points.
    let userPoints = eco.addMoney(user.id, message.guild.id, pointsToAdd)
    let userPoints2 = eco.subtractMoney(user2.id, message.guild.id, pointsToAdd);

    message.channel.send(`${user.tag} has received their payment of **${pointsToAdd}** points.`);
}
};