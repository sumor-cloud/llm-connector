import call from '../utils/call.js'

export default async (key, url, model, messages) => {
  const response = await call(key, url, {
    model,
    messages
  })
  return response.choices[0].message
}
