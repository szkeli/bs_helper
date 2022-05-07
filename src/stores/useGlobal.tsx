import Taro from '@tarojs/taro'
import { useState } from 'react'
import { createContainer } from 'unstated-next'

export const { Provider: GlobalProvider, useContainer: useGlobal } = createContainer(() => {
  const [deadlines, setDeadlines] = useState(Taro.getStorageSync<any[] | ''>('deadlines') || [])

  return {
    deadlines,
    setDeadlines: (newValue: any[]) => {
      Taro.setStorageSync('deadlines', newValue)
      setDeadlines(newValue)
    },
  }
})
