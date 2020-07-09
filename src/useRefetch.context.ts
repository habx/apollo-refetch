import * as React from 'react'

import { QuerySubscriber } from './types'

export type RefetchInterface = {
  subscribeQuery: QuerySubscriber
  refetch: (id: string) => Promise<any>
  refetchAll: () => Promise<any>
  reset: () => void
}
const RefetchContext = React.createContext<RefetchInterface>(
  {} as RefetchInterface
)

export default RefetchContext
