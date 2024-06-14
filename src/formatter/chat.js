export default type => {
  let result = {}
  switch (type) {
    case 'qianWen':
      result = {
        input(model, messages) {
          return {
            model,
            input: {
              messages
            },
            parameters: {
              result_format: 'message'
            }
          }
        },
        output(response) {
          return response.output.choices[0].message
        }
      }
      break
    case 'openAI':
      result = {
        input(model, messages) {
          return {
            model,
            messages
          }
        },
        output(response) {
          return response.choices[0].message
        }
      }
      break
  }
  return result
}
