import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN_NAME}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
  },
  cache: new InMemoryCache(),
});

export default client;
