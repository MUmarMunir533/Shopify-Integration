"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { updateproductDetails } from "@/redux/features/product-details";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const product = useAppSelector((state) => state.quickViewReducer.value);
  const [activePreview, setActivePreview] = useState(0);

  const imageSrc =
    (product as { image?: string })?.image ||
    product?.imgs?.previews?.[activePreview] ||
    "/images/default-product.png";

  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));
    openPreviewModal();
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        quantity,
      })
    );
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".modal-content")) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${
        isModalOpen ? "flex" : "hidden"
      } fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50 p-4`}
    >
      <div className="modal-content relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mt-12 max-h-[90vh] overflow-auto transform transition-all duration-300">
        <button
          onClick={closeModal}
          aria-label="Close Modal"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="flex flex-row sm:flex-col gap-2">
                {product?.imgs?.thumbnails?.map((img, key) => (
                  <button
                    key={key}
                    onClick={() => setActivePreview(key)}
                    className={`overflow-hidden rounded-md border transition-all duration-200 ${
                      activePreview === key
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img || ""}
                      alt="thumbnail"
                      width={60}
                      height={60}
                      className="object-cover w-14 h-14"
                    />
                  </button>
                ))}
              </div>
              <div className="relative bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                <button
                  onClick={handlePreviewSlider}
                  aria-label="Zoom Image"
                  className="absolute top-3 right-3 bg-white p-2 rounded shadow hover:bg-gray-200 z-10"
                >
                  <svg
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-4.553a2 2 0 10-2.828-2.828L12 7.172M9 21H5a2 2 0 01-2-2v-4m16 0l-4.553 4.553a2 2 0 002.828 2.828L21 19m-9-7a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>
                </button>
                <Image
                  src={imageSrc}
                  alt="Product Image"
                  width={300}
                  height={300}
                  className="object-contain w-72 h-72"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
            <span className="inline-block text-xs font-medium text-white bg-green-500 px-3 py-1 rounded-full">
              SALE 20% OFF
            </span>
            <h3 className="text-xl font-semibold text-gray-800">
              {product.title}
            </h3>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                4.7 Rating (5 reviews)
              </span>
            </div>
            <span className="text-gray-700">
              {(product as any).description || "No description available"}
            </span>
            <div className="flex flex-col items-center md:items-start space-y-2 w-full">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800">Price</h4>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.discountedPrice}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${product.price}
                  </span>
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800">
                  Quantity
                </h4>
                <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    aria-label="Decrease Quantity"
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    <svg
                      className="h-4 w-4 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <span className="w-10 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase Quantity"
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    <svg
                      className="h-4 w-4 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 pt-2">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-blue-dark text-white font-medium rounded-md hover:bg-blue-light transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
