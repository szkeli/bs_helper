/**
 * 判断数字 num 是否在范围 [start, end] 中
 * @param num 数字
 * @param start 左侧
 * @param end 右侧
 * @returns 判断结果
 */
export function inRange (num: number, start: number, end: number): boolean {
  return num >= start && num <= end
}
