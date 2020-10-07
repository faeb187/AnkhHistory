###
NETWORK ADAPTER
graphql apollo-client
###

module.exports = (->
  ApolloClient  = require('apollo-client').ApolloClient
  HttpLink      = require('apollo-link-http').HttpLink
  InMemoryCache = require('apollo-cache-inmemory').InMemoryCache
  gql           = require 'graphql-tag'

  client = new ApolloClient
    link: new HttpLink uri: 'todo:3000'
    cache: new InMemoryCache()

  console.log client
)()