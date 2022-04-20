import { ApolloQueryResult } from '@apollo/client'
import * as React from 'react'

import { useUniqID } from './_internal/useUniqID'
import { QuerySubscriberOptions, Subscriptions } from './types'
import { RefetchContext } from './useRefetch.context'

export const useRegisterRefetch = (
  category: keyof Subscriptions,
  refetch: () => Promise<ApolloQueryResult<any>>,
  options?: QuerySubscriberOptions
) => {
  const { subscribeQuery } = React.useContext(RefetchContext)

  const id = useUniqID()

  React.useEffect(
    () => subscribeQuery({ category, refetch, options, id }),
    [subscribeQuery, refetch, id, options, category]
  )
}
