import {Telegraf} from 'telegraf'
import 'dotenv/config'
import { EventHandler } from './EventHandler/EventHandler'
import { BotConfig } from './types/BotConfig'

const botConfig: BotConfig = require("./botConfig.json")

const bot = new Telegraf(process.env.TOKEN)

bot.start(ctx => ctx.reply(botConfig.greet_message))
bot.help(ctx => ctx.reply(botConfig.commands_message))

bot.on('text', (ctx) => EventHandler.handle(ctx))


bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));