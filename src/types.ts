import { ApolloQueryResult } from 'apollo-client'

export type QuerySubscriberOptions = {
  skip?: boolean
}

export type QuerySubscriber = (params: {
  id: number
  category: string
  refetch: () => Promise<ApolloQueryResult<any>>
  options?: QuerySubscriberOptions
}) => () => void
