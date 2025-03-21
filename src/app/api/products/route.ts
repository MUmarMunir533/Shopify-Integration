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

const SHOPIFY_API_URL: string = shopifyDomainName.startsWith("http")
  ? `${shopifyDomainName}/api/2023-01/graphql.json`
  : `https://${shopifyDomainName}/api/2023-01/graphql.json`;

// Original query for fetching products without filtering
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

// Query for fetching products by collection id (passed as variable $id)
const GET_PRODUCTS_BY_COLLECTION_QUERY = `
  query ($id: ID!) {
    node(id: $id) {
      ... on Collection {
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
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    let response;
    if (category) {
      // Fetch products for a specific collection using its id
      response = await axios.post(
        SHOPIFY_API_URL,
        {
          query: GET_PRODUCTS_BY_COLLECTION_QUERY,
          variables: { id: category },
        },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
            "Content-Type": "application/json",
          },
        }
      );
      // Extract products from the collection node
      const products = response.data.data.node.products.edges;
      return NextResponse.json(products, { status: 200 });
    } else {
      // Use original functionality when no category filter is provided
      response = await axios.post(
        SHOPIFY_API_URL,
        { query: GET_PRODUCTS_QUERY },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": shopifyAccessToken,
            "Content-Type": "application/json",
          },
        }
      );
      const products = response.data.data.products.edges;
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
