import { PickerView, PickerViewColumn, Text, View } from '@tarojs/components'
import { Dispatch, SetStateAction } from 'react'

interface PickTimeProps {
  time: { day: number, start: number, end: number }
  setTime: Dispatch<SetStateAction<{ day: number, start: number, end: number }>>
  callback: () => void
}

export function PickTime ({ time, setTime, callback }: PickTimeProps) {
  return (
    <View
      className='m-auto flex w-290 flex-col items-center rounded-2xl bg-white px-20'
      onClick={e => e.stopPropagation()}>

      <View className='my-20'>
        <Text className='text-14'>选择节数</Text>
      </View>

      <PickerView
        className='h-150 w-full'
        indicatorClass='h-37'
        value={[time.day, time.start - 1, time.end - time.start]}
        onChange={e => setTime({
          day: e.detail.value[0],
          start: e.detail.value[1] + 1,
          end: time.start === e.detail.value[1] + 1
            ? e.detail.value[1] + 1 + e.detail.value[2]
            : e.detail.value[1] + 1,
        })}>
        <PickerViewColumn>
          {['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            .map((item, j) => (
              <View
                className='text-center text-16 leading-37'
                key={j}>
                {item}
              </View>
            ))}
        </PickerViewColumn>
        <PickerViewColumn>
          {Array.from({ length: 15 }, (_, i) => i + 1)
            .map((item, j) => (
              <View
                className='text-center text-16 leading-37'
                key={j}>
                {item}
              </View>
            ))}
        </PickerViewColumn>
        <PickerViewColumn>
          {Array.from({ length: 15 }, (_, i) => i + 1)
            .filter(v => v >= time.start)
            .map((item, j) => (
              <View
                className='text-center text-16 leading-37'
                key={j}>
                {item}
              </View>
            ))}
        </PickerViewColumn>
      </PickerView>

      <View
        className='mb-20 px-50 py-10'
        onClick={callback}>
        <Text className='text-18 text-blue-main'>完成</Text>
      </View>

    </View>
  )
}
