"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";

interface ProductImageEdge {
  node: {
    src: string;
  };
}

interface ProductVariantNode {
  priceV2: {
    amount: string;
  };
  compareAtPriceV2?: {
    amount: string;
  } | null;
}

interface ProductVariantEdge {
  node: ProductVariantNode;
}

interface ProductNode {
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: ProductImageEdge[];
  };
  variants: {
    edges: ProductVariantEdge[];
  };
}

interface ProductEdge {
  node: ProductNode;
}

const NewArrival = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: ProductEdge[] = await res.json();

        // Transform the fetched data into the expected Product type.
        const formattedProducts: Product[] = data.map((edge: ProductEdge) => {
          const numericId = Number(edge.node.id.match(/\d+/)?.[0] || 0);
          const variant = edge.node.variants.edges[0]?.node;
          return {
            id: numericId,
            title: edge.node.title,
            description: edge.node.descriptionHtml, // Map descriptionHtml to description
            image: edge.node.images.edges[0]?.node.src || "", // Use first image's src or fallback to an empty string
            reviews: 0, // Default reviews value
            price: Number(variant?.priceV2.amount || 0), // Convert price to number
            discountedPrice: Number(
              variant?.compareAtPriceV2?.amount || variant?.priceV2.amount || 0
            ), // Use compareAtPrice if available, else fallback to price
          };
        });

        setProducts(formattedProducts);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section title */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              This Week's
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              New Arrivals
            </h2>
          </div>

          <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-blue-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {products.slice(0, 8).map((product) => (
            <ProductItem item={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
