/**
 * NETWORK ADAPTER apollo
 */
import { ApolloClient /*, useQuery*/ } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// import querySearch from "./search.graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});
console.log(client);

export const get = (/*entity, queryString*/): void => {
  console.log("@todo");
};
// await ({ loading, error, data } = useQuery querySearch)
/*client
    .query(querySearch)
    .then((data) => data)
    .catch((error) => error);
    */
