import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#E5EAF4] pt-32 sm:pt-36 lg:pt-40 xl:pt-44 pb-10 sm:pb-12 lg:pb-14 xl:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="relative z-10 rounded-lg bg-white overflow-hidden mt-8">
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
      <HeroFeature />
    </section>
  );
};

export default Hero;
