import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../payment/PaymentForm";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  description?: string;
  images?: string[];
  price?: number;
}

const stripePromise = loadStripe(
  "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
);

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await fetch(
          `https://api.stripe.com/v1/products/${productId}`,
          {
            headers: {
              Authorization:
                "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
            },
          }
        );
        const productData = await productResponse.json();
        setProduct(productData);

        const priceResponse = await fetch(
          `https://api.stripe.com/v1/prices?product=${productId}`,
          {
            headers: {
              Authorization:
                "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
            },
          }
        );
        const priceData = await priceResponse.json();
        const price = priceData.data[0].unit_amount;
        setProduct((prevProduct) => ({
          ...prevProduct,
          price: price / 100,
        }));
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [productId]);

  const handleStartTrial = () => {
    setShowPaymentForm(true);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  if (!product) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const { name, description, images, price } = product;

  return (
    <Container maxWidth="xl">
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
            {price !== undefined
              ? `$${price.toFixed(2)}`
              : "Price not available"}
          </Typography>
          {!isLoggedIn && (
            <Button onClick={handleSignIn} variant="contained">
              Sign In to Start Free Trial
            </Button>
          )}
          {isLoggedIn && !showPaymentForm && (
            <Button
              onClick={handleStartTrial}
              variant="contained"
              color="primary"
            >
              Start your free Trial
            </Button>
          )}
        </CardContent>
      </Card>
      {showPaymentForm && (
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </Container>
  );
};

export default ProductDetails;
