import { PickerView, PickerViewColumn, Text, View } from '@tarojs/components'
import { Dispatch, SetStateAction } from 'react'

import 'src/utils/date'

interface PickTimeProps {
  time: { year: number, month: number, date: number, hours: number, minutes: number }
  setTime: Dispatch<SetStateAction<{ year: number, month: number, date: number, hours: number, minutes: number }>>
  callback: () => void
}

export function PickTime ({ time, setTime, callback }: PickTimeProps) {
  return (
    <View
      className='m-auto flex w-320 flex-col items-center rounded-2xl bg-white px-20'
      onClick={e => e.stopPropagation()}>

      <View className='my-20'>
        <Text className='text-14'>选择节数</Text>
      </View>

      <PickerView
        className='h-150 w-full'
        indicatorClass='h-37'
        value={[time.year - 1970, time.month - 1, time.date - 1, time.hours, time.minutes]}
        onChange={e => setTime({
          year: e.detail.value[0] + 1970,
          month: e.detail.value[1] + 1,
          date: e.detail.value[2] + 1,
          hours: e.detail.value[3],
          minutes: e.detail.value[4],
        })}>
        {[
          Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => `${i + 1970}年`),
          Array.from({ length: 12 }, (_, i) => `${i + 1}月`),
          Array.from({ length: new Date().year(time.year).month(time.month - 1).getMonthLen() }, (_, i) => `${i + 1}日`),
          Array.from({ length: 24 }, (_, i) => `${i}时`),
          Array.from({ length: 60 }, (_, i) => `${i}分`),
        ].map((array, i) => (
          <PickerViewColumn key={i}>
            {array.map((item, j) => (
              <View
                className='text-center text-16 leading-37'
                key={j}>
                {item}
              </View>
            ))}
          </PickerViewColumn>
        ))}
      </PickerView>

      <View
        className='mb-20 px-50 py-10'
        onClick={callback}>
        <Text className='text-18 text-blue-main'>完成</Text>
      </View>

    </View>
  )
}
