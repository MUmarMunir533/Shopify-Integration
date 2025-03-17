// app/api/products/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const shopifyDomainName = process.env.SHOPIFY_DOMAIN_NAME;
const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shopifyDomainName) {
  throw new Error("Missing SHOPIFY_DOMAIN_NAME in environment variables");
}
if (!shopifyAccessToken) {
  throw new Error("Missing SHOPIFY_ACCESS_TOKEN in environment variables");
}

// Construct the full API URL safely
const SHOPIFY_API_URL: string = shopifyDomainName.startsWith("http")
  ? `${shopifyDomainName}/api/2023-01/graphql.json`
  : `https://${shopifyDomainName}/api/2023-01/graphql.json`;

const GET_PRODUCTS_QUERY = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          images(first: 1) {
            edges {
              node {
                src: originalSrc
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                priceV2 {
                  amount
                }
                compareAtPriceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const response = await axios.post(
      SHOPIFY_API_URL,
      { query: GET_PRODUCTS_QUERY },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
          "Content-Type": "application/json",
        },
      }
    );
    
    // Shopify ke response mein GraphQL data object ke andar hota hai
    const products = response.data.data.products.edges;
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
