"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import ProductItem from "../Common/ProductItem";
import {
  FiMenu,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  reviews: number;
  price: number;
  discountedPrice: number;
}

interface Collection {
  id: string;
  title: string;
  descriptionHtml: string;
  image: {
    src: string;
  };
  products?: any;
}

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleStickyMenu = () => setStickyMenu(window.scrollY >= 80);
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  useEffect(() => {
    if (productSidebar) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".sidebar-content")) {
          setProductSidebar(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [productSidebar]);

  // Fetch collections from Shopify
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections");
        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await res.json();
        setCollections(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchCollections();
  }, []);

  // Fetch products based on selected collection (category)
  useEffect(() => {
    const fetchProducts = async (category: string | null = null) => {
      setLoading(true);
      try {
        const url = `/api/products${category ? `?category=${category}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();

        // Transform fetched data to the expected Product type
        const formattedProducts: Product[] = data.map((edge: any) => {
          const numericId = Number(edge.node.id.match(/\d+/)?.[0] || 0);
          const variant = edge.node.variants.edges[0]?.node;
          return {
            id: numericId,
            title: edge.node.title,
            description: edge.node.descriptionHtml,
            image: edge.node.images.edges[0]?.node.src || "",
            reviews: 0, // Default reviews value; update if you add reviews
            price: Number(variant?.priceV2.amount || 0),
            discountedPrice: Number(
              variant?.compareAtPriceV2?.amount || variant?.priceV2.amount || 0
            ),
          };
        });

        setProducts(formattedProducts);
        setCurrentPage(1); // Reset to first page on category change
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(selectedCategory);
  }, [selectedCategory]);

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

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Breadcrumb
        title="Explore All Products"
        pages={["shop", "/", "shop with sidebar"]}
      />
      <section className="relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6] overflow-hidden">
        <div className="max-w-[1170px] mx-auto w-full px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="shadow-xl rounded-lg p-6 h-[600px] overflow-y-auto sidebar-content">
                <h3 className="text-xl font-bold mb-6 border-b pb-3">
                  Categories
                </h3>
                <ul className="space-y-3">
                  {/* Option to reset filter */}
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`flex items-center p-3 rounded-lg transition-all duration-300 w-full ${
                        !selectedCategory
                          ? "bg-blue-dark text-white hover:bg-blue-700 hover:scale-105"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <span className="mr-3">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          ></path>
                        </svg>
                      </span>
                      <span className="font-medium">All Categories</span>
                    </button>
                  </li>
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <button
                        onClick={() => setSelectedCategory(collection.id)}
                        className={`flex items-center p-3 rounded-lg transition-all duration-300 w-full ${
                          selectedCategory === collection.id
                            ? "bg-blue-dark text-white hover:bg-blue-700 hover:scale-105"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <span className="mr-3">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </span>
                        <span className="font-medium">{collection.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="rounded-lg bg-blue-dark text-white shadow-md flex items-center justify-between px-4 py-3 mb-6">
                <p>
                  Showing{" "}
                  <span className="text-white font-semibold">
                    {currentProducts.length} of {products.length}
                  </span>{" "}
                  Products
                </p>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setProductStyle("grid")}
                    aria-label="Grid View"
                    className={`p-2 rounded-md transition-all duration-200 ${
                      productStyle === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <FiGrid className="text-xl" />
                  </button>
                  <button
                    onClick={() => setProductStyle("list")}
                    aria-label="List View"
                    className={`p-2 rounded-md transition-all duration-200 ${
                      productStyle === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <FiList className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Products */}
              <div
                className={`grid gap-5 ${
                  productStyle === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col"
                }`}
              >
                {currentProducts.map((product) => (
                  <ProductItem item={product} key={product.id} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="bg-blue-dark text-white shadow-md rounded-md p-3 flex space-x-2">
                    <button
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      aria-label="Previous Page"
                      className="p-2 text-gray-400 hover:text-gray-600"
                      disabled={currentPage === 1}
                    >
                      <FiChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => handlePageChange(num)}
                          className={`px-3 py-1 rounded-md transition ${
                            num === currentPage
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-300"
                          }`}
                        >
                          {num}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      aria-label="Next Page"
                      className="p-2 text-gray-400 hover:text-gray-600"
                      disabled={currentPage === totalPages}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
