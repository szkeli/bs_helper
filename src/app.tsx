import { ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

import { apolloClient } from 'src/utils/apolloClient'

import 'src/styles/index.css'

import { AuthProvider } from './stores/useAuth'
import { GlobalProvider } from './stores/useGlobal'
import { combineProviders } from './utils/combineProviders'

const Provider = combineProviders([AuthProvider, GlobalProvider])

interface Props {
  children: ReactNode
}

export default function App ({ children }: Props) {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider>
        {children}
      </Provider>
    </ApolloProvider>
  )
}
