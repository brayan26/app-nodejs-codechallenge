# Yape Code Challenge:

 - Author: Brayan Rafael Parra Perez.
 - LinkedIn: https://www.linkedin.com/in/brayan-rafael-parra-perez-3b6205140/

## Table of Contents

- [Getting started](#getting-started)
- [Mutations and Queries](#mutations-and-queries)
- [Create a new transaction](#create-a-new-transaction)
- [Get a transaction](#get-a-transaction)

## Getting started 


Run docker container (mongo-read, mongo-write, kafka, zookeeper, ms-transaction, ms-anti-fraud)
```
docker-compose -f docker-compose.yml up -d
```

`IMPORTANT: Once the docker container has all the services up, wait about 15 seconds for the application to start correctly and the topics to be created.`

In your GraphQL GUI, open http://your_host:3000/graphql

## Mutations and Queries

### Create a new transaction
```graphql
mutation Mutation {
  createTransaction(input: {  
    accountExternalIdDebit: "Guid",
    accountExternalIdCredit: "Guid",
    tranferTypeId: 1,
    value: 120
  }) {
    id,
    accountExternalIdDebit,
    accountExternalIdCredit,
    status,
    value
  }
}
```
### Get a transaction
```graphql
query Query {
  getTransactionById(externalId: "XXXXX") {
	id,
    accountExternalIdDebit,
    accountExternalIdCredit,
    tranferTypeId,
    value,
    status
  }
}
```