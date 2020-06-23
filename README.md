# Utils for apollo queries refetching

[![CircleCI](https://img.shields.io/circleci/build/github/habx/apollo-refetch)](https://app.circleci.com/pipelines/github/habx/apollo-refetch)
[![Version](https://img.shields.io/npm/v/@habx/apollo-refetch)](https://www.npmjs.com/package/@habx/apollo-refetch)
[![Size](https://img.shields.io/bundlephobia/min/@habx/apollo-refetch)](https://bundlephobia.com/result?p=@habx/apollo-refetch)
[![License](https://img.shields.io/github/license/habx/apollo-refetch)](/LICENSE)


## Motivation

Displaying lists with apollo client is really common but it can be very
hard to update theses lists with new data or retrieve data from it. We wanted to be able to
display data that is always server-sync even if the list has parameters.

## Install

```shell
npm i @habx/apollo-refetch
```

Wrap your App with the context provider 

```typescript jsx
<RefetchProvider>
  {children}
</RefetchProvider>
```

## How to use

### First register your query

```typescript
 const { refetch, ... } = useQuery<contacts, contactsVariables>(contactsQuery, {
    variables: {
      filters: state.filters,
      paginate: state.paginate,
      orderBy: state.orderBy,
    },
  })
  useRegisterRefetch('contacts', refetch)
```

### Then when you add, remove an element
```typescript
  const { refetch } = useRefetch()
  const [handleUpsertContact] = useMutation<
    upsertContact,
    upsertContactVariabes
  >(upsertContactMutation, { onCompleted: () => refetch('users')})
````

And you're done 👍

⚠️ It's not useful to use `useRefetch` when the operation is an update
of an existing entity, apollo updates it automatically
