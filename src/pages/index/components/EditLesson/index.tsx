import { ApolloError, gql, useMutation } from '@apollo/client'
import { Image, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import { produce } from 'immer'
import { Fragment, useState } from 'react'

import { ArrowDownSVG } from 'src/assets/svg'
import { Subtitle } from 'src/components/Subtitle'

import { PickTime } from './PickTime'

interface EditLessonProps {
  close: () => void
  hide: boolean
  lesson?: Record<string, any>
}

export function EditLesson ({ close, hide, lesson }: EditLessonProps) {
  const isNewLesson = lesson === undefined

  const [tab, setTab] = useState<'default' | 'pick-time'>('default')
  const [name, setName] = useState(lesson?.name ?? '')
  const [location, setLocation] = useState(lesson?.location ?? '')
  const [teacher, setTeacher] = useState(lesson?.teacher ?? '')
  const [time, setTime] = useState({
    day: lesson?.day ?? 1,
    start: lesson?.start ?? 1,
    end: lesson?.end ?? 1,
  })
  const [weeks, setWeeks] = useState(Array.from(
    { length: 20 },
    (_, i) => lesson?.weeks.includes(i + 1) ?? false,
  ))

  const [deleteLesson] = useMutation(gql`
    mutation DeleteLesson($lessonId: String!) {
      deleteLesson(lessonId: $lessonId)
    }
  `, {
    refetchQueries: ['Lessons'],
    awaitRefetchQueries: true,
  })

  // const [addLesson] = useMutation(gql`
  //   mutation AddLesson(
  //     $destination: String
  //     $name: String!
  //     $circle: [Int!]!
  //     $description: String!
  //     $educatorName: String!
  //     $lessonId: String!
  //     $lessonItems: [LessonItemInput!]
  //     $startYear: Int!
  //     $endYear: Int!
  //     $semester: Int!
  //     $color: String
  //   ) {
  //     addLesson(
  //       destination: $destination
  //       name: $name
  //       circle: $circle
  //       description: $description
  //       educatorName: $educatorName
  //       lessonId: $lessonId
  //       lessonItems: $lessonItems
  //       startYear: $startYear
  //       endYear: $endYear
  //       semester: $semester
  //       color: $color
  //     ) {
  //       id
  //     }
  //   }
  // `, {
  //   refetchQueries: ['Lessons'],
  //   awaitRefetchQueries: true,
  // })

  // const [updateLesson] = useMutation(gql`
  //   mutation UpdateLesson($lessonId: String!) {

  //   }
  // `)

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
              { title: '课程名称', data: name, setData: setName },
              { title: '上课地点', data: location, setData: setLocation },
              { title: '任课老师', data: teacher, setData: setTeacher },
            ].map(({ title, data, setData }) => (
              <Fragment key={title}>
                <Subtitle text={title} />
                <Input
                  className='mt-8 mb-16 h-32 rounded-md border-1 border-solid border-gray-ee px-16 text-14'
                  placeholder={`请输入${title}`}
                  value={data}
                  onInput={e => setData(e.detail.value)} />
              </Fragment>
            ))}

            <Subtitle text='上课时间' />
            <View
              className='mt-8 mb-16 flex flex-row items-center justify-between rounded-five px-16 leading-32 border-1 border-solid border-gray-ee'
              onClick={() => setTab('pick-time')}>
              <Text className='text-13 text-gray-70'>
                {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][time.day]} 第{time.start}-{time.end}节
              </Text>
              <Image
                className='h-12 w-12'
                src={ArrowDownSVG} />
            </View>

            <View className='flex flex-row justify-between'>
              <Subtitle text='上课周数' />
              <View className='flex flex-row'>
                {[
                  {
                    title: '单周',
                    selected: weeks.every((w, i) => i % 2 === 0 ? w : !w),
                    onClick: () => setWeeks(weeks.map((_, i) => i % 2 === 0)),
                  },
                  {
                    title: '双周',
                    selected: weeks.every((w, i) => i % 2 === 0 ? !w : w),
                    onClick: () => setWeeks(weeks.map((_, i) => i % 2 !== 0)),
                  },
                  {
                    title: '全选',
                    selected: weeks.every(w => w),
                    onClick: () => setWeeks(weeks.map(() => true)),
                  },
                ].map(({ title, selected, onClick }) => (
                  <Text
                    className={clsx([
                      'w-36 h-24 text-center leading-24 text-13 rounded-md',
                      selected ? 'bg-[#86ABF0] text-white' : 'bg-white text-gray-3e',
                    ])}
                    onClick={!selected ? onClick : () => setWeeks(weeks.map(() => false))}
                    key={title}>
                    {title}
                  </Text>
                ))}
              </View>
            </View>

            <View className='mt-8 mb-16 flex flex-row flex-wrap'>
              {Array.from({ length: 20 }).map((_, index) => (
                <Text
                  className={clsx([
                    'm-2 w-36 h-24 text-center leading-24 text-13 rounded-md',
                    weeks[index] ? 'bg-[#86ABF0] text-white' : 'bg-white text-gray-3e',
                  ])}
                  onClick={() => setWeeks(produce(draft => {
                    draft[index] = !draft[index]
                  }))}
                  key={index}>{index + 1}</Text>
              ))}
            </View>

            <View className='flex flex-row justify-around'>
              <Text
                className='py-4 px-24 text-15 text-gray-3e bg-white rounded-full border-1 border-solid border-gray-3e'
                onClick={async () => {
                  if (!isNewLesson) {
                    const res = await Taro.showModal({ title: '提示', content: '确定要删除吗？' })
                    if (res.confirm) {
                      try {
                        await deleteLesson({ variables: { lessonId: lesson.lessonId } })
                        await Taro.showToast({ title: '删除成功', icon: 'success' })
                      } catch (err) {
                        if (err instanceof ApolloError) {
                          console.log(err.graphQLErrors)
                          await Taro.showModal({
                            title: '删除失败',
                            content: err.graphQLErrors[0].message,
                            showCancel: false,
                          })
                        }
                      }
                    }
                  }
                  close()
                }}>
                {isNewLesson ? '取消' : '删除' }
              </Text>
              <Text
                className='py-4 px-24 text-15 text-white bg-[#86ABF0] rounded-full border-1 border-solid border-[#86ABF0]'
                onClick={() => {}}>
                {isNewLesson ? '新建' : '确认' }
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
