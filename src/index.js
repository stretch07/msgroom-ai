import { msgroomBot } from "msgroom-bot"
import { apis } from "./providerApis.js"
import { config } from "./config.js"
const bot = new msgroomBot

async function ai(service, msg, think = config.THINK) {
  let result
  if (think) {
    bot.send("Please wait...")
  }
  /*try {*/
    switch (service) {
      case "chatgpt":
        result = await apis.chatgpt.sendMessage(msg)
        break
      case "bing":
        result = await apis.bing.sendMessage(msg)
        break
      case "bard":
        result = await apis.bard.ask(msg)
        break
      default:
        bot.send("No provider found")
        break
    }
  /*} catch (e) {
    bot.send(`We ran into a problem, try again later.`)
  }*/
}

bot.connect("[BOT] ai (ai help)")

const cmse = bot.registerCommandSet("ai ") //space is required yes

cmse.registerCommand("openai", async (...args) => {
  ai("chatgpt", args.join(" "))
})
cmse.registerCommand("chatgpt", async (...args) => {
  ai("chatgpt", args.join(" "))
})
cmse.registerCommand("bing", async (...args) => {
  ai("bing", args.join(" "))
})
cmse.registerCommand("bard", async (...args) => {
  ai("bard", args.join(" "))
})
cmse.registerCommand("help", () => {
  bot.send(`Current commands:
  * ai openai [prompt]
  * ai bing [prompt]
  * ai bard [prompt]
  `)
})