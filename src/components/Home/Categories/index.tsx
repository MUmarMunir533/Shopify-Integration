"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FaThLarge, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";

const SingleItem = ({ item }) => {
  return (
    <Link href="/shop-with-sidebar" className="cursor-pointer">
      <div className="single-item p-4 flex flex-col items-center bg-gr">
        {item.image?.src ? (
          <div className="relative h-24 w-24 mb-4 rounded-full overflow-hidden bg-gray-3">
            <Image
              src={item.image.src}
              alt={item.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="h-24 w-24 mb-4 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <h3 className="text-lg font-semibold text-center inline-block border-b-4 border-transparent hover:text-blue-dark hover:border-blue-dark transition-all">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

const Categories = () => {
  const [collections, setCollections] = useState([]);
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideNext();
    }
  }, []);

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
      } catch (err) {
        console.error(err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-300">
        <div className="swiper categories-carousel common-carousel">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <FaThLarge className="text-2xl" />
                Categories
              </span>
              <h2 className="font-semibold text-lg xl:text-heading-5 text-dark">
                Browse by Category
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="swiper-button-prev bg-white p-2 rounded-full shadow hover:shadow-md"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="swiper-button-next bg-white p-2 rounded-full shadow hover:shadow-md"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            loop={true}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {collections.map((item, index) => (
              <SwiperSlide key={index}>
                <SingleItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
