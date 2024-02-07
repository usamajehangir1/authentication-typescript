import React from "react";
import Mainpage from "./components/Mainpage";
import ProductPage from "../products/ProductPage";
import Marquee from "react-fast-marquee";
import ImagesList from "./components/ImageList";
import ProductSearch from "../products/ProductSearch";

const images: string[] = [
  "https://marketplace-mfe-dev.netsolapp.io/616fe9bc42eb781f5389.svg",
  "https://marketplace-mfe-dev.netsolapp.io/6f68120f1a34f46e7dc1.svg",
  "https://marketplace-mfe-dev.netsolapp.io/a41fafe1972e87cf3a77.svg",
  "https://marketplace-mfe-dev.netsolapp.io/18a9107c44dffca3a24b.svg",
  "https://marketplace-mfe-dev.netsolapp.io/bff526c4edb7a37084e2.svg",
  "https://marketplace-mfe-dev.netsolapp.io/01f35e32e98b2b153931.svg",
  "https://marketplace-mfe-dev.netsolapp.io/6db2c9b41921790f2cad.svg",
];

function Home(): JSX.Element {
  return (
    <>
      <Mainpage />
      <Marquee>
        <ImagesList images={images} />
      </Marquee>
      <ProductSearch />
      <ProductPage />
    </>
  );
}

export default Home;
