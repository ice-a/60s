import { customAlphabet } from 'nanoid'
import axios from 'axios'

let defaultTips = 'data is nothing'




export const randomId = (size: number) => customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', size)


export async function wrapperBaseRes(obj: object, message?: string, status = 200) {
  if (!message) {
    // 如果没有传递 message，则等待 defaultTips 更新
    await axios.get('https://v1.hitokoto.cn')
      .then(({ data }) => {
        defaultTips = data.hitokoto;
      })
      .catch((error) => {
        console.error('Failed to fetch hitokoto:', error);
      });
    message = defaultTips;
  }
  return {
    status,
    message,
    data: obj || {},
  };
}

export function transferText(str: string, mode: 'u2a' | 'a2u') {
  if (mode === 'a2u') {
    return str.replace(/&#(\d+);/g, (_, $1) => String.fromCharCode(Number($1)))
  }
  return str.replace(/./, (_) => `&#${_.charCodeAt(0)};`)
}
