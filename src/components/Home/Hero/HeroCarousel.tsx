"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

const HeroCarousel = () => {
  // Define static image paths
  const slide1Src = "/images/hero/hero-01.png";
  const slide2Src = "/images/hero/hero-01.png";

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
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between py-6 sm:py-0">
          {/* Text Section */}
          <div className="w-full sm:w-1/2 px-4 sm:px-8 lg:px-12 py-4 sm:py-8">
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <span className="block font-semibold text-2xl sm:text-4xl text-blue">
                30%
              </span>
              <span className="block text-dark text-base sm:text-lg">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Headphone</a>
            </h1>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              ipsum at risus euismod lobortis in.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-base rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue"
            >
              Shop Now
            </a>
          </div>

          {/* Image Section */}
          <div className="w-full sm:w-1/2 flex justify-center">
            {slide1Src && (
              <Image
                src={slide1Src}
                alt="headphone"
                width={351}
                height={358}
                className="object-contain"
              />
            )}
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between py-6 sm:py-0">
          {/* Text Section */}
          <div className="w-full sm:w-1/2 px-4 sm:px-8 lg:px-12 py-4 sm:py-8">
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <span className="block font-semibold text-2xl sm:text-4xl text-blue">
                30%
              </span>
              <span className="block text-dark text-base sm:text-lg">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Smart Watch</a>
            </h1>

            <p className="mb-4">
              Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
              nec suscipit.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-base rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue"
            >
              Shop Now
            </a>
          </div>

          {/* Image Section */}
          <div className="w-full sm:w-1/2 flex justify-center">
            {slide2Src && (
              <Image
                src={slide2Src}
                alt="headphone"
                width={351}
                height={270}
                className="object-contain"
              />
            )}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
