const { Client } = require('discord.js-commando')
const { join } = require('path')
const { token } = require('./config.json')

class DiscordBot {
    constructor () {
        this.initialize()
    }

    initialize () {
        this.bot = new Client({
            apiRequestMethod: config.apiRequestMethod || 'sequential',
            disabledEvents: ['TYPING_START', 'VOICE_STATE_UPDATE', 'PRESENCE_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_UPDATE', 'CHANNEL_PINS_UPDATE', 'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 'CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE_BULK', 'WEBHOOKS_UPDATE'],
            owner: [ // Duck, this setting gives access to internal edit features so we can use commands to edit while running and evaluate.
                "183239837988421632", // Rythian
                "213782659602579457" // Spyduck
            ],
            commandPrefix: '!',
            unknownCommandResponse: false,
            disableMentions: 'everyone',
            messageCacheMaxSize: 0,
            retryLimit: 0,
            ws: {
            intents: ["GUILD_MEMBERS", "GUILDS", "GUILD_MESSAGES"],
            },
        })

        // Set a reference to this instance inside of the client
        // for use in Commando modules. Is this bad? Probably. :)
        this.bot.discordBot = this

        // Events
        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        });
        this.bot.on('ready', this.ready.bind(this))
        this.bot.on('guildMemberAdd', this.guildMemberAdd.bind(this))

        this.bot.on('error', (message) => console.log(message))
        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled rejection at:', promise, 'reason:', reason)
        })

        this.bot.dispatcher.addInhibitor(msg => {
            // THIS IS HERE FOR POSSIBLE FUTURE THINGS, WE HAVE MAGIC ABILITIES TO
            // ADD BLACKLIST INHIBITORS FOR ABUSE WE SEE.
        })

        // Register commands
        this.bot.registry
            .registerGroup('rtfm', 'Read The Fucking Manual')
            .registerDefaultTypes()
            .registerDefaultGroups()
            .registerDefaultCommands({
                ping: false,
                commandState: false,
                prefix: true,
                help: true,
                unknownCommand: false
            })
            .registerCommandsIn(join(__dirname, 'commands'))

        // Login.
        this.bot.login(token)
    }

    ready () {
        console.log(`RTFM Bot running.`)
        this.bot.user.setActivity('The Matrix', { type: "LISTENING" })
    }
}

module.exports = DiscordBot