import React from "react";
import ResponsiveAppBar from "./components/Header";
import Mainpage from "./components/Mainpage";
import ProductPage from "../products/ProductPage";
import Footer from "./components/Footer";

function Home(): JSX.Element {
  return (
    <>
      <ResponsiveAppBar />
      <Mainpage />
      <ProductPage />
      <Footer />
    </>
  );
}

export default Home;
