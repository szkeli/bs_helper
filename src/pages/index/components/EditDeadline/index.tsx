import { Image, Input, Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

import { ArrowDownSVG } from 'src/assets/svg'
import { Subtitle } from 'src/components/Subtitle'

import { PickTime } from './PickTime'

interface EditDeadlineProps {
  close: () => void
  hide: boolean
}

export function EditDeadline ({ close, hide }: EditDeadlineProps) {
  const [tab, setTab] = useState<'default' | 'pick-time'>('default')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const now = new Date()
  const [time, setTime] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
  })

  return (
    <View
      className='fixed top-0 bottom-0 left-0 right-0 grid'
      onClick={close}>
      <View
        className={clsx([
          'grid transition-all duration-300 ease-in-out',
          ['appear', hide && 'disappear'],
        ])}
        onClick={e => e.stopPropagation()}>

        {tab === 'default' && (
          <View className='mx-42 my-auto flex flex-col rounded-xl bg-white p-24'>

            {[
              { title: '标题', data: name, setData: setName },
              { title: '备注', data: description, setData: setDescription },
            ].map(({ title, data, setData }) => (
              <Fragment key={title}>
                <Subtitle text={title} />
                <Input
                  className='mt-8 mb-16 h-32 rounded-md border-1 border-solid border-gray-ee px-16 text-14'
                  placeholder={`在此输入${title}`}
                  value={data}
                  onInput={e => setData(e.detail.value)} />
              </Fragment>
            ))}

            <Subtitle text='日期与时间' />
            <View
              className='mt-8 mb-16 flex flex-row items-center justify-between rounded-five px-16 leading-32 border-1 border-solid border-gray-ee'
              onClick={() => setTab('pick-time')}>
              <Text className='text-13 text-gray-70'>
                {time.year}-{time.month}-{time.date} {time.hours}:{time.minutes}
              </Text>
              <Image
                className='h-12 w-12'
                src={ArrowDownSVG} />
            </View>

            <View className='flex flex-row justify-around'>
              <Text
                className='py-4 px-24 text-15 text-gray-3e bg-white rounded-full border-1 border-solid border-gray-3e'
                onClick={() => {}}>
                删除
              </Text>
              <Text
                className='py-4 px-24 text-15 text-white bg-[#86ABF0] rounded-full border-1 border-solid border-[#86ABF0]'
                onClick={() => {}}>
                确认
              </Text>
            </View>

          </View>
        )}

        {tab === 'pick-time' && (
          <PickTime
            time={time}
            setTime={setTime}
            callback={() => setTab('default')} />
        )}

      </View>
    </View>
  )
}
