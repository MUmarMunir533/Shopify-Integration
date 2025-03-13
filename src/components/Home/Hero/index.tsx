import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#E5EAF4] pt-32 sm:pt-36 lg:pt-40 xl:pt-44 pb-10 sm:pb-12 lg:pb-14 xl:pb-16">
      {/* Carousel: Centered with extra margins */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="relative z-10 rounded-lg bg-white overflow-hidden mt-8">
          {/* Background shapes */}
          <Image
            src="/images/hero/hero-bg.png"
            alt="hero bg shapes"
            className="absolute right-0 bottom-0 -z-10"
            width={534}
            height={520}
          />
          <HeroCarousel />
        </div>
      </div>

      {/* Card Section: Placed below the carousel */}
      <div className="w-full mt-8 px-6 md:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row gap-7">
          {/* Card 1 */}
          <div className="w-full sm:w-1/2 relative rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h2 className="font-semibold text-dark text-xl sm:text-2xl mb-2">
                  <a href="#">iPhone 14 Plus &amp; 14 Pro Max</a>
                </h2>
                <div>
                  <p className="font-medium text-dark-4 text-base mb-1">
                    Limited time offer
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-red text-xl">$699</span>
                    <span className="font-medium text-dark-4 text-lg line-through">
                      $999
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <Image
                  src="/images/hero/hero-02.png"
                  alt="iPhone image"
                  width={150}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full sm:w-1/2 relative rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h2 className="font-semibold text-dark text-xl sm:text-2xl mb-2">
                  <a href="#">Wireless Headphone</a>
                </h2>
                <div>
                  <p className="font-medium text-dark-4 text-base mb-1">
                    Limited time offer
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-red text-xl">$699</span>
                    <span className="font-medium text-dark-4 text-lg line-through">
                      $999
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <Image
                  src="/images/hero/hero-01.png"
                  alt="Headphone image"
                  width={150}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Features */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
