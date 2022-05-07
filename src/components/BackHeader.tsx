import { Image, Text, View } from '@tarojs/components'
import Taro, { getCurrentPages } from '@tarojs/taro'
import clsx from 'clsx'

import { BackHeaderSVG } from 'src/assets/svg'

interface BackHeaderProps {
  title: string
  shadow?: boolean
}

export function BackHeader ({ title, shadow = true }: BackHeaderProps) {
  const pagesLength = getCurrentPages().length

  return (
    <View
      className={clsx([
        'glass absolute top-0 z-50 flex box-content h-menu-h w-full flex-row items-center px-12 pt-safe-t',
        shadow && 'shadow-gray-100',
      ])}>

      <Image
        className='h-16 w-16 p-12'
        src={BackHeaderSVG}
        onClick={pagesLength === 1
          ? () => Taro.redirectTo({ url: '/pages/index/index' })
          : () => Taro.navigateBack()} />

      <Text className='text-16 font-bold text-blue-main'>
        {title}
      </Text>

    </View>
  )
}
