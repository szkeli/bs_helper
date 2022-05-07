/**
 * hasOwnProperty 的安全版
 * @param obj 对象
 * @param v 属性名
 * @returns 对象是否具有该属性
 */
export function hasOwn (obj: object, v: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, v)
}
