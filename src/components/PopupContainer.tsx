import { PageContainer, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react'

export interface PopupProps {
  close: () => void
  hide: boolean
}

export type PopupType = ComponentType<PopupProps>

export interface PopupContainerProps {
  Popup: PopupType | null
  setPopup: Dispatch<SetStateAction<PopupType | null>>
}

export function PopupContainer ({ Popup, setPopup }: PopupContainerProps) {
  const [hide, setHide] = useState(false)

  const close = useCallback(() => {
    void Taro.hideKeyboard()
    setHide(true)
    setTimeout(() => {
      setPopup(null)
      setHide(false)
    }, 300)
  }, [setPopup])

  return (
    <PageContainer
      customStyle='background:unset;z-index:999'
      overlayStyle='background:unset;z-index:99'
      zIndex={9999}
      show={Popup !== null}
      onEnter={() => {}}
      onLeave={close}>
      <View
        className={clsx([
          'fixed top-0 left-0 h-screen w-screen bg-black',
          'transition-all duration-300 ease-in-out',
          Popup && !hide ? 'opacity-20' : 'opacity-0',
        ])}
        onClick={close} />
      {Popup && <Popup close={close} hide={hide} />}
    </PageContainer>
  )
}
