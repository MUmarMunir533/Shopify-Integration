import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {featureData.map((item, key) => (
          <div
            key={key}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">
              <Image src={item.img} alt={item.title} width={48} height={48} />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1 text-center">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
