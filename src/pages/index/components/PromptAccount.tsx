import { Image, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import { useState } from 'react'

import { SwitchLicensePNG, SwitchUnlicensePNG } from 'src/assets/png'

interface PromptAccountProps {
  close: () => void
  hide: boolean
  callback: (account: { username: string, password: string }) => void
}

export function PromptAccount ({ close, hide, callback }: PromptAccountProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(true)

  return (
    <View
      className='fixed top-0 bottom-0 left-0 right-0 flex flex-col'
      onClick={close}>
      <View
        className={clsx([
          'mx-32 my-auto flex flex-col bg-white rounded-xl',
          'transition-all duration-300 ease-in-out',
          ['appear', hide && 'disappear'],
        ])}
        onClick={e => e.stopPropagation()}>

        <Text className='mx-auto mt-32 text-18 font-bold text-blue-main'>需要校园网帐密以使用此功能</Text>

        <View className='mx-64 mt-16 flex flex-row justify-between'>
          <View className='flex flex-row items-center'>
            <Image
              className='mr-6 h-17 w-17'
              src={SwitchLicensePNG} />
            <Text className='text-15 text-gray-9c'>本科生</Text>
          </View>
          <View
            className='flex flex-row items-center'>
            <Text className='text-15 text-gray-9c'>暂不支持研究生</Text>
          </View>
        </View>

        <View className='mx-32 mt-8 flex flex-col justify-between rounded-md bg-gray-f6'>
          <View className='mx-24 mt-16 flex flex-row'>
            <Text className='mr-32 text-15 text-gray-3e'>校园账号</Text>
            <Input
              className='flex-1 text-15 text-gray-3e'
              placeholder='十位学号'
              type='digit'
              maxlength={10}
              value={username}
              onInput={e => setUsername(e.detail.value)} />
          </View>

          <View className='mx-24 mt-32 mb-16 flex flex-row'>
            <Text className='mr-32 text-15 text-gray-3e'>校园密码</Text>
            <Input
              className='flex-1 text-15 text-gray-3e'
              placeholder='你的密码'
              password
              value={password}
              onInput={e => setPassword(e.detail.value)} />
          </View>

        </View>

        <View className='mx-40 mt-16 flex flex-row'>
          <Image
            className='h-16 w-16'
            onClick={() => setAgreed(!agreed)}
            src={agreed ? SwitchLicensePNG : SwitchUnlicensePNG} />
          <View className='ml-6 flex flex-1'>
            <Text className='text-13 text-gray-400 leading-16'>
              本地记住帐密，下次使用需要帐密的功能时，不再显示此界面。若要删除已记录的帐密，请长按加号。
            </Text>
          </View>
        </View>

        <Text
          className='mx-auto mt-32 mb-32 rounded-xl bg-blue-main py-11 px-46 text-15 text-white'
          onClick={() => {
            const account = { type: 'Undergraduate', username, password }
            if (agreed) Taro.setStorageSync('account', account)
            void Taro.showToast({ title: '已授权', icon: 'success' })
            callback(account)
            close()
          }}>
          授权
        </Text>

      </View>
    </View>
  )
}
