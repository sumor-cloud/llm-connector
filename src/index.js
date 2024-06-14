import formatConfig from './config/index.js'
import call from './call/index.js'
import chatFormatter from './formatter/chat.js'

export default class Model {
  constructor(config) {
    this.config = formatConfig(config)
  }

  async chat(model, messages) {
    const formatter = chatFormatter(this.config.type)
    const response = await call(this.config.key, this.config.chat, formatter.input(model, messages))
    return formatter.output(response)
  }
}
