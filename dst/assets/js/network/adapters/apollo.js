"use strict";

var _apolloClient = require("apollo-client");

var _apolloLinkHttp = require("apollo-link-http");

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// NETWORK ADAPTER apollo
module.exports = function () {
  var client;
  return client = new _apolloClient.ApolloClient({
    link: new _apolloLinkHttp.HttpLink({
      uri: "todo:3000"
    }),
    cache: new _apolloCacheInmemory.InMemoryCache()
  });
}();