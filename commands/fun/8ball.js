module.exports = {
	name: '8ball',
	description: 'Magic 8ball',
    security: 'None',
	execute(message, args, prefix, client, eco) {
		const answers = [
            'Maybe.',
            'Certainly not.',
            'I hope so.',
            'Not in your wildest dreams.',
            'There is a good chance.',
            'Quite likely.',
            'I think so.',
            'I hope not.',
            'I hope so.',
            'Never!',
            'Fuhgeddaboudit.',
            'Ahaha! Really?!?',
            'Pfft.',
            'Sorry, bucko.',
            'Hecc, yes.',
            'Hecc to the no.',
            'The future is bleak.',
            'The future is uncertain.',
            'I would rather not say.',
            'Who cares?',
            'Possibly.',
            'Never, ever, ever.',
            'There is a small chance.',
            'Yes!'
        ];
        return message.reply(args.join(' ').endsWith('?') ?
			`🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
			'🎱 That doesn\'t seem to be a question, try again and make sure it ends with a \'?\'');
	},
};