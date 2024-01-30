import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number | null;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/products?limit=${productsPerPage}&offset=${
            (currentPage - 1) * productsPerPage
          }`,
          {
            headers: {
              Authorization: `Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B`,
            },
          }
        );

        const productsData = await response.json();

        // Fetch product prices
        const productsWithPrices = await Promise.all(
          productsData.data.map(async (product: any) => {
            const priceResponse = await fetch(
              `https://api.stripe.com/v1/prices?product=${product.id}`,
              {
                headers: {
                  Authorization: `Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B`,
                },
              }
            );
            const priceData = await priceResponse.json();
            const price = priceData.data[0]?.unit_amount / 100; // Convert to dollars
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              images: product.images,
              price: price || null,
            };
          })
        );

        setProducts(productsWithPrices);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const totalProducts: number = 7;
  const totalPages: number = Math.ceil(totalProducts / productsPerPage);

  const handlePagination = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/Login");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "70px" }}>
      <Typography variant="h4" gutterBottom>
        Available Services are Below!
      </Typography>
      <Grid container spacing={3}>
        {products.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6">
                    {product.price
                      ? `$${product.price.toFixed(2)}`
                      : "Price not available"}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBuyNow}
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Container>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          Previous Page
        </Button>
        <Typography variant="body1" style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next Page
        </Button>
      </Container>
    </Container>
  );
};

export default ProductPage;
