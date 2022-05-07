/**
 * 生成 [0, max) 的随机数
 * @param max 最大值，必须大于 0
 * @returns 随机数
 */
export function random (max: number): number {
  if (max <= 0) return 0
  return Math.floor(Math.random() * max)
}
