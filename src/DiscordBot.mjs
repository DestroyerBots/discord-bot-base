import Discord from 'discord.js'

export default class DiscordBot {
    /**
     * Class representing a complete discord bot.
     * @param {String} token Discord bot token.
     * @param {*} opts Options object
     */
    constructor(token, opts = {}) {
        this.client = new Discord.Client();
        this.client.login(token);

        this.commandHandlers = [];

        this.client.on('ready', (opts.handlers && opts.handlers.readyHandler || this._readyHandler).bind(this));
        this.client.on('message', (opts.handlers && opts.handlers.messageHandler || this._messageHandler).bind(this));
    }

    /**
     * Handler run on the 'ready' event of the client. Ensures the bot is only
     * bound to a single server.
     */
    _readyHandler() {
        console.log('Bot running, login complete.')

        const allGuilds = this.client.guilds.array();

        switch (allGuilds.length) {
            case 0:
                console.log("Your bot must belong to a server.");
                process.exit(1);
                break;
            case 1:
                const guild = allGuilds[0];
                console.log('Server:', guild.name);
                console.log('Member Count:', guild.members.array().length);
                break;
            default:
                console.log("Your can only belong to one server.");
                process.exit(1);
        }
    }

    /**
     * Register a commandHandler to be run when the bot receives a message.
     * @param {? extends AbstractCommand} commandHandler 
     */
    registerCommand(commandHandler) {
        if (!this.commandHandlers.includes(commandHandler)) {
            this.commandHandlers.push( new commandHandler(this.client));
            return this;
        }
    }

    /**
     * 
     * @param message 
     */
    _messageHandler(message) {
        if (message.channel.type != 'dm') return;

        this.commandHandlers.forEach(commandHandler => {
            commandHandler.run(message);
        })
    }
}