import {Telegraf} from 'telegraf'
import 'dotenv/config'
import { EventHandler } from './EventHandler/EventHandler'


const bot = new Telegraf(process.env.TOKEN)

bot.on('text', (ctx) => EventHandler.handle(ctx))

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));