import formatConfig from './config/index.js'
import call from './call/index.js'
import chatFormatter from './formatter/chat.js'
import imageFormatter from './formatter/image.js'

export default class Model {
  constructor(config) {
    this.config = formatConfig(config)
  }

  async chat(model, messages) {
    const formatter = chatFormatter(this.config.type)
    const response = await call(this.config.key, this.config.chat, formatter.input(model, messages))
    return formatter.output(response)
  }

  async image(model, prompt, size) {
    const formatter = imageFormatter(this.config.type)
    const response = await call(
      this.config.key,
      this.config.image,
      formatter.input(model, prompt, size)
    )
    return formatter.output(response)
  }
}
