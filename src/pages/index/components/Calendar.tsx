import { CustomWrapper, Image, Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { ArrowSVG } from 'src/assets/svg'
import _ from 'src/utils/_'
import { rpx2px } from 'src/utils/pixel'

import 'src/utils/date'

interface Block {
  key: string
  inCurrentMonth: boolean
  isToday: boolean
  date: number
}

export function Calender () {
  const [folded, setFolded] = useState(true)

  const now = useMemo(() => new Date(), [])
  const [month, setMonth] = useState(now)
  const prevMonth = month.prevMonth()
  const nextMonth = month.nextMonth()

  const daysOfWeek = useMemo(() => {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  }, [])

  const weeks = useMemo(() => {
    const prefixLen = month.date(1).getDay() // 上一个月剩下的日子长度
    const suffixLen = 6 - month.date(month.getMonthLen()).getDay() // 下一个月开头的日子长度
    const array: Block[] = []

    for (let i = 1 + prevMonth.getMonthLen() - prefixLen; i <= prevMonth.getMonthLen(); i++) {
      array.push({
        key: `${prevMonth.getMonth()}-${i}`,
        inCurrentMonth: false,
        isToday: false,
        date: i,
      })
    }

    for (let i = 1; i <= month.getMonthLen(); i++) {
      array.push({
        key: `${month.getMonth()}-${i}`,
        inCurrentMonth: true,
        isToday: now === month && i === now.getDate(),
        date: i,
      })
    }

    for (let i = 1; i <= suffixLen; i++) {
      array.push({
        key: `${nextMonth.getMonth()}-${i}`,
        inCurrentMonth: false,
        isToday: false,
        date: i,
      })
    }

    return _.chunk(array, 7).map((blocks, key) => ({ blocks, key }))
  }, [month, nextMonth, now, prevMonth])

  return (
    <CustomWrapper>
      <View
        className={clsx([
          'w-full flex flex-col',
          'transition-all duration-300 ease-in-out',
        ])}
        style={{ height: rpx2px(32) * (1 + (folded ? 1 : weeks.length)) }}>

        <View className={clsx([
          'flex flex-row justify-center items-center overflow-hidden',
          'transition-all duration-300 ease-in-out',
          folded ? 'h-0 opacity-0' : 'h-32 opacity-1',
        ])}>

          <Text
            className='p-10 text-12 text-blue-main'
            onClick={() => setMonth(month.prevMonth())}>
            {'<'}
          </Text>

          <Text className='text-18 text-blue-main font-bold'>
            {month.getFullYear()}年{month.getMonth() + 1}月
          </Text>

          <Text
            className='p-10 text-12 text-blue-main'
            onClick={() => setMonth(month.nextMonth())}>
            {'>'}
          </Text>

        </View>

        <View className='mx-12 flex flex-row'>
          {daysOfWeek.map((day, dayIndex) => (
            <View
              className={clsx([
                'grid h-32 overflow-hidden',
                'transition-all duration-300 ease-in-out',
                (folded && !_.inRange(dayIndex, 1, 5))
                  ? 'flex-[0] opacity-0'
                  : 'flex-1 opacity-1',
              ])}
              key={day}>
              <Text className='m-auto text-14 text-blue-main font-bold'>{day}</Text>
            </View>
          ))}
        </View>

        {weeks.map(week => (
          <View
            className={clsx([
              'mx-12 flex flex-row overflow-hidden',
              'transition-all duration-300 ease-in-out',
              (folded && !week.blocks.find(b => b.isToday))
                ? 'h-0 opacity-0'
                : 'h-32 opacity-1',
            ])}
            key={week.key}>
            {week.blocks.map((block, blockIndex) => (
              <View
                className={clsx([
                  'grid h-32 overflow-hidden',
                  'transition-all duration-300 ease-in-out',
                  (folded && !_.inRange(blockIndex, 1, 5))
                    ? 'flex-[0] opacity-0'
                    : 'flex-1 opacity-1',
                ])}
                key={block.key}>
                <Text
                  className={clsx([
                    'm-auto',
                    block.isToday
                      ? 'text-18 text-[#6A95EC] font-bold'
                      : [
                          'text-14',
                          block.inCurrentMonth ? 'text-gray-9c' : 'text-[#E1E1E1]',
                        ],
                  ])}
                >{block.date}</Text>
              </View>
            ))}
          </View>
        ))}

      </View>

      <View
        className='grid'
        onClick={() => {
          // setFolded(!folded)
          // if (month !== now) setMonth(now)
        }}>
        <View className='h-8' />
        {/* <Image
          className={clsx([
            'm-auto w-32 h-24 flex',
            'transition-all duration-300 ease-in-out',
            folded ? 'scale-y-[1]' : 'scale-y-[-1]',
          ])}
          src={ArrowSVG}
          mode='aspectFill' /> */}
      </View>
    </CustomWrapper>
  )
}
