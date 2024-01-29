import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";

interface Product {
  name: string;
  description?: string;
  images?: string[];
  price?: number;
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B`,
            },
          }
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    // Add your logic here for adding the product to the cart
  };

  if (!product) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const { name, description, images, price } = product;

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        {name}
      </Typography>
      <Card sx={{ maxWidth: 400, margin: "auto" }}>
        <CardMedia
          component="img"
          height="200"
          image={images?.[0] || ""}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description || "No description available"}
          </Typography>
          <Typography variant="h6">
            ${price?.toFixed(2) || "Price not available"} per Hour
          </Typography>
          <Button onClick={handleAddToCart} variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
