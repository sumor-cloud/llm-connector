export default provider => {
  let result = {}
  switch (provider) {
    case 'openAI':
      result = {
        input(model, prompt, size) {
          return {
            model,
            prompt,
            n: 1,
            size: size || '1024x1024'
          }
        },
        output(response) {
          return response.data[0].url
        }
      }
      break
  }
  return result
}
