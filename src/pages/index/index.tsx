import { Image, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { ClosePNG, CryPNG, PlusPNG } from 'src/assets/png'
import { LoadingFull } from 'src/components/Loading'
import { PopupContainer, PopupProps } from 'src/components/PopupContainer'
import { TabButtons } from 'src/components/TabButtons'
import { TabSwiper, TabSwiperItem } from 'src/components/TabSwiper'
import { wrapPage } from 'src/components/wrapPage'
import { paddings } from 'src/constants/paddings'
import { useImportDeadlines } from 'src/hooks/useImportDeadlines'
import { useImportLessons } from 'src/hooks/useImportLessons'
import { useAuth } from 'src/stores/useAuth'

import './index.css'

import { Calender } from './components/Calendar'
import { DeadlineList } from './components/DeadlineList'
// import { EditDeadline } from './components/EditDeadline'
// import { EditLesson } from './components/EditLesson'
import { PromptAccount } from './components/PromptAccount'
import { TimeTable } from './components/TimeTable'
import { IndexPageProvider, useIndexPage } from './stores/useIndexPage'

definePageConfig({
  disableScroll: true,
  navigationStyle: 'custom',
  usingComponents: {
    'mp-slideview': 'weui-miniprogram/slideview/slideview',
  },
})

export default wrapPage(paddings, IndexPage, [IndexPageProvider])

function IndexPage () {
  const { authing, whoAmI, authened } = useAuth()

  const { tab, setTab, Popup, setPopup } = useIndexPage()

  const importLessons = useImportLessons()
  const importDeadlines = useImportDeadlines()

  const [expended, setExpended] = useState(false)
  const [guidedNotif, setGuidedNotif] = useState(Taro.getStorageSync<boolean | ''>('guided-notif') || false)

  // const onClickCreate = () => {
  //   setExpended(false)

  //   const Edit = [EditLesson, EditDeadline][tab]
  //   setPopup(() => ({ close, hide }: PopupProps) => (
  //     <Edit close={close} hide={hide} />
  //   ))
  // }

  const onClickImport = () => {
    setExpended(false)

    const fn = [importLessons, importDeadlines][tab]
    const account = Taro.getStorageSync<{ username: string, password: string} | ''>('account')
    if (!account) {
      setPopup(() => ({ close, hide }: PopupProps) => (
        <PromptAccount
          close={close}
          hide={hide}
          callback={fn} />
      ))
    } else {
      void fn(account)
    }
  }

  useEffect(() => {
    if (!authing && !authened) {
      void Taro.navigateTo({ url: '/pages/auth/auth' })
    }
  }, [authened, authing])

  return (
    <>
      <View className='w-screen h-screen flex flex-col bg-gray-f6'>
        <View className='pt-safe-t flex flex-col bg-white rounded-b-3xl shadow-sm'>
          <Calender />
        </View>

        <View className='flex-1 overflow-hidden'>
          <ScrollView className='w-full h-full' scrollY>
            <View className='flex flex-col relative'>

              {!authing && whoAmI && authened && (
                <>
                  <View className='flex flex-col mt-10'>
                    <TabButtons
                      buttons={['课表', '任务']}
                      current={tab}
                      setCurrent={setTab} />
                  </View>

                  {/* <View
                    className='absolute z-40 left-30 top-20 grid w-30 h-30 bg-blue-main rounded-md'
                    onClick={onClickCreate}>
                    <Text className='m-auto text-15 text-white'>建</Text>
                  </View> */}

                  <View
                    className={clsx([
                      'absolute z-40 left-30 grid w-30 h-30 bg-blue-main rounded-md',
                      'transition-all duration-300 ease-in-out',
                      // expended ? 'top-60' : 'top-20',
                      expended ? 'top-20' : 'top-20',
                    ])}
                    onClick={onClickImport}>
                    <Text className='m-auto text-15 text-white'>导</Text>
                  </View>

                  <Image
                    className={clsx([
                      'absolute z-50 left-30 w-30 h-30',
                      'transition-all duration-300 ease-in-out',
                      // expended ? 'top-100' : 'top-20',
                      expended ? 'top-60' : 'top-20',
                    ])}
                    src={expended ? ClosePNG : PlusPNG}
                    onClick={() => setExpended(!expended)}
                    onLongPress={() => {
                      Taro.removeStorageSync('account')
                      void Taro.showToast({ title: '已清空帐密', icon: 'success' })
                    }} />

                  <Text
                    className='absolute right-30 top-20 w-48 leading-24 text-12 text-blue-main text-center bg-white rounded-md border-1 border-solid border-blue-main'
                    onClick={() => {
                      if (!guidedNotif) {
                        setGuidedNotif(true)
                        Taro.setStorageSync('guided-notif', true)
                      }
                      void Taro.navigateTo({ url: '/pages/web/web?page=guide' })
                    }}>
                    提醒
                  </Text>

                  {!guidedNotif && (
                    <View
                      className='absolute z-50 right-30 top-50 flex flex-col'
                      onClick={() => {
                        setGuidedNotif(true)
                        Taro.setStorageSync('guided-notif', true)
                      }}>
                      <View className='ml-auto mr-14 -mt-10 w-0 h-0 border-solid border-10 border-transparent border-b-10 border-b-[#3C5EFB]' />
                      <View className='flex flex-col p-10 bg-[#3C5EFB] rounded-lg'>
                        <Text className='text-12 text-white'>解锁提醒功能</Text>
                        <Text className='text-12 text-white'>早八晚十知课表</Text>
                      </View>
                    </View>
                  )}

                </>
              )}

              {authing && (
                <View className='mt-75 mx-auto'>
                  <LoadingFull />
                </View>
              )}

              {!authing && !whoAmI && (
                <Text
                  className='mt-75 mx-auto text-15 text-blue-main'
                  onClick={() => Taro.navigateToMiniProgram({ appId: 'wx10ac1dfea0e2b8c6' })}>
                  登录失败，请在白板小程序注册。
                </Text>
              )}

              {!authing && whoAmI && !authened && (
                <View className='mt-75 flex flex-col items-center'>
                  <Image className='mb-25 w-122 h-80' src={CryPNG} />
                  <Text className='text-13 text-gray-70'>当前是游客模式</Text>
                  <Text className='text-13 text-gray-70'>小白板无法收集到您的校园网日程消息</Text>
                  <Text className='text-13 text-gray-70'>认证后即可使用日程功能</Text>
                  <Text
                    className='mt-25 px-12 py-6 text-14 text-white font-semibold bg-[#7189FC] rounded-md'
                    onClick={() => Taro.navigateTo({ url: '/pages/auth/auth' })}>立即认证</Text>
                </View>
              )}

              {!authing && whoAmI && authened && (
                <TabSwiper
                  current={tab}
                  setCurrent={setTab}>

                  <TabSwiperItem>
                    <TimeTable />
                  </TabSwiperItem>

                  <TabSwiperItem>
                    <DeadlineList />
                  </TabSwiperItem>

                </TabSwiper>
              )}

              <View className='h-safe-b' />

            </View>
          </ScrollView>
        </View>
      </View>

      <PopupContainer Popup={Popup} setPopup={setPopup} />
    </>
  )
}
