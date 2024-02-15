import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { fetchProducts, fetchPrices } from "./services/productpageapi";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number | null;
}

const ProductPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 6;

  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery(
    ["products", currentPage],
    () => fetchProducts(currentPage, productsPerPage),
    { staleTime: 300000 }
  );

  useEffect(() => {
    if (productsData) {
      const fetchProductPrices = async () => {
        const productsWithPrices: Product[] = await Promise.all(
          productsData.data.map(async (product: any) => {
            const price = await fetchPrices(product.id);
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
      };
      fetchProductPrices();
    }
  }, [productsData]);

  const [products, setProducts] = useState<Product[]>([]);
  const totalProducts: number = 7;
  const totalPages: number = Math.ceil(totalProducts / productsPerPage);

  const handlePagination = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

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
                  <Typography variant="h5">
                    {product.price
                      ? `Starting from $${product.price.toFixed(2)}`
                      : "Price not available"}
                  </Typography>
                </CardContent>
                <CardContent></CardContent>
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
