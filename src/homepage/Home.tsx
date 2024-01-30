import React from "react";
import Mainpage from "./components/Mainpage";
import ProductPage from "../products/ProductPage";

function Home(): JSX.Element {
  return (
    <>
    
      <Mainpage />
      <ProductPage />
    </>
  );
}

export default Home;
