import axios from 'axios'
import formatOptions from './formatOptions.js'
import processError from './processError.js'

export default async (key, url, data) => {
  try {
    const response = await axios({
      proxy: false,
      method: 'post',
      url,
      data,
      ...formatOptions(key)
    })

    return response.data
  } catch (error) {
    processError(error)
  }
}
