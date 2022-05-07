import { ApolloError, gql, useMutation } from '@apollo/client'
import { Image, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useCallback, useState } from 'react'

import { SwitchLicensePNG, SwitchUnlicensePNG } from 'src/assets/png'
import { GoSVG } from 'src/assets/svg'
import { hiImage } from 'src/constants/images'
import { useAuth } from 'src/stores/useAuth'
import { Gender } from 'src/types/generated-types'
import { axios } from 'src/utils/axios'
import { imageMogr2 } from 'src/utils/imageMogr2'

import { useImportDeadlines } from '../../../hooks/useImportDeadlines'
import { useImportLessons } from '../../../hooks/useImportLessons'

export function Self () {
  const { authened, whoAmI } = useAuth()

  const importLessons = useImportLessons()
  const importDeadlines = useImportDeadlines()

  const [authenUser] = useMutation(gql`
    mutation SelfAuthenUser($id: String!, $token: String) {
      user: authenUser(id: $id, token: $token) {
        id studentId college subCampus school grade gender
      }
    }
  `, {
    refetchQueries: ['WhoAmI'],
    awaitRefetchQueries: true,
  })

  const [agreed, setAgreed] = useState(false)
  const [authening, setAuthening] = useState(false)
  const [type, setType] = useState<'Undergraduate' | 'Postgraduate'>('Undergraduate')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onClickAuthen = useCallback(async () => {
    if (authened) {
      await Taro.showModal({
        title: '错误',
        content: '不能重复认证',
        showCancel: false,
      })
      return
    }

    if (!agreed) {
      await Taro.showModal({
        title: '信息不完整',
        content: '请同意协议',
        showCancel: false,
      })
      return
    }

    setAuthening(true)
    try {
      const { token } = await szuAuthen(type, username, password)
      const { data } = await authenUser({
        variables: { id: whoAmI?.id, token },
        refetchQueries: ['WhoAmI'],
        awaitRefetchQueries: true,
      })
      const { studentId, college, subCampus, grade, gender } = data.user

      Taro.setStorageSync('account', { type, username, password })
      setAuthening(false)

      await Taro.showModal({
        title: '认证成功',
        content: [
          `学号：${studentId ?? ''}`,
          `性别：${{ MALE: '男生', FEMALE: '女生', NONE: '' }[gender ?? Gender.None]}`,
          `校区：${subCampus ?? ''}`,
          `学院：${college ?? ''}`,
          `年级：${grade ?? ''}`,
        ].join('\r\n'),
        showCancel: false,
      })

      if (type === 'Undergraduate') {
        const account = { username, password }
        await importLessons(account)
        await importDeadlines(account)
      }

      setTimeout(() => {
        if (Taro.getCurrentPages().length === 1) {
          void Taro.redirectTo({ url: '/pages/index/index' })
        } else {
          void Taro.navigateBack()
        }
      }, 500)
    } catch (err) {
      setAuthening(false)
      if (err instanceof ApolloError) {
        console.log(err.graphQLErrors)
        await Taro.showModal({
          title: '认证失败',
          content: err.graphQLErrors[0].message,
          showCancel: false,
        })
      }
    }
  }, [authened, agreed, type, username, password, authenUser, whoAmI?.id, importLessons, importDeadlines])

  return (
    <View className='flex flex-col bg-gray-f6'>

      <View className='h-header-h' />

      <Image
        className='relative -left-30 h-230 w-332'
        src={imageMogr2({ src: hiImage, format: 'webp' })}
        mode='aspectFill' />

      <View className='flex flex-col rounded-t-forty bg-white'>

        <Text className='mx-auto my-24 text-22 font-bold text-blue-main'>认证校园账号</Text>

        <View className='mx-90 flex flex-row justify-between'>

          <View
            className='flex flex-row items-center'
            onClick={() => setType('Undergraduate')}>
            <Image
              className='mr-6 h-17 w-17'
              src={type === 'Undergraduate' ? SwitchLicensePNG : SwitchUnlicensePNG} />
            <Text className='text-15 text-gray-9c'>本科生</Text>
          </View>

          <View
            className='flex flex-row items-center'
            onClick={() => setType('Postgraduate')}>
            <Image
              className='mr-6 h-17 w-17'
              src={type === 'Postgraduate' ? SwitchLicensePNG : SwitchUnlicensePNG} />
            <Text className='text-15 text-gray-9c'>研究生</Text>
          </View>

        </View>

        <View className='mx-30 mt-18 flex flex-col justify-between rounded-md bg-gray-f6'>
          <View className='mx-26 mt-26 flex flex-row'>
            <Text className='mr-32 text-15 text-gray-3e'>校园账号</Text>
            <Input
              className='flex-1 text-15 text-gray-3e'
              placeholder='十位学号 如2021001001'
              type='digit'
              maxlength={10}
              value={username}
              onInput={e => setUsername(e.detail.value)} />
          </View>

          <View className='mx-26 mt-40 mb-26 flex flex-row'>
            <Text className='mr-32 text-15 text-gray-3e'>校园密码</Text>
            <Input
              className='flex-1 text-15 text-gray-3e'
              placeholder='密码不会储存至数据库'
              password
              value={password}
              onInput={e => setPassword(e.detail.value)} />
          </View>

        </View>

        <View
          className='mx-40 mt-8 flex flex-row justify-between'
          onClick={() => Taro.navigateTo({ url: '/pages/auth/auth?tab=manual' })}>
          <Text className='text-12 text-gray-9c'>忘记学号密码？</Text>
          <Text className='text-12 text-blue-main'>手动认证</Text>
        </View>

        <View className='mx-40 mt-24 flex flex-row justify-between'>
          <Image
            className='relative top-3 h-17 w-17'
            onClick={() => setAgreed(!agreed)}
            src={agreed ? SwitchLicensePNG : SwitchUnlicensePNG} />
          <View className='ml-6 flex-1'>
            <Text className='text-13 text-gray-400'>我已阅读并同意</Text>
            <Text
              className='text-13 text-blue-main'
              onClick={() => Taro.navigateTo({ url: '/pages/agreement/agreement' })}>《白板使用协议》</Text>
            <Text className='text-13 text-gray-400'>并授权产品登陆校园网</Text>
          </View>
        </View>

        {authening
          ? <Text className='mx-auto mt-24 text-15 text-gray-400'>{'小白板正在认证中，不要走开噢><'}</Text>
          : <Image
              src={GoSVG}
              className='mx-auto mt-24 h-66 w-66'
              onClick={onClickAuthen} />}

        <Text className='mx-30 mt-28 text-11 text-gray-600'>
          白板不代表大学官方向您收集信息，校园账号仅用于社区认证等必要的信息获取。您的密码将不会被储存至数据库以杜绝泄漏的可能性。
        </Text>

        {/* <Text className='mx-30 text-11 text-gray-600'>白板项目代码是开源的：https://github.com/szkeli</Text> */}

        <Text
          className='mt-8 py-8 text-center text-11 text-blue-main'
          onClick={() => Taro.navigateTo({ url: '/pages/customer-service/customer-service' })}>
          注册失败？点击联系客服
        </Text>

        <View className='h-8' />

        <View className='h-safe-b' />

      </View>

    </View>
  )
}

async function szuAuthen (
  type: 'Undergraduate' | 'Postgraduate',
  username: string,
  password: string,
): Promise<{ token: string }> {
  const cookieMap: Record<string, string> = await axios({
    method: 'POST',
    url: `${process.env.SZU_URL}/login`,
    data: { username, password },
  }).then(res => res.data)

  return await axios({
    method: 'POST',
    url: `${process.env.SZU_URL}/authen`,
    data: { cookieMap, studentId: username, type },
  }).then(res => res.data)
}
