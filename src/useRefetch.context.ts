import * as React from 'react'

import { QuerySubscriber } from './types'

export const RefetchContext = React.createContext<RefetchInterface>(
  {} as RefetchInterface
)

export interface RefetchInterface {
  refetch: (id: string) => Promise<any>
  refetchAll: () => Promise<any>
  reset: () => void
  subscribeQuery: QuerySubscriber
}
