import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import CounDown from "./Countdown";
const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <CounDown />
    </main>
  );
};

export default Home;
