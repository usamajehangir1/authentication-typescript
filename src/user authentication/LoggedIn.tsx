import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../payment/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeError } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
);

const LoggedIn: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {authenticated ? (
        <div>
          <Typography variant="h4" align="center">
            You are now successfully logged in!
          </Typography>

          <Typography variant="h6" mt={2} mb={2} align="center">
            Enter your card details for buying the car!
          </Typography>

          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>

          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Typography variant="h4" align="center">
          You are Logged Out.
        </Typography>
      )}
    </Box>
  );
};

export default LoggedIn;
