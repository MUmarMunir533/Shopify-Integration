import { NextResponse } from "next/server";
import fetch from "node-fetch";

// Define an interface for the Shopify product response
interface ShopifyProductResponse {
  data: {
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          descriptionHtml: string;
          images: {
            edges: Array<{
              node: {
                src: string;
              };
            }>;
          };
          variants: {
            edges: Array<{
              node: {
                priceV2: {
                  amount: string;
                };
                compareAtPriceV2?: {
                  amount: string;
                } | null;
              };
            }>;
          };
        };
      }>;
    };
  };
}

// Get environment variables
const RAW_SHOPIFY_API_URL = process.env.SHOPIFY_DOMAIN_NAME;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN ?? "";

// Ensure environment variables are defined
if (!RAW_SHOPIFY_API_URL) {
  throw new Error("Missing SHOPIFY_DOMAIN_NAME in environment variables");
}
if (!SHOPIFY_ACCESS_TOKEN) {
  throw new Error("Missing SHOPIFY_ACCESS_TOKEN in environment variables");
}

// Construct the full API URL safely
const SHOPIFY_API_URL: string = RAW_SHOPIFY_API_URL.startsWith("http")
  ? `${RAW_SHOPIFY_API_URL}/api/2023-01/graphql.json`
  : `https://${RAW_SHOPIFY_API_URL}/api/2023-01/graphql.json`;

export async function GET() {
  const query = `
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
                  src
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

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Shopify API error: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    // Use type assertion here to tell TypeScript the shape of the response
    const data = (await response.json()) as ShopifyProductResponse;
    return NextResponse.json(data.data.products.edges, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
