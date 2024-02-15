import React, { useState, useEffect } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerEmail = localStorage.getItem("customerEmail");

        if (customerEmail) {
          const customerResponse = await fetch(
            `https://api.stripe.com/v1/customers?email=${customerEmail}`,
            {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
              },
            }
          );
          const customerData = await customerResponse.json();
          setCustomerData(customerData?.data?.[0]);
          setCustomerDetails(customerData?.data?.[0]);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error.message);
        setErrorMessage("Error fetching customer details. Please try again.");
      }
    };

    const fetchPaymentMethod = async () => {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_methods/card_1OeuQsKtMZDHrwRu8TGOVoHe",
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
        setErrorMessage("Error fetching payment method. Please try again.");
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

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      const attachPaymentMethodResponse = await fetch(
        `https://api.stripe.com/v1/payment_methods/${paymentMethod.id}/attach`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
          },
          body: `customer=${customerData.id}`,
        }
      );

      const attachPaymentMethodData = await attachPaymentMethodResponse.json();

      if (attachPaymentMethodData.error) {
        setErrorMessage(attachPaymentMethodData.error.message);
        setIsLoading(false);
        return;
      }

      const updateCustomerResponse = await fetch(
        `https://api.stripe.com/v1/customers/${customerData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
          },
          body: `invoice_settings[default_payment_method]=${paymentMethod.id}`,
        }
      );

      const updateCustomerData = await updateCustomerResponse.json();

      if (updateCustomerData.error) {
        setErrorMessage(updateCustomerData.error.message);
        setIsLoading(false);
        return;
      }

      const subscriptionParams = new URLSearchParams();
      subscriptionParams.append("customer", customerData.id);
      subscriptionParams.append(
        "items[0][price]",
        "price_1OeFeXKtMZDHrwRu4DnKmE5n"
      );
      subscriptionParams.append("payment_behavior", "allow_incomplete");
      subscriptionParams.append("default_payment_method", paymentMethod.id);

      const subscriptionResponse = await fetch(
        "https://api.stripe.com/v1/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
          },
          body: subscriptionParams.toString(),
        }
      );

      const subscriptionData = await subscriptionResponse.json();

      if (subscriptionData.error) {
        setErrorMessage(subscriptionData.error.message);
      } else {
        console.log("Subscription successful:", subscriptionData);
        toast.success("Successfully Subscribed!");
      }
    } catch (error) {
      console.error("Error creating subscription:", error.message);
      setErrorMessage("Error creating subscription. Please try again.");
    }

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
              You are {customerDetails.email}.
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
      <ToastContainer />
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
