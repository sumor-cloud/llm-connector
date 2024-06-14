import defineError from '@sumor/error'

const LLMError = defineError({
  code: {
    NOT_SUPPORT_LLM_TYPE: 'Not support LLM type {type}, please use one of [{types}]'
  },
  // languages: en, zh, es, ar, fr, ru, de, pt, ja, ko
  i18n: {
    en: {
      NOT_SUPPORT_LLM_TYPE: 'Not support LLM type {type}, please use one of [{types}]'
    },
    zh: {
      NOT_SUPPORT_LLM_TYPE: '不支持LLM类型{type}，请使用其中之一[{types}]'
    }
  }
})

export default LLMError
