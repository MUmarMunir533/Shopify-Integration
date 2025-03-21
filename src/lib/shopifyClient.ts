import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from "cross-fetch";

const shopifyDomainName = process.env.SHOPIFY_DOMAIN_NAME;
const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shopifyDomainName) {
  throw new Error("Missing SHOPIFY_DOMAIN_NAME in environment variables");
}
if (!shopifyAccessToken) {
  throw new Error("Missing SHOPIFY_ACCESS_TOKEN in environment variables");
}

const SHOPIFY_API_URL: string = shopifyDomainName.startsWith("http")
  ? `${shopifyDomainName}/api/2023-01/graphql.json`
  : `https://${shopifyDomainName}/api/2023-01/graphql.json`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: SHOPIFY_API_URL,
    fetch,
    headers: {
      "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
