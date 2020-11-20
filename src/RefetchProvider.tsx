import { ApolloQueryResult } from 'apollo-client'
import * as React from 'react'

import { QuerySubscriber } from './types'
import RefetchContext from './useRefetch.context'

type Subscriptions = {
  [category: string]: {
    [subscriptionId: string]: () => Promise<ApolloQueryResult<any>>
  }
}
const RefetchProvider: React.FunctionComponent<{}> = ({ children }) => {
  const subscriptions = React.useRef<Subscriptions>({})

  const subscribeQuery = React.useCallback<QuerySubscriber>(
    ({ id, category, refetch, options }) => {
      if (!subscriptions.current[category]) {
        subscriptions.current[category] = {}
      }

      if (!options?.skip) {
        subscriptions.current[category][id] = refetch
      }

      return () => delete subscriptions.current[category][id]
    },
    []
  )

  const reset = React.useCallback(() => {
    subscriptions.current = {}
  }, [])

  const refetch = React.useCallback((category: string) => {
    try {
      return Promise.all(
        Object.values(
          subscriptions.current[category]
        ).map((subscriptonRefetch) => subscriptonRefetch())
      )
    } catch (e) {
      if (process.env.NODE_ENV === 'dev') {
        console.warn(`${category} is not registered in refetch subscriptions`) // eslint-disable-line
      }
      return new Promise((resolve) => resolve(undefined))
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

  const context = React.useMemo(
    () => ({ subscribeQuery, reset, refetch, refetchAll }),
    [refetch, refetchAll, reset, subscribeQuery]
  )

  return (
    <RefetchContext.Provider value={context}>
      {children}
    </RefetchContext.Provider>
  )
}

export default RefetchProvider
