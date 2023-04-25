import MsgroomBot from "msgroom-bot"
const bot = new MsgroomBot
import {ChatGPTAPI} from "chatgpt"

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})

bot.connect("chatgpt")
const cmse = bot.registerCommandSet("gpt!")
cmse.registerCommand("send", async (...args) => {
  bot.send("One moment...")
  const res = await api.sendMessage(args.join(" "))
  bot.send(res.text)
})