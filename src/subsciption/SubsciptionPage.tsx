import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
);

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/customers/cus_PRhyD5g5m8dzFU",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
            },
          }
        );
        const customerData = await response.json();
        setCustomerDetails(customerData);
      } catch (error) {
        console.error("Error fetching customer details:", error.message);
      }
    };

    const fetchPaymentMethod = async () => {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_methods/",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
            },
          }
        );
        const paymentMethodData = await response.json();
        setPaymentMethod(paymentMethodData);
      } catch (error) {
        console.error("Error fetching payment method:", error.message);
      }
    };

    fetchCustomerDetails();
    fetchPaymentMethod();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Verify your Details Below
      </Typography>
      <Card>
        <CardContent>
          {customerDetails && (
            <Typography variant="body1" gutterBottom>
              You are {customerDetails.email} user.
            </Typography>
          )}
          {paymentMethod &&
            paymentMethod.data &&
            paymentMethod.data.length > 0 && (
              <Typography variant="body1" gutterBottom>
                Your payment method: {paymentMethod.data[0].card.brand} ending
                in {paymentMethod.data[0].card.last4}.
              </Typography>
            )}
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            {errorMessage && (
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe || isLoading}
              sx={{ marginTop: 2 }}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

const SubscriptionPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionForm />
    </Elements>
  );
};

export default SubscriptionPage;
