import * as React from 'react'

import { RefetchContextValue, Subscriptions } from './types'
import { RefetchContext } from './useRefetch.context'

export const RefetchProvider: React.FunctionComponent = ({ children }) => {
  const subscriptions = React.useRef<Subscriptions>({})

  const subscribeQuery: RefetchContextValue['subscribeQuery'] =
    React.useCallback(({ id, category, refetch, options }) => {
      subscriptions.current[category] ??= {}

      if (!options?.skip) {
        subscriptions.current[category][id] = refetch
      }

      return () => delete subscriptions.current[category][id]
    }, [])

  const reset: RefetchContextValue['reset'] = React.useCallback(() => {
    subscriptions.current = {}
  }, [])

  const refetch: RefetchContextValue['refetch'] = React.useCallback(
    (category) => {
      if (category in subscriptions.current) {
        return Promise.all(
          Object.values(subscriptions.current[category]).map(
            (subscriptonRefetch) => subscriptonRefetch()
          )
        )
      }

      if (process.env.NODE_ENV === 'dev') {
        // eslint-disable-next-line
        console.warn(`${category.toString()} is not registered in refetch subscriptions`)
      }

      return Promise.resolve([])
    },
    []
  )

  const refetchAll: RefetchContextValue['refetchAll'] = React.useCallback(
    () =>
      Promise.all(
        Object.values(subscriptions.current).flatMap((categorySubscriptions) =>
          Object.values(categorySubscriptions).map((subscriptionRefetch) =>
            subscriptionRefetch()
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
