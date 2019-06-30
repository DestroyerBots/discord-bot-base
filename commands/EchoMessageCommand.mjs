import BaseCommand from './BaseCommand.mjs';

export default class EchoMessageCommand extends BaseCommand {
    run(message) {
        const messageText = message.content;

        this.sendMessage(messageText, message);
    }
}