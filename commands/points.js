
module.exports = {
	name: 'points',
	description: 'Views Points',
  security: 'None',
	execute(message, args, prefix, client, token) {
    const key = `${message.guild.id}-${message.author.id}`;
    return message.channel.send(`You currently have ${client.points.get(key, "points")} points, and are level ${client.points.get(key, "level")}!`);
  }
};