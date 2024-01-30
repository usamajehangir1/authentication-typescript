import React from "react";

const ImagesList: React.FC<{ images: string[] }> = ({ images }) => (
  <div style={{ display: "flex", gap: "100px" }}>
    {images.map((imageUrl, index) => (
      <img
        key={index}
        src={imageUrl}
        alt={`Image ${index}`}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
      />
    ))}
  </div>
);

export default ImagesList;
