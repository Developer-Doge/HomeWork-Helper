

module.exports = {
	name: 'pay',
	description: 'Pays points to person',
  security: "None",
	execute(message, args, prefix, client, token) {
    const user = message.mentions.users.first() || client.users.get(args[0]);
    const user2 = message.author
    if(!user) return message.reply("You must mention someone or give their ID!");

    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) 
      return message.reply("You didn't tell me how many points to give...")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user2.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
    userPoints += pointsToAdd;
    let userPoints2 = client.points.get(`${message.guild.id}-${user2.id}`, "points");
    userPoints2 -= pointsToAdd;


    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")
    client.points.set(`${message.guild.id}-${user2.id}`, userPoints, "points")

    message.channel.send(`${user.tag} has received their payment of **${pointsToAdd}** points and now stands at **${userPoints}** points. ${user2.tag} now stands at **${userPoints2}** points.`);
}
};