import MsgroomBot from "msgroom-bot"
import { BingChat } from "bing-chat"
import { ChatGPTAPI } from "chatgpt"
import { Bard } from "googlebard"
const bot = new MsgroomBot

let chatApi
if (process.env.OPENAI_API_KEY) {
  chatApi = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })
}
let bingApi
if (process.env.BING_COOKIE) {
  bingApi = new BingChat({
    cookie: process.env.BING_COOKIE
  })
}
let bardApi
if (process.env.BARD_COOKIE) {
  bardApi = new Bard(process.env.BARD_COOKIE)
}

bot.connect("ai")
const cmse = bot.registerCommandSet("ai ") //space is required yes
cmse.registerCommand("openai", async (...args) => {
  bot.changeNick("ai [thinking]")
  const res = await chatApi.sendMessage(args.join(" "))
  bot.changeNick("ai")
  bot.send(res.text)
})
cmse.registerCommand("bing", async (...args) => {
  bot.changeNick("ai [thinking]")
  const res = await bingApi.sendMessage(args.join(" "))
  bot.changeNick("ai")
  bot.send(res.text)
})
cmse.registerCommand("bard", async (...args) => {
  bot.changeNick("ai [thinking]")
  const res = await bardApi.ask(args.join(" "))
  bot.changeNick("ai")
  bot.send(res.text)
})