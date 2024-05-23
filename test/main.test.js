import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import call from '../src/utils/call.js'
import Model from '../src/index.js'

let modelConfig = await fs.readFileSync('./test/config/model.json', 'utf-8')
modelConfig = JSON.parse(modelConfig)

describe('main', () => {
  it('call', async () => {
    const dummyUrl = 'http://localhost:17171'

    let error
    try {
      await call('123', dummyUrl, {})
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined()
    expect(error.code).toEqual('ECONNREFUSED')
  })
  // it('check config file', () => {
  //     expect(modelConfig.qianwen).toBeDefined()
  //     expect(modelConfig.openAI).toBeDefined()
  // })
  if (modelConfig.qianwen) {
    it(
      'qianWen chat',
      async () => {
        const model = new Model({
          type: 'qianWen',
          key: modelConfig.qianwen
        })
        expect(model).toBeDefined()

        const messages = [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: 'Hello'
          }
        ]
        const response = await model.chat('qwen-turbo', messages)
        expect(response).toBeDefined()
        expect(response.role).toEqual('assistant')
        console.log('response', response)

        let error
        try {
          await model.chat('qwen-turbo', [])
        } catch (e) {
          error = e
        }
        expect(error).toBeDefined()
        expect(error.code).toEqual('InvalidParameter')
      },
      20 * 1000
    )
  }
  if (modelConfig.openai) {
    it(
      'openAI chat',
      async () => {
        const model = new Model({
          type: 'openAI',
          key: modelConfig.openai
        })
        expect(model).toBeDefined()

        const messages = [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: 'Hello'
          }
        ]
        const response = await model.chat('gpt-3.5-turbo', messages)
        expect(response).toBeDefined()
        expect(response.role).toEqual('assistant')
        console.log('response', response)
      },
      20 * 1000
    )
  }
  it('not supported model type', async () => {
    const model = new Model({
      type: 'others',
      key: '123'
    })
    expect(model).toBeDefined()

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: 'Hello'
      }
    ]
    let error
    try {
      await model.chat('model', messages)
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined()
    console.log(error.message)
  })
})
