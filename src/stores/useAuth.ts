import { gql, useMutation, useQuery } from '@apollo/client'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'

import _ from 'src/utils/_'

export const { Provider: AuthProvider, useContainer: useAuth } = createContainer(() => {
  const once = useRef(false)
  const [authing, setAuthing] = useState(true)

  const { data, loading, error } = useQuery(gql`
    query WhoAmI {
      whoAmI {
        ... on UserWithPrivateProps {
          id userId credential { id }
        }
      }
    }
  `, {
    fetchPolicy: 'cache-and-network',
  })

  const [loginByCode] = useMutation(gql`
    mutation LoginByCode($code: String!) {
      login: loginByCode(code: $code, grantType: CURRICULUM) {
        token
      }
    }
  `, {
    update: (_cache, result) => {
      if (result.data) {
        Taro.setStorageSync('token', result.data.login.token)
      }
    },
    refetchQueries: ['WhoAmI'],
    awaitRefetchQueries: true,
  })

  const [register] = useMutation(gql`
    mutation Register($userId: String, $sign: String!, $code: String, $name: String!) {
      user: register(userId: $userId, sign: $sign, code: $code, name: $name, grantType: CURRICULUM) {
        id
      }
    }
  `)

  useEffect(() => {
    void (async () => {
      if (loading) return
      if (error && !once.current) {
        once.current = true
        console.error('WhoAmI: ', error)
        Taro.removeStorageSync('token')
        try {
          console.error('已清除token，尝试登录中...')
          await loginByCode({
            variables: { code: (await Taro.login()).code },
          })
          console.error('登录成功！')
        } catch (err) {
          try {
            console.error('LoginByCode', err)
            console.error('登录失败，自动注册中...')
            await register({
              variables: {
                sign: _.randomString(64),
                code: (await Taro.login()).code,
                name: '一起来玩小白板',
              },
            })
            console.error('注册成功！')
            await loginByCode({
              variables: { code: (await Taro.login()).code },
            })
            console.error('登录成功！')
          } catch {
            console.error('注册失败！')
          }
        }
      }
      setAuthing(false)
    })()
  }, [loginByCode, error, data, loading, register])

  return {
    // authened: false,
    authened: !!data?.whoAmI.credential,
    authing,
    whoAmI: data?.whoAmI,
  }
})
