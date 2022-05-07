import { random } from './random'

const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'

/**
 * 生成随机字符串
 * 字符集为 “ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678”
 * @param len 字符串长度
 * @returns 字符串
 */
export function randomString (len: number): string {
  return Array(len)
    .fill(0)
    .map(() => chars.charAt(random(chars.length)))
    .join('')
}
