import Taro from '@tarojs/taro'

export const systemInfo = Taro.getSystemInfoSync()
export const menuRect = Taro.getMenuButtonBoundingClientRect()
export const screenHeight = systemInfo.screenHeight
export const statusBarHeight = systemInfo.statusBarHeight!
export const menuBarHeight =
  2 * (menuRect.top - statusBarHeight) + menuRect.height
export const headerHeight = statusBarHeight + menuBarHeight

export const paddings: Record<string, string> = {
  '--safe-t': `${statusBarHeight}px`,
  '--safe-b': 'env(safe-area-inset-bottom)',
  '--menu-h': `${menuBarHeight}px`,
  '--header-h': `${headerHeight}px`,
}
