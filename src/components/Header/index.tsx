"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import { FaUser, FaShoppingCart, FaPhoneAlt, FaBars } from "react-icons/fa";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const logoData = {
    logo: "Logo",
    imageUrl: "/images/logo/logo.svg",
  };

  const { openCartModal } = useCartModalContext();
  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const handleOpenCartModal = () => {
    openCartModal();
  };

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
          stickyMenu && "shadow"
        }`}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div
            className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
              stickyMenu ? "py-4" : "py-6"
            }`}
          >
            <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
              <Link className="flex-shrink-0" href="/">
                <Image
                  src={logoData.imageUrl}
                  alt={logoData.logo}
                  width={219}
                  height={36}
                />
              </Link>
              <div className="max-w-[475px] w-full">
                <form>
                  <div className="relative max-w-[333px] sm:min-w-[333px] w-full">
                    <input
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      type="search"
                      name="search"
                      id="search"
                      placeholder="I am shopping for..."
                      autoComplete="off"
                      className="custom-search w-full rounded-[5px] bg-gray-1 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                    />
                    <button
                      id="search-btn"
                      aria-label="Search"
                      className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                      type="button"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex w-full lg:w-auto items-center gap-7.5">
              <div className="hidden xl:flex items-center gap-3.5">
                <FaPhoneAlt className="text-blue" />
                <div>
                  <span className="block text-2xs text-dark-4 uppercase">
                    24/7 SUPPORT
                  </span>
                  <p className="font-medium text-custom-sm text-dark">
                    (+92) 302-7596-283
                  </p>
                </div>
              </div>

              <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

              <div className="flex w-full lg:w-auto justify-between items-center gap-5">
                <div className="flex items-center gap-5">
                  <Link href="/signin" className="flex items-center gap-2.5">
                    <FaUser className="text-blue" />
                    <div>
                      <span className="block text-2xs text-dark-4 uppercase">
                        account
                      </span>
                      <p className="font-medium text-custom-sm text-dark">
                        Sign In
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={handleOpenCartModal}
                    className="flex items-center gap-2.5"
                  >
                    <span className="inline-block relative">
                      <FaShoppingCart className="text-blue" />
                      <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                        {product.length}
                      </span>
                    </span>

                    <div>
                      <span className="block text-2xs text-dark-4 uppercase">
                        cart
                      </span>
                      <p className="font-medium text-custom-sm text-dark">
                        ${totalPrice}
                      </p>
                    </div>
                  </button>
                </div>

                <button
                  id="Toggle"
                  aria-label="Toggler"
                  className="xl:hidden block"
                  onClick={() => setNavigationOpen(!navigationOpen)}
                >
                  <FaBars className="text-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-3">
          <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
            <div className="flex items-center justify-between">
              <div
                className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                  navigationOpen
                    ? "bg-white shadow-lg border border-gray-3 h-auto max-h-[400px] overflow-y-scroll rounded-md p-5"
                    : ""
                }`}
              >
                <nav>
                  <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                    {menuData.map((menuItem, i) =>
                      menuItem.submenu ? (
                        <Dropdown
                          key={i}
                          menuItem={menuItem}
                          stickyMenu={stickyMenu}
                        />
                      ) : (
                        <li
                          key={i}
                          className="group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                        >
                          <Link
                            href={menuItem.path}
                            className={`hover:text-blue text-custom-sm font-medium text-dark flex ${
                              stickyMenu ? "xl:py-4" : "xl:py-6"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
