import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities'
import Taro from '@tarojs/taro'

import { axiosFetch } from './axios'
import { WebSocketImpl } from './WebSocketImpl'

const httpLink = from([
  setContext((_, { headers }) => {
    const token = Taro.getStorageSync<string | ''>('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  }),
  new HttpLink({
    uri: process.env.API_URL,
    fetch: axiosFetch,
  }),
])

const wsLink = new WebSocketLink({
  uri: process.env.API_WS_URL,
  options: {
    reconnect: true,
    connectionParams: () => {
      const token = Taro.getStorageSync<string | ''>('token')
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    },
  },
  webSocketImpl: WebSocketImpl,
})

const link = split(
  ({ query, variables }) => {
    const definition = getMainDefinition(query)
    if (definition.kind === 'OperationDefinition') {
      console.log(definition.operation, definition.name?.value, variables)
    }
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
        },
      },
    },
  }),
})
