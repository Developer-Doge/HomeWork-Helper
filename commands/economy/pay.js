

module.exports = {
	name: 'pay',
	description: 'Pays points to person',
  security: 'None',
	async execute(message, args, prefix, client, eco) {
    let pay = await eco.pay({
      userId: message.author.id, //It can be any users ID
      usertoPay: message.mentions.users.first() || client.users.get(args[0]), //The second user to give the money to
      amountMoney: parseInt(args[1], 10)
    });
    message.channel.send(`You have paid ${usertoPay} ${pay.amount}$`);
}
};