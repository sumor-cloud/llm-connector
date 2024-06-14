# llm-connector

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/llm-connector)

This is a llm connector for multiple cloud providers.

[![CI](https://github.com/sumor-cloud/llm-connector/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/llm-connector/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/llm-connector/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/llm-connector/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/llm-connector/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/llm-connector/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/llm-connector/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/llm-connector/actions/workflows/audit.yml)

## Supported LLM Providers

### openAI

OpenAI is a research lab consisting of the for-profit OpenAI LP and the non-profit OpenAI Inc. The company aims to ensure that artificial general intelligence benefits all of humanity.

- gpt-3.5-turbo
- gpt-4o

### qianWen

Alibaba Qianwen is a cloud-based AI service that provides a variety of AI capabilities, including natural language processing, computer vision, and machine learning.

- qwen-turbo
- qwen-plus
- qwen-max
- qwen-max-longcontext

## Installation

```bash
npm i @sumor/llm-connector --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 18.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

### Chat

```javascript
import Model from '@sumor/llm-connector'

const model = new Model({
  type: 'openAI', // or 'qianWen'
  key: '123'
})

const response = await model.chat('gpt-3.5-turbo', [
  {
    role: 'system',
    content: 'You are a helpful assistant.'
  },
  {
    role: 'user',
    content: 'Hello'
  }
])

console.log(response)
// Output: { role: 'assistant', content: 'Hello, how can I help you today?' }
```

### Custom API Endpoint URL

```javascript
import Model from '@sumor/llm-connector'

const model = new Model({
  type: 'openAI',
  key: '123',
  endpoint: 'https://api.openai.com',
  chat: '/v1/chat'
})
```
