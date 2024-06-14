export default error => {
  if (error.response && error.response.data) {
    let code
    let message
    if (error.response.data.error) {
      code = error.response.data.error.code
      message = error.response.data.error.message
    } else {
      code = error.response.data.code
      message = error.response.data.message
    }
    const e = new Error(message)
    e.code = code
    throw e
  } else if (error instanceof Error) {
    throw error
  } else {
    console.log(error)
    throw new Error('LLM Connector: Unknown error')
  }
}
