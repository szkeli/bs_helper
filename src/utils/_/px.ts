import { systemInfo } from 'src/constants/paddings'

/**
 * 将 rpx 转换为 px
 * @param rpx rpx
 * @returns px
 */
export function px (rpx: number) {
  return (rpx / 375) * systemInfo.windowWidth
}
