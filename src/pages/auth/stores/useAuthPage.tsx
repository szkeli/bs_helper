import { useState } from 'react'
import { createContainer } from 'unstated-next'

import { PopupType } from 'src/components/PopupContainer'

export const { Provider: AuthPageProvider, useContainer: useAuthPage } = createContainer(() => {
  const [Popup, setPopup] = useState<PopupType | null>(null)

  return {
    Popup,
    setPopup,
  }
})
