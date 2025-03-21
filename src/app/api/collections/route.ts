// app/api/collections/route.ts
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

const SHOPIFY_API_URL: string = shopifyDomainName.startsWith("http")
  ? `${shopifyDomainName}/api/2023-01/graphql.json`
  : `https://${shopifyDomainName}/api/2023-01/graphql.json`;

const GET_COLLECTIONS_QUERY = `
  query {
    collections(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          image {
            src: originalSrc
          }
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
      }
    }
  }
`;

export async function GET() {
  try {
    const response = await axios.post(
      SHOPIFY_API_URL,
      { query: GET_COLLECTIONS_QUERY },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
          "Content-Type": "application/json",
        },
      }
    );

    // Flatten the response to return an array of collection objects
    const rawCollections = response.data.data.collections.edges;
    const collections = rawCollections.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      descriptionHtml: edge.node.descriptionHtml,
      image: edge.node.image,
      products: edge.node.products.edges,
    }));

    return NextResponse.json(collections, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
