import { Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import _ from 'src/utils/_'

interface TabButtonsProps {
  buttons: [string, string]
  barWidth?: number
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}

export function TabButtons ({ buttons, barWidth, current, setCurrent }: TabButtonsProps) {
  return (
    <View className='relative mx-auto flex flex-row justify-center'>
      {/* 文字 */}
      {buttons.map((title, index) => (
        <Text
          className={clsx([
            'w-96 text-center leading-menu-h',
            'transition-all duration-300 ease-in-out',
            current === index
              ? 'text-18 font-bold text-blue-main'
              : 'text-16 text-gray-3e',
          ])}
          onClick={() => setCurrent(index)}
          key={title}>
          {title}
        </Text>
      ))}
      {/* 蓝条轨道 */}
      <View
        className={clsx([
          'absolute bottom-2 flex w-96 flex-col',
          'transition-all duration-300 ease-in-out',
          ['left-0', 'left-96'][current],
        ])}>
        {/* 蓝条 */}
        <View
          className='mx-auto h-0 rounded-full border-2 border-solid border-blue-main'
          style={{ width: _.px(barWidth ?? 40) }} />
      </View>
    </View>
  )
}
