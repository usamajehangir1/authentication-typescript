import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  // Add other properties as needed
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

        const data = await response.json();
        setProducts(data.data);
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
      <Grid container spacing={10}>
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
                    {/* Add the price or any other details here */}
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
