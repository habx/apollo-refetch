import { ApolloQueryResult } from 'apollo-client'
import * as React from 'react'

import RefetchContext from './useRefetch.context'

type Subscriptions = {
  [id: string]: {
    [subscriptionId: string]: () => Promise<ApolloQueryResult<any>>
  }
}
const RefetchProvider: React.FunctionComponent<RefetchProviderInterface> = ({
  children,
}) => {
  const subscriptions = React.useRef<Subscriptions>({})

  const subscribeQuery = React.useCallback(
    (id: string, refetch: () => Promise<ApolloQueryResult<any>>) => {
      const subscriptionId = Math.random()
      if (!subscriptions.current[id]) {
        subscriptions.current[id] = {}
      }
      subscriptions.current[id][subscriptionId] = refetch
      return () => delete subscriptions.current[id][subscriptionId]
    },
    []
  )

  const reset = React.useCallback(() => {
    subscriptions.current = {}
  }, [])

  const refetch = React.useCallback((id: string) => {
    try {
      return Promise.all(
        Object.values(subscriptions.current[id]).map((subscriptonRefetch) =>
          (subscriptonRefetch as () => Promise<ApolloQueryResult<any>>)()
        )
      )
    } catch (e) {
      if (process.env.NODE_ENV === 'dev') {
        console.warn(`${id} is not registered in refetch subscriptions`) // eslint-disable-line
      }
      return
    }
  }, [])

  const refetchAll = React.useCallback(
    () =>
      Promise.all(
        Object.values(subscriptions.current).flatMap((topicSubscriptions) =>
          Object.values(topicSubscriptions).map((subscriptionRefetch) =>
            (subscriptionRefetch as () => Promise<ApolloQueryResult<any>>)()
          )
        )
      ),
    []
  )

  return (
    <RefetchContext.Provider
      value={{ subscribeQuery, reset, refetch, refetchAll }}
    >
      {children}
    </RefetchContext.Provider>
  )
}

interface RefetchProviderInterface {}

export default RefetchProvider
