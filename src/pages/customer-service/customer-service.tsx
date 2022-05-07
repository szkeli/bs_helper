import { Image, View } from '@tarojs/components'

import { BackHeader } from 'src/components/BackHeader'
import { wrapPage } from 'src/components/wrapPage'
import { customerServiceImage } from 'src/constants/images'
import { paddings } from 'src/constants/paddings'

definePageConfig({
  disableScroll: true,
  navigationStyle: 'custom',
})

export default wrapPage(paddings, () => {
  return (
    <>
      <BackHeader title='联系客服' />
      <View className='pt-150'>
        <Image
          className='h-375 w-375'
          mode='aspectFit'
          src={customerServiceImage}
          showMenuByLongpress />
      </View>
    </>
  )
})
