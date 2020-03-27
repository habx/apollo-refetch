# Utils for apollo queries refetching

## Motivation

Display lists with apollo client is really common but it can be very
hard to update theses list with new data. We wanted to be able to
display data that is always server-sync even if the list has parameters

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
