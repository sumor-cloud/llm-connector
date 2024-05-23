import axios from 'axios'

export default async (key, url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
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
    } else {
      throw error
    }
  }
}
