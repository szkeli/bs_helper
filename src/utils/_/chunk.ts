/**
 * 数组分块
 * @param array 数组
 * @param size 分块大小
 * @returns 分块后的数组
 */
export function chunk<T> (array: T[], size = 1): T[][] {
  if (array.length === 0 || size <= 0) {
    return []
  }

  let index = 0; let resIndex = 0
  const result = new Array(Math.ceil(array.length / size))

  while (index < array.length) {
    result[resIndex++] = array.slice(index, index += size)
  }

  return result
}
