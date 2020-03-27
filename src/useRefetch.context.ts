import { ApolloQueryResult } from 'apollo-client'
import * as React from 'react'

export type RefetchInterface = {
  subscribeQuery: (
    id: string,
    refetch: () => Promise<ApolloQueryResult<any>>
  ) => () => void
  refetch: (id: string) => Promise<any>
  refetchAll: () => Promise<any>
  reset: () => void
}
const RefetchContext = React.createContext<RefetchInterface>(
  {} as RefetchInterface
)

export default RefetchContext
