import { Image, View } from '@tarojs/components'
import clsx from 'clsx'

import { EatingGIF, JumpingGIF } from 'src/assets/gif'

interface LoadingProps {
  className?: string
}

export function Loading ({ className = '' }: LoadingProps) {
  return (
    <Image
      className={clsx(['h-40 w-40', className])}
      src={EatingGIF}
      mode='aspectFit' />
  )
}

export function LoadingFull () {
  return (
    <View className='flex h-full w-full'>
      <View className='m-auto'>
        <Image
          className='h-72 w-81'
          src={JumpingGIF} />
      </View>
    </View>
  )
}
