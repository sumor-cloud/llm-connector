import call from '../utils/call.js'

export default async (key, url, model, messages) => {
  const response = await call(key, url, {
    model,
    input: {
      messages
    },
    parameters: {
      result_format: 'message'
    }
  })
  return response.output.choices[0].message
}
