import DiscordBot from './DiscordBot.mjs';
import EchoMessageCommand from './commands/EchoMessageCommand.mjs';
import { default as config } from './config.mjs'

new DiscordBot(config.AUTH_TOKEN)
    .registerCommand(EchoMessageCommand);