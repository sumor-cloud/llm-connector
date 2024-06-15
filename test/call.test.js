import { describe, expect, it } from '@jest/globals'
import { load } from '@sumor/config'

import Model from '../src/index.js'
import formatOptions from '../src/call/formatOptions.js'
import processError from '../src/call/processError.js'

const modelConfig = await load('./test/config', 'model')

describe('main', () => {
  it('format options', () => {
    const result = formatOptions('123')
    expect(result).toEqual({
      headers: {
        Authorization: 'Bearer 123',
        'Content-Type': 'application/json'
      }
    })
  })
  it('process error', () => {
    let error1
    try {
      processError({ response: { data: { error: { code: '123', message: 'message' } } } })
    } catch (e) {
      error1 = e
    }
    expect(error1).toBeDefined()
    expect(error1.code).toEqual('123')
    expect(error1.message).toEqual('message')

    let error2
    try {
      processError({ response: { data: { code: '123', message: 'message' } } })
    } catch (e) {
      error2 = e
    }
    expect(error2).toBeDefined()
    expect(error2.code).toEqual('123')
    expect(error2.message).toEqual('message')

    let error3
    try {
      processError({ response: {} })
    } catch (e) {
      error3 = e
    }
    expect(error3).toBeDefined()
    expect(error3.message).toEqual('LLM Connector: Unknown error')

    let error4
    try {
      processError(new Error('error'))
    } catch (e) {
      error4 = e
    }
    expect(error4).toBeDefined()
    expect(error4.message).toEqual('error')
  })
  it(
    'call',
    async () => {
      const model = new Model(modelConfig)
      expect(model).toBeDefined()
      expect(model.chat).toBeDefined()

      const messages = [
        {
          role: 'user',
          content: 'Please say only two characters {OK}'
        }
      ]

      const response = await model.chat(modelConfig.chatModel, messages)
      expect(response).toBeDefined()
      expect(response.role).toEqual('assistant')
      expect(response.content).toContain('OK')
      console.log('chat response', response)
    },
    20 * 1000
  )
  it(
    'image',
    async () => {
      const model = new Model(modelConfig)
      expect(model).toBeDefined()
      expect(model.image).toBeDefined()
      if (modelConfig.imageModel) {
        const prompt = 'an chinese dragon in the sky, with a rainbow in the background'
        const size = '256x256'
        const response = await model.image(modelConfig.imageModel, prompt, size)
        expect(response).toBeDefined()
        expect(response).toContain('http')
        console.log('image response', response)
      } else {
        expect(1).toEqual(1)
      }
    },
    20 * 1000
  )
})
