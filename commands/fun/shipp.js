module.exports = {
    name: 'shipp',
    description: 'Ships people',
    security: 'None',
    execute(message, args, prefix, client, eco) {
        const randNum = Math.floor(Math.random() * 100)
        if (!args[0]) return message.channel.send("You forgot to mention someone!")
        if (!args[1]) return message.channel.send("You need to mention someone else!")

        if (args[0] || args[1]) {
            var FirstUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            var SecondUser = message.mentions.members.first(-1) || message.guild.members.cache.get(args[1])

            if (!FirstUser) return message.channel.send(`I couldn't find someone named **${args[0]}**!`)
            if (!SecondUser) return message.channel.send(`I couldn't find someone named **${args[1]}**!`)

            if (FirstUser || SecondUser) {
                const FirstUserSliced = FirstUser.displayName.slice(0, FirstUser.displayName.length / 2)
                const SecondUserSliced = SecondUser.map(user => {
                    return user.displayName.slice(user.displayName.length / 2)
                })
                const SecondUserName = SecondUser.map(user => {
                    return user.displayName
                })

                message.channel.send(`${FirstUser.displayName} + ${SecondUserName} = **${FirstUserSliced}${SecondUserSliced}**, Compatibility = 100%`)
            }
        }
    },
};