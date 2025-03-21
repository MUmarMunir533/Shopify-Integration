"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import { hero } from "@/lib/contentful";
import client from "@/lib/contentful";
import "swiper/css";
import "swiper/css/pagination";

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: hero });
        setSlides(data.heroCollection.items);
      } catch (error) {
        console.error("Error fetching hero carousel data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between py-6 sm:py-0">
            <div className="w-full sm:w-1/2 px-4 sm:px-8 lg:px-12 py-4 sm:py-8">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <span className="block font-semibold text-2xl sm:text-4xl text-blue">
                  {slide.discount || "30%"}
                </span>
                <span className="block text-dark text-base sm:text-lg">
                  Sale
                  <br />
                  Off
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                <a href="#">{slide.title}</a>
              </h1>

              <p className="mb-4">{slide.description}</p>

              <a
                href={slide.link || "#"}
                className="inline-flex font-medium text-white text-base rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue"
              >
                Shop Now
              </a>
            </div>

            <div className="w-full sm:w-1/2 flex justify-center">
              {slide.image?.url && (
                <Image
                  src={slide.image.url}
                  alt={slide.title}
                  width={351}
                  height={358}
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
