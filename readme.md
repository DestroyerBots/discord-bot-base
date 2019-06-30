# Discord Bot Base

This is a base discord bot that can be easily adapted and new commands added.

To install:
* First clone this repository.
* Once successfully cloned, move into the repository `cd discord-bot-base`, install the required packages with `npm i`.
* Change the token in `config.example.mjs` for your own token, acquired from the [Discord Developer Portal](https://discordapp.com/developers/applications/)
* Run `npm start`.

## DiscordBot
The DiscordBot class is the basis for all interactions with discord. There are default handlers in place, but users may wish to override those handlers with their own. This can be done by passing an `opts` object to the constructor of the `DiscordBot` object.

```js
import DiscordBot from './DiscordBot';
import {default as config } from './config';

const opts = {
  handlers: {
    readyHandler: () => {
      console.log('bot ready');
    },
    messageHandler: () => {
      console.log('message received');
    }
  }
}

new DiscordBot(config.AUTH_TOKEN, opts);
```

## Commands

In order to allow commands to be instantiated dynamically, all commands inherit from `BaseCommand`. To this end, a command can be created quickly and easily as shown in `commands/EchoMessageCommand.mjs`. All commands created must override the `run` method of the parent `BaseCommand` class.