import { Text, View } from '@tarojs/components'
import clsx from 'clsx'

interface SubtitleProps {
  text: string
  className?: string
}

export function Subtitle ({ text, className }: SubtitleProps) {
  return (
    <View className={clsx(['flex flex-row', className])}>
      <View className='ml-6 h-20 w-1 rounded-full border-2 border-solid border-blue-main' />
      <Text className='ml-6 leading-20 text-15 font-bold text-blue-main'>
        {text}
      </Text>
    </View>
  )
}
