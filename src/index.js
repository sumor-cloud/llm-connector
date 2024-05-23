import qianWen from './qianWen/index.js'
import openAI from './openAI/index.js'
import endpoint from './endpoint.js'
export default class Model {
  constructor(config) {
    this.type = config.type
    this.key = config.key
    this.endpoint = Object.assign({}, endpoint[this.type] || {}, config.endpoint)
  }

  async chat(model, messages) {
    switch (this.type) {
      case 'qianWen':
        return await qianWen.chat(this.key, this.endpoint.chat, model, messages)
      case 'openAI':
        return await openAI.chat(this.key, this.endpoint.chat, model, messages)
      default:
        throw new Error('Unsupported model type')
    }
  }
}
