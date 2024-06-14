import LLMError from '../LLMError.js'
import defaultList from './list.js'
export default config => {
  const type = config.type
  const key = config.key

  // verify type is valid
  const possibleTypes = ['qianWen', 'openAI']
  if (!possibleTypes.includes(type)) {
    throw new LLMError('NOT_SUPPORT_LLM_TYPE', { type, types: possibleTypes.join(', ') })
  }

  const currentDefaultList = defaultList[type]
  const endpoint = config.endPoint || currentDefaultList.endPoint
  const chat = config.chat || currentDefaultList.chat

  return {
    type,
    key,
    chat: `${endpoint}${chat}`
  }
}
