import { WebView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useEffect } from 'react'

import { webPages } from '../../constants/webPages'

definePageConfig({
  navigationBarTitleText: '网页',
})

export default function WebPage () {
  const { params } = useRouter<{ page: keyof typeof webPages }>()
  const webPage = webPages[params.page]

  useEffect(() => {
    void Taro.setNavigationBarTitle({ title: webPage.title })
  }, [webPage])

  return <WebView src={webPage.src} />
}
