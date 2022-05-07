import { View } from '@tarojs/components'
import { ComponentType } from 'react'

import { combineProviders, ProviderType } from 'src/utils/combineProviders'

export function wrapPage (
  cssVariables: Record<string, string>,
  Content: ComponentType,
  providers?: ProviderType[],
) {
  const Provider = combineProviders(providers ?? [])

  return () => (
    <View style={cssVariables} className='relative h-screen w-screen'>
      <Provider>
        <Content />
      </Provider>
    </View>
  )
}
