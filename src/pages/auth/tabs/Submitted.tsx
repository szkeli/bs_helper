import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { hiImage } from 'src/constants/images'
import { imageMogr2 } from 'src/utils/imageMogr2'

export function Submitted () {
  return (
    <View className='flex flex-col bg-gray-f6'>

      <View className='h-header-h' />

      <Image
        className='relative -left-30 h-230 w-332'
        src={imageMogr2({ src: hiImage, format: 'webp' })}
        mode='aspectFill' />

      <View className='flex flex-col rounded-t-forty bg-white'>

        <Text className='mx-auto my-24 text-22 font-bold text-blue-main'>已提交申请</Text>
        <Text className='mx-auto text-15 leading-25 text-gray-9c'>小白板将会在3个工作日内完成审核</Text>
        <Text className='mx-auto text-15 leading-25 text-gray-9c'>请耐心等待</Text>

        <Text
          className='mx-auto mt-160 rounded-xl bg-blue-main py-11 px-46 text-15 text-white'
          onClick={async () => {
            await Taro.requestSubscribeMessage({
              tmplIds: ['HZqyfGZ9ClCtZuHkC44pVuwzlCOq2qgkrkFbgIFj398'],
            })
            await Taro.navigateBack({ delta: 3 })
          }}>
          授权推送认证结果
        </Text>

        <View className='h-safe-b' />

      </View>
    </View>
  )
}
