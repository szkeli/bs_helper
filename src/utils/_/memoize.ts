import { hasOwn } from './hasOwn'

/**
 * 记忆函数
 * 用于优化一个值对应一个唯一解的纯函数
 * @param fn 输入的纯函数
 * @param resolver 用于将参数解析为 string，不填则默认使用 JSON.stringify
 * @returns 优化后的纯函数
 */
export function memoize<Args extends any[], Value> (
  fn: (...args: Args) => Value,
  resolver?: (...args: Args) => string,
): (...args: Args) => Value {
  const cache: Record<string, Value> = {}
  return (...args) => {
    const key = typeof resolver === 'function'
      ? resolver(...args)
      : JSON.stringify(args)
    if (!hasOwn(cache, key)) {
      cache[key] = fn(...args)
    }
    return cache[key]
  }
}
