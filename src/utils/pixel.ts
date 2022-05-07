import { systemInfo } from 'src/constants/paddings'

export function rpx2px (rpx: number) {
  return (rpx / 375) * systemInfo.windowWidth
}
