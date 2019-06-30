export default class BaseCommand {
    constructor(client) {
        this.client = client;
    }

    /**
     * This method will be called when a message is received. It must be overwritten in the child class.
     */
    run() {
        throw new MethodNotImplementedError(`The run method must be implemented in class ${this.constructor.name}.`);
    }

    /**
     * Method to send a response to the user who triggered the event.
     * @param text text to be sent in response
     * @param event the message event
     */
    sendMessage(text, event) {
        event.author.send(text)
          .catch(err => {
            if (err != "DiscordAPIError: Cannot send messages to this user") {
                console.error(err);
            }
          });
      }
}

class MethodNotImplementedError extends Error {
    constructor(...params) {
        super(...params);

        this.name = 'MethodNotImplementedError';
    }
}