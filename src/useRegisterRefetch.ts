import { ApolloQueryResult } from 'apollo-client'
import React from 'react'

import RefetchContext from './useRefetch.context'

const useRegisterRefetch = (
  id: string,
  refetchFunction: () => Promise<ApolloQueryResult<any>>
) => {
  const { subscribeQuery } = React.useContext(RefetchContext)
  React.useEffect(() => {
    return subscribeQuery(id, refetchFunction)
  }, [subscribeQuery, refetchFunction, id])
}

export default useRegisterRefetch
