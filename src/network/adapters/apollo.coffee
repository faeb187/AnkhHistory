#
# NETWORK ADAPTER apollo
#
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import gql from "graphql-tag"

module.exports =
  (->
    client = new ApolloClient(
      link: new HttpLink uri: "todo:3000"
      cache: new InMemoryCache()
    )
  )()
