/**
 * 比较时间字符串或数字
 * @param ts1 时间1
 * @param ts2 时间2
 * @returns 是否相等
 */
export function cmpTime (ts1: string | number = 0, ts2: string | number = 0) {
  const date1 = new Date(ts1)
  const date2 = new Date(ts2)
  return date1.getTime() > date2.getTime()
}
