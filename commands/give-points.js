

module.exports = {
	name: 'give-points',
	description: 'Gives points to person',
  security: "Owner",
	execute(message, args, prefix, client, token) {
        const user = message.mentions.users.first() || client.users.get(args[0]);
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

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
    userPoints += pointsToAdd;


    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

    message.channel.send(`${user.tag} has received **${pointsToAdd}** points and now stands at **${userPoints}** points.`);
}
};