import React, { useState, useEffect } from "react";
import { Grid, InputBase, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ProductSearch: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://api.stripe.com/v1/products", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
        },
      });

      if (!response.ok) {
        throw new Error(
          `API error (${response.status}): ${response.statusText}`
        );
      }

      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "10vh" }}
    >
      <Grid item xs={12} sm={4}></Grid>
      <Grid item xs={12} sm={4}>
        <div style={{ display: "flex" }}>
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product: any) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
export default ProductSearch;
