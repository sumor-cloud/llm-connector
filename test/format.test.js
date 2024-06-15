import { describe, expect, it } from '@jest/globals'

import formatConfig from '../src/config/index.js'
import chatFormatter from '../src/formatter/chat.js'
import imageFormatter from '../src/formatter/image.js'

describe('main', () => {
  it('formatConfig', () => {
    let error1
    try {
      formatConfig({
        type: 'other',
        key: '123'
      })
    } catch (e) {
      error1 = e
    }
    expect(error1).toBeDefined()
    expect(error1.code).toEqual('NOT_SUPPORT_LLM_TYPE')
    const result1 = formatConfig({
      type: 'openAI',
      key: '111',
      endPoint: 'https://api2.openai.com',
      chat: '/v2/chat/completions'
    })
    expect(result1.type).toEqual('openAI')
    expect(result1.key).toEqual('111')
    expect(result1.chat).toEqual('https://api2.openai.com/v2/chat/completions')
    const result2 = formatConfig({
      type: 'qianWen',
      key: '123'
    })
    expect(result2.type).toEqual('qianWen')
    expect(result2.key).toEqual('123')
    expect(result2.chat).toEqual(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
    )
  })
  it('format chat', () => {
    const openAI = chatFormatter('openAI')
    const qianWen = chatFormatter('qianWen')
    const openAIInput = openAI.input('gpt-3.5-turbo', ['hello'])
    expect(openAIInput).toEqual({
      model: 'gpt-3.5-turbo',
      messages: ['hello']
    })
    const qianWenInput = qianWen.input('gpt-3.5-turbo', ['hello'])
    expect(qianWenInput).toEqual({
      model: 'gpt-3.5-turbo',
      input: {
        messages: ['hello']
      },
      parameters: {
        result_format: 'message'
      }
    })
    const openAIOutput = openAI.output({
      choices: [
        {
          message: 'hi'
        }
      ]
    })
    expect(openAIOutput).toEqual('hi')
    const qianWenOutput = qianWen.output({
      output: {
        choices: [
          {
            message: 'hi'
          }
        ]
      }
    })
    expect(qianWenOutput).toEqual('hi')
  })
  it('format image', () => {
    const openAI = imageFormatter('openAI')

    const openAIInput = openAI.input('dall-e-2', 'hello')
    expect(openAIInput).toEqual({
      model: 'dall-e-2',
      prompt: 'hello',
      n: 1,
      size: '1024x1024'
    })

    const openAIOutput = openAI.output({
      data: [
        {
          url: 'https://example.com'
        }
      ]
    })
    expect(openAIOutput).toEqual('https://example.com')
  })
})
