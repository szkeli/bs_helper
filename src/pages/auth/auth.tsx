import { Image, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { useState } from 'react'

import { BackHeader } from 'src/components/BackHeader'
import { PopupContainer } from 'src/components/PopupContainer'
import { wrapPage } from 'src/components/wrapPage'
import { toolGuideImages } from 'src/constants/images'
import { paddings } from 'src/constants/paddings'
import { Manual } from 'src/pages/auth/tabs/Manual'
import { Self } from 'src/pages/auth/tabs/Self'
import { Submitted } from 'src/pages/auth/tabs/Submitted'

import { AuthPageProvider, useAuthPage } from './stores/useAuthPage'

definePageConfig({
  disableScroll: true,
  navigationStyle: 'custom',
})

export default wrapPage(paddings, AuthPage, [AuthPageProvider])

function AuthPage () {
  const { params } = useRouter<{ tab?: 'manual' | 'submitted' }>()
  const { Popup, setPopup } = useAuthPage()

  const [guidedPage, setGuidePage] = useState(false)

  if (!guidedPage) {
    return (
      <Swiper className='pt-safe-t w-screen h-screen'>
        <SwiperItem>
          <Image
            className='w-full h-full'
            src={toolGuideImages[0]}
            mode='aspectFit' />
        </SwiperItem>
        <SwiperItem>
          <Image
            className='w-full h-full'
            src={toolGuideImages[1]}
            mode='aspectFit'
            onClick={() => setGuidePage(true)} />
        </SwiperItem>
      </Swiper>
    )
  }

  return (
    <>
      <BackHeader title='注册' />

      {/**
           * 99.9vh 是为了解决 input 弹出键盘会导致 placeholder 内容上移
           * 见 https://developers.weixin.qq.com/community/develop/article/doc/000e2c1ce34e3016736a0318d51c13
           * 99.99vh 效果失效，原因不明。
           */}
      <ScrollView scrollY className='h-[99.9vh] w-screen'>
        {!params.tab && <Self />}
        {params.tab === 'manual' && <Manual />}
        {params.tab === 'submitted' && <Submitted />}
      </ScrollView>

      <PopupContainer Popup={Popup} setPopup={setPopup} />
    </>
  )
}
