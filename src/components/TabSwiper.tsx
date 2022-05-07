import { CommonEventFunction, Swiper, SwiperItem, SwiperProps, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'

async function computeHeight (pageIndex: number): Promise<number> {
  const [screenBottom, top, bottom] = await Promise.all([
    new Promise<number>(resolve => {
      Taro.createSelectorQuery()
        .select('.anchor-screen-bottom')
        .boundingClientRect()
        .selectViewport()
        .scrollOffset()
        .exec(res => {
          resolve(res[0].bottom)
        })
    }),
    new Promise<number>(resolve => {
      Taro.createSelectorQuery()
        .selectAll('.anchor-top')
        .boundingClientRect()
        .selectViewport()
        .scrollOffset()
        .exec(res => {
          resolve(res[0][pageIndex].top)
        })
    }),
    new Promise<number>(resolve => {
      Taro.createSelectorQuery()
        .selectAll('.anchor-bottom')
        .boundingClientRect()
        .selectViewport()
        .scrollOffset()
        .exec(res => {
          resolve(res[0][pageIndex].bottom)
        })
    }),
  ])

  const min = screenBottom - top
  const value = bottom - top

  return Math.max(min, value)
}

interface TabSwiperProps {
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
  children: ReactNode
}

export function TabSwiper ({ current, setCurrent, children }: TabSwiperProps) {
  const items = useMemo(() => {
    const arr: ReactNode[] = []
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) {
        // Ignore non-elements.
        return
      }
      if (element.type !== TabSwiperItem) {
        console.error('All component children of <TabSwiper> must be a <TabSwiperItem>')
        return
      }
      arr.push(element)
    })
    return arr
  }, [children])

  const [height, setHeight] = useState(0)

  const onChange: CommonEventFunction<SwiperProps.onChangeEventDetail> = e => {
    setCurrent(e.detail.current)
    void computeHeight(e.detail.current).then(setHeight)
  }

  useEffect(() => {
    Taro.nextTick(() => {
      const interval = setInterval(async () => {
        try {
          setHeight(await computeHeight(0))
          clearInterval(interval)
        } catch {}
      }, 500)
    })
  }, [])

  return (
    <View>

      <Swiper
        current={current}
        onChange={onChange}
        style={{ height }}>

        {items.map((item, index) => (
          <SwiperItem key={index}>
            <View className='anchor-top' />
            {item}
            <View className='anchor-bottom' />
          </SwiperItem>
        ))}

      </Swiper>

      <View className='anchor-screen-bottom' />

    </View>
  )
}

interface TabSwiperItemProps {
  children: ReactNode
}
export function TabSwiperItem ({ children }: TabSwiperItemProps) {
  return <>{children}</>
}
