import { ApolloError, gql, useApolloClient, useMutation } from '@apollo/client'
import Taro from '@tarojs/taro'
import { useCallback } from 'react'

import { axios } from 'src/utils/axios'

export function useImportLessons () {
  const client = useApolloClient()

  const [addLesson] = useMutation(gql`
    mutation AddLesson(
      $destination: String
      $name: String!
      $circle: [Int!]!
      $description: String!
      $educatorName: String!
      $lessonId: String!
      $lessonItems: [LessonItemInput!]
      $startYear: Int!
      $endYear: Int!
      $semester: Int!
      $color: String
    ) {
      addLesson(
        destination: $destination
        name: $name
        circle: $circle
        description: $description
        educatorName: $educatorName
        lessonId: $lessonId
        lessonItems: $lessonItems
        startYear: $startYear
        endYear: $endYear
        semester: $semester
        color: $color
      ) {
        id
      }
    }
  `)

  return useCallback(async (account: { username: string, password: string }) => {
    await Taro.showLoading({ title: '导入课程中' })

    try {
      const lessons = await szuLessons(account.username, account.password)
      await Promise.allSettled(lessons.map(l => addLesson({ variables: l })))
      await client.refetchQueries({ include: ['Lessons'] })
      Taro.hideLoading()
      void Taro.showToast({ title: '导入成功', icon: 'success' })
    } catch (err) {
      Taro.hideLoading()
      if (err instanceof ApolloError) {
        console.log(err.graphQLErrors)
        void Taro.showModal({
          title: '导入失败',
          content: err.graphQLErrors[0].message,
          showCancel: false,
        })
      } else {
        void Taro.showToast({ title: '导入失败', icon: 'error' })
      }
    }
  }, [addLesson, client])
}

async function szuLessons (username: string, password: string) {
  const cookieMap = await axios({
    url: `${process.env.SZU_URL}/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { username, password },
  }).then(res => res.data)

  const data = await axios({
    url: `${process.env.SZU_URL}/lessons`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { cookieMap, studentId: username },
  }).then(res => res.data)

  return data
}
