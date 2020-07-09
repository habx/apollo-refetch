import { ApolloQueryResult } from 'apollo-client'
import React from 'react'

import useUniqID from './_internal/useUniqID'
import { QuerySubscriberOptions } from './types'
import RefetchContext from './useRefetch.context'

const useRegisterRefetch = (
  category: string,
  refetch: () => Promise<ApolloQueryResult<any>>,
  options?: QuerySubscriberOptions
) => {
  const { subscribeQuery } = React.useContext(RefetchContext)

  const id = useUniqID()

  React.useEffect(() => {
    return subscribeQuery({ category, refetch, options, id })
  }, [subscribeQuery, refetch, id, options, category])
}

export default useRegisterRefetch
