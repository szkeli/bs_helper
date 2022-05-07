import { hasOwn } from './hasOwn'

/**
 * object 的深比较
 * @param objA 对象 A
 * @param objB 对象 B
 * @returns 二者是否相等
 */
export function deepEqual (objA: any, objB: any): boolean {
  if (objA === objB) {
    return true
  }

  if (objA === null || typeof objA !== 'object') {
    return false
  }

  if (objB === null || typeof objB !== 'object') {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i]

    if (!hasOwn(objB, key)) {
      return false
    }

    if (!deepEqual(objA[key], objB[key])) {
      return false
    }
  }

  return true
}
