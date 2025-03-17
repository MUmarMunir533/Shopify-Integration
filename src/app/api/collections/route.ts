// app/api/collections/route.ts
import { NextResponse } from "next/server";
import { shopifyAxiosClient } from "@/lib/ColShopifyClient";

const GET_COLLECTIONS_QUERY = `
  query {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            originalSrc
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const response = await shopifyAxiosClient.post("", {
      query: GET_COLLECTIONS_QUERY,
    });
    // Extract collection nodes from response
    const collections = response.data.data.collections.edges.map(
      (edge: { node: any }) => edge.node
    );
    return NextResponse.json(collections, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
