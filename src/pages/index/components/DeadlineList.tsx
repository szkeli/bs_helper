import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Fragment, useMemo } from 'react'

import { DeleteSVG } from 'src/assets/svg'
import { Subtitle } from 'src/components/Subtitle'
import { useGlobal } from 'src/stores/useGlobal'

import 'src/utils/date'

const buttons: SlideViewProps.Button[] = [
  {
    src: DeleteSVG,
  },
]

export function DeadlineList () {
  const { deadlines } = useGlobal()

  const sortedDeadlines = useMemo(() => {
    return deadlines
      .sort((x, y) => new Date(x.endTime).getTime() - new Date(y.endTime).getTime())
  }, [deadlines])

  return (
    <View className='flex flex-col'>

      {[
        {
          subtitle: '今日计划',
          array: sortedDeadlines.filter(d => new Date(d.endTime).cmpYMD(new Date()) === 0),
        },
        {
          subtitle: '未来计划',
          array: sortedDeadlines.filter(d => new Date(d.endTime).cmpYMD(new Date()) === 1),
        },
        {
          subtitle: '过期计划',
          array: sortedDeadlines.filter(d => new Date(d.endTime).cmpYMD(new Date()) === -1),
        },
      ].map(({ subtitle, array }, i) => (
        <Fragment key={i}>
          <Subtitle className='mx-30 mt-20' text={subtitle} />
          <View className='mt-10 flex flex-col'>
            {array.map(({ title, subject, endTime }, j) => (
              <Deadline
                title={title}
                subject={subject}
                endTime={endTime}
                key={j} />
            ))}
          </View>
        </Fragment>
      ))}

    </View>
  )
}

interface DeadlineProps {
  title: string
  subject: string
  endTime: string
}

function Deadline ({ title, subject, endTime }: DeadlineProps) {
  const { deadlines, setDeadlines } = useGlobal()

  const onTap: SlideViewProps.onButtontap = async e => {
    if (e.detail.index === 0) {
      // 删除
      const res = await Taro.showModal({ title: '提示', content: '确定要删除吗？' })
      if (res.confirm) {
        setDeadlines(deadlines.filter(d => !(d.title === title && d.subject === subject)))
      }
    }
  }

  const time = new Date(endTime)
  const md = `${time.getMonth() + 1}/${time.getDate()}`

  const hours = `${time.getHours()}`.padStart(2, '0')
  const minutes = `${time.getMinutes()}`.padStart(2, '0')
  const hm = `${hours}:${minutes}`

  return (
    <View className='relative mt-10'>
      <View className='absolute left-40 top-10 flex flex-col'>
        <Text className='text-13 text-gray-ae'>{md}</Text>
        <Text className='text-13 text-gray-ae'>{hm}</Text>
      </View>
      <mp-slideview buttons={buttons} onButtontap={onTap} icon>
        <View className='grid'>
          <View className='ml-auto mr-18 w-255 flex flex-col p-12 bg-white rounded-md'>
            <Text className='text-14 text-gray-3e'>{title}</Text>
            <Text className='text-12 text-gray-ae'>{subject}</Text>
          </View>
        </View>
      </mp-slideview>
    </View>
  )
}
