export interface ImageMogr2Args {
  /** 原地址 */
  src: string
  /** 格式 */
  format?: 'webp' | 'png' | 'jpg'
  /** 缩略图 */
  thumbnail?: string
}

/**
 * 计算图片地址
 * @returns 地址
 */
export function imageMogr2 ({ src, format, thumbnail }: ImageMogr2Args) {
  let result = `${src}?imageMogr2`
  if (format) result += `/format/${format}`
  if (thumbnail) result += `/thumbnail/${thumbnail}`
  return result
}
