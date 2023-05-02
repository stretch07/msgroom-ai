import MsgroomBot from "msgroom-bot"
import { BingChat } from "bing-chat"
const bot = new MsgroomBot
import {ChatGPTAPI} from "chatgpt"

const chatApi = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})
const bingApi = new BingChat({
  cookie: process.env.BING_COOKIE
})

bot.connect("chatgpt")
const cmse = bot.registerCommandSet("gpt ")
cmse.registerCommand("openai", async (...args) => {
  bot.send("One moment...")
  const res = await chatApi.sendMessage(args.join(" "))
  bot.send(res.text)
})
cmse.registerCommand("bing", async (...args) => {
  bot.send("One moment...")
  const res = await bingApi.sendMessage(args.join(" "))
  bot.send(res.text)
})