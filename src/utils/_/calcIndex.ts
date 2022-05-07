import { memoize } from './memoize'

/**
 * 从给定的字符串计算一个数字 (已记忆优化)
 * @param text 字符串
 * @returns 计算结果
 */
export const calcIndex = memoize((text: string) => {
  return text
    .split('')
    .map(char => char.charCodeAt(0))
    .reduce((result, value) => result + value, 0)
})
