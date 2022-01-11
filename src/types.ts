import { ApolloQueryResult } from 'apollo-client'

export type QuerySubscriber = (params: {
  id: number
  category: string
  refetch: () => Promise<ApolloQueryResult<any>>
  options?: QuerySubscriberOptions
}) => () => void

export interface QuerySubscriberOptions {
  skip?: boolean
}
