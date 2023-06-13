import { BingChat } from "bing-chat"
import { ChatGPTAPI } from "chatgpt"
import { Bard } from "googlebard"

let chatgpt
if (process.env.OPENAI_API_KEY) {
  chatgpt = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })
}
let bing
if (process.env.BING_COOKIE) {
  bing = new BingChat({
    cookie: process.env.BING_COOKIE
  })
}
let bard
if (process.env.BARD_COOKIE) {
  bard = new Bard(process.env.BARD_COOKIE)
}

export const apis = {
    chatgpt,
    bing,
    bard
}