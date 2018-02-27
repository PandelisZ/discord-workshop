const Commando = require('discord.js-commando');

class AddNumbersCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'add-numbers',
			aliases: ['add', 'add-nums'],
			group: 'math',
			memberName: 'add',
			description: 'Adds numbers together.',
			details: `This is an incredibly useful command that finds the sum of numbers.
				This command is the envy of all other commands.
			`,
			examples: ['add-numbers 42 1337'],

			args: [
				{
					key: 'numbers',
					label: 'number',
					prompt: 'What numbers would you like to add? Every message you send will be interpreted as a single number.',
					type: 'float',
					infinite: true
				}
			]
		});
	}

	async run(msg, args) {
		const total = args.numbers.reduce((prev, arg) => prev + parseFloat(arg), 0);
		return msg.reply(`${args.numbers.join(' + ')} = **${total}**`);
	}
};

const bot = new Commando.Client({
	owner: process.env.DISCORD_USERID,
  commandPrefix: '?'
});

bot
  .on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${bot.user.username}#${bot.user.discriminator} (${bot.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof Commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })

bot.registry
	// Registers your custom command groups
	.registerGroups([
		['meme', 'Max memmage'],
    ['math', 'Math is boring']
	])

	// Registers all built-in groups, commands, and argument types
	.registerDefaults()

	// Registers all of your commands in the ./commands/ directory
	.registerCommand(AddNumbersCommand);


bot.login(process.env.DISCORD_KEY)
