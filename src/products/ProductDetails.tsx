import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import Marquee from "react-fast-marquee";

interface Product {
  name: string;
  description?: string;
  images?: string[];
  prices?: { id: string; price: number; nickname: string }[];
}

const stripePromise = loadStripe(
  "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
);

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<{
    id: string;
    price: number;
    nickname: string;
  } | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
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

        const prices = priceData.data.map((price: any) => ({
          id: price.id,
          price: price.unit_amount / 100,
          nickname: price.nickname,
        }));

        setProduct({
          ...productData,
          prices: prices,
        });
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

  const handleStartTrial = (price: {
    id: string;
    price: number;
    nickname: string;
  }) => {
    setSelectedPrice(price);
    setShowModal(true);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubscriptionPage = () => {
    navigate("/subscription");
  };

  if (!product) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const { name, description, images, prices } = product;

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" align="center" gutterBottom>
        <Marquee>{name}</Marquee>
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
        </CardContent>
      </Card>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        {prices &&
          prices.map((price) => (
            <Grid item key={price.id}>
              <Card sx={{ maxWidth: 400, margin: "auto" }}>
                <CardContent>
                  <Typography variant="h6">
                    {`${price.nickname}: $${price.price.toFixed(2)}`}
                  </Typography>
                  {!isLoggedIn && (
                    <Button onClick={handleSignIn} variant="contained">
                      Sign In to Start Free Trial
                    </Button>
                  )}
                  {isLoggedIn && !showPaymentForm && (
                    <Button
                      onClick={() => handleStartTrial(price)}
                      variant="contained"
                      color="primary"
                    >
                      Subscribe
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Modal open={showModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Checkout for {selectedPrice?.nickname} Package for {name}.
          </Typography>
          <Typography>
            Your total Checkout Amount is ${selectedPrice?.price}
          </Typography>
          <Button
            onClick={handleSubscriptionPage}
            variant="contained"
            color="primary"
          >
            Subscribe
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDetails;
