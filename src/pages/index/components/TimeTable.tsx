import { ApolloError, gql, useMutation, useQuery } from '@apollo/client'
import { CustomWrapper, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import { Fragment, useMemo } from 'react'

// import { PopupProps } from 'src/components/PopupContainer'
import { rpx2px } from 'src/utils/pixel'

// import { useIndexPage } from '../stores/useIndexPage'
// import { EditLesson } from './EditLesson'

const timeOfLessons = [
  '08:30',
  '09:15',
  '10:15',
  '11:00',
  '11:45',
  '13:30',
  '14:15',
  '15:00',
  '16:00',
  '16:45',
  '19:00',
  '19:40',
  '20:30',
  '21:10',
  '21:55',
]

interface Block {
  height: number
  disabled?: boolean
  data?: {
    lessonId: string
    name: string
    day: number
    weeks: number[]
    location: string
    start: number
    end: number
  }
}

// const userLessons = [
//   {
//     name: '新媒体用户研究',
//     day: 1,
//     weeks: [1],
//     location: '传播学院L7-302',
//     start: 1,
//     end: 2,
//   },
//   {
//     name: '定向越野俱乐部-01',
//     day: 2,
//     weeks: [1],
//     location: '元平游泳池东边大榕树下李季',
//     start: 1,
//     end: 2,
//   },
//   {
//     name: '毛泽东思想和中国特色社会主义理论体系概论（1）[62]',
//     day: 1,
//     weeks: [1],
//     location: '致理楼L3-104',
//     start: 3,
//     end: 4,
//   },
//   {
//     name: '',
//     day: 5,
//     weeks: [1],
//     location: '',
//     start: 5,
//     end: 8,
//   },
// ]

export function TimeTable () {
  // const { setPopup } = useIndexPage()

  const metaDataQuery = useQuery(gql`
    query LessonMetaData {
      lessonMetaData { startYear endYear semester }
    }
  `, { fetchPolicy: 'cache-and-network' })

  const { data } = useQuery(gql`
    query Lessons($startYear: Int!, $endYear: Int!, $semester: Int!) {
      whoAmI {
        ... on UserWithPrivateProps {
          lessons(first: 99, startYear: $startYear, endYear: $endYear, semester: $semester) {
            edges {
              node {
                id lessonId name educatorName circle description
                lessonItems { start end circle dayInWeek destination description }
              }
            }
          }
        }
      }
    }
  `, {
    variables: metaDataQuery.data?.lessonMetaData,
    fetchPolicy: 'cache-and-network',
    skip: !metaDataQuery.data,
  })

  const [tableBlocks, unlistedBlocks] = useMemo(() => {
    const matrix: Block[][] = Array.from({ length: 5 }, () => {
      return Array.from({ length: 14 }, () => ({ height: 1 }))
    })

    const array: Array<Record<string, any>> = []

    for (const edge of data?.whoAmI.lessons.edges ?? []) {
      if (edge.node.lessonItems && edge.node.lessonItems.length > 0) {
        for (const lessonItem of edge.node.lessonItems) {
          const lesson = {
            lessonId: edge.node.lessonId,
            name: edge.node.name,
            teacher: edge.node.educatorName,
            start: lessonItem.start,
            end: lessonItem.end,
            weeks: lessonItem.circle,
            day: lessonItem.dayInWeek,
            location: lessonItem.destination,
            description: lessonItem.description,
          }

          if (lesson.day >= 1 && lesson.day <= 5) {
            const disabled = false // todo: set true if course not this week
            matrix[lesson.day - 1][lesson.start - 1] = {
              height: lesson.end - lesson.start + 1,
              disabled,
              data: lesson,
            }
            for (let index = lesson.end; index > lesson.start; index--) {
              matrix[lesson.day - 1][index - 1] = { height: 0 }
            }
          } else {
            array.push(lesson)
          }
        }
      } else {
        array.push({
          lessonId: edge.node.lessonId,
          name: edge.node.name,
          teacher: edge.node.educatorName,
          weeks: edge.node.circle,
          description: edge.node.description,
        })
      }
    }

    return [matrix, array]
  }, [data])

  const [deleteLesson] = useMutation(gql`
  mutation DeleteLesson($lessonId: String!) {
    deleteLesson(lessonId: $lessonId)
  }
`, {
    refetchQueries: ['Lessons'],
    awaitRefetchQueries: true,
  })

  const onDeleteLesson = async (lessonId: string) => {
    const res = await Taro.showModal({ title: '提示', content: '确定要删除吗？' })
    if (res.confirm) {
      try {
        await deleteLesson({ variables: { lessonId } })
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

  return (
    <CustomWrapper>
      <View className='flex flex-col'>

        <View className='mt-12 flex flex-row'>

          <View className='mx-2 flex flex-col'>
            {timeOfLessons.map((time, index) => (
              <View className='h-50 flex flex-col justify-center items-center' key={index}>
                <Text className='text-14 font-bold text-blue-main'>{index + 1}</Text>
                <Text className='text-12 text-gray-70'>{time}</Text>
              </View>
            ))}
          </View>

          {tableBlocks.map((dayBlocks, dayIndex) => (
            <View className='flex flex-col flex-1' key={dayIndex}>
              {dayBlocks.map((block, blockIndex) => (
                <View
                  className='grid'
                  style={{ height: rpx2px(50) * block.height }}
                  key={blockIndex}>

                  {block.data && (
                    <View
                      className={clsx([
                        'm-2 p-2 flex flex-col rounded-lg  bg-white overflow-hidden',
                        'border-1 border-solid',
                        !block.disabled && 'border-[#5d7ab2] text-[#5d7ab2]',
                        block.disabled && 'bg-gray-ee border-gray-ae text-gray-ae',
                      ])}
                      onLongPress={
                        () => onDeleteLesson(block.data!.lessonId)
                        // async () => {
                        //   setPopup(() => ({ close, hide }: PopupProps) => (
                        //     <EditLesson close={close} hide={hide} lesson={block.data} />
                        // ))}
                      }>

                      <Text className='mx-auto mt-auto text-11 break-all line-clamp-3 font-semibold'>
                        {block.data.name}
                      </Text>

                      <Text className='mx-auto mb-auto text-10 break-all line-clamp-2'>
                        {block.data.location && `@${block.data.location}`}
                      </Text>

                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}

        </View>

        <View className='mt-30 mx-30 flex flex-row items-center'>
          <View className='w-0 h-22 border-2 border-solid border-blue-main rounded-md' />
          <Text className='ml-5 text-15 text-blue-main font-bold'>课表未列出的课程</Text>
        </View>

        <View className='mt-10 mx-30 grid grid-cols-2 gap-10'>
          {unlistedBlocks.map((block, i) => (
            <View
              className='p-8 flex flex-col bg-white border-1 border-solid border-[#6A95EC] rounded-md'
              onLongPress={() => onDeleteLesson(block.lessonId)}
              key={i}>
              {[
                { title: '课程名称', content: block.name },
                { title: '上课教师', content: block.teacher },
                { title: '课程描述', content: block.description },
              ].map(({ title, content }, j) => (
                <Fragment key={j}>
                  {content && (
                    <View className='flex flex-row'>
                      <View className='w-50 flex'>
                        <Text className='text-12 leading-20 text-gray-70'>{title}</Text>
                      </View>
                      <View className='flex-1 flex'>
                        <Text className='text-12 leading-20 text-[#6A95EC] line-clamp-3 break-all'>{content}</Text>
                      </View>
                    </View>
                  )}
                </Fragment>
              ))}

            </View>
          ))}
        </View>

      </View>
    </CustomWrapper>

  )
}
