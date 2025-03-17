// src/lib/ColShopifyClient.ts
import axios from "axios";

// Retrieve environment variables
const shopifyDomainName = process.env.SHOPIFY_DOMAIN_NAME;
const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
const shopifyApiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;

// Debug logs (for development only)
if (process.env.NODE_ENV !== "production") {
  console.log("SHOPIFY_DOMAIN_NAME:", shopifyDomainName);
  console.log("SHOPIFY_ACCESS_TOKEN:", shopifyAccessToken ? "SET" : "MISSING");
  console.log("NEXT_PUBLIC_SHOPIFY_API_VERSION:", shopifyApiVersion);
}

if (!shopifyDomainName) {
  throw new Error("Missing SHOPIFY_DOMAIN_NAME in environment variables");
}
if (!shopifyAccessToken) {
  throw new Error("Missing SHOPIFY_ACCESS_TOKEN in environment variables");
}
if (!shopifyApiVersion) {
  throw new Error(
    "Missing NEXT_PUBLIC_SHOPIFY_API_VERSION in environment variables"
  );
}

// Create and export the Shopify Axios client
export const shopifyAxiosClient = axios.create({
  baseURL: `https://${shopifyDomainName}/admin/api/${shopifyApiVersion}`,
  headers: {
    "X-Shopify-Access-Token": shopifyAccessToken,
    "Content-Type": "application/json",
  },
});
