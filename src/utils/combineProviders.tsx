import { ComponentType, ReactNode } from 'react'

export interface ProviderProps {
  children: ReactNode
}

export type ProviderType = ComponentType<ProviderProps>

export function combineProviders (providers: ProviderType[]): ProviderType {
  return providers.reduce(
    (AccumulatedProvider, CurrentProvider) => {
      return ({ children }: ProviderProps) => (
        <AccumulatedProvider>
          <CurrentProvider>{children}</CurrentProvider>
        </AccumulatedProvider>
      )
    },
    ({ children }) => <>{children}</>,
  )
}
