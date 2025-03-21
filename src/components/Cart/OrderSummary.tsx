import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      const response = await fetch("/api/shopify-store-url");
      if (!response.ok) {
        console.error("Error fetching Shopify store URL");
        return;
      }
      const { shopifyStoreUrl } = await response.json();
      window.location.href = shopifyStoreUrl;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="lg:max-w-[455px] w-full">
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>
          </div>

          {cartItems.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div>
                <p className="text-dark">{item.title}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  ${item.discountedPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                ${totalPrice}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
