import { ApolloQueryResult } from 'apollo-client'

export interface QuerySubscriber {
  (params: {
    id: number
    category: keyof Subscriptions
    refetch: () => Promise<ApolloQueryResult<any>>
    options?: QuerySubscriberOptions
  }): () => void
}

export interface QuerySubscriberOptions {
  skip?: boolean
}

export interface RefetchContextValue {
  refetch: (category: keyof Subscriptions) => Promise<any>
  refetchAll: () => Promise<any>
  reset: () => void
  subscribeQuery: QuerySubscriber
}

export interface Subscriptions {
  [category: string | number | symbol]: {
    [id: string]: () => Promise<ApolloQueryResult<any>>
  }
}
