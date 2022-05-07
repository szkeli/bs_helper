import { useState } from 'react'
import { createContainer } from 'unstated-next'

import { PopupType } from 'src/components/PopupContainer'

export const { Provider: IndexPageProvider, useContainer: useIndexPage } =
  createContainer(() => {
    const [Popup, setPopup] = useState<PopupType | null>(null)
    const [tab, setTab] = useState(0)

    return {
      Popup,
      setPopup,
      tab,
      setTab,
    }
  })
