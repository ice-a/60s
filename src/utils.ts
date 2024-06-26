import { customAlphabet } from 'nanoid'

const defaultTips = '我们不年轻,但永远年轻'

export const randomId = (size: number) => customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', size)

export function wrapperBaseRes(obj: object, message = defaultTips, status = 200) {
  return {
    status,
    message,
    data: obj || {},
  }
}

export function transferText(str: string, mode: 'u2a' | 'a2u') {
  if (mode === 'a2u') {
    return str.replace(/&#(\d+);/g, (_, $1) => String.fromCharCode(Number($1)))
  } else {
    return str.replace(/./, (_) => `&#${_.charCodeAt(0)};`)
  }
}
