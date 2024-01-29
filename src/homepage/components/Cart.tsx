import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
);

interface Item {
  name: string;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Item[]>([]);

  const handleCheckout = async () => {
    // Create a checkout session with Stripe
    const stripe: Stripe | null = await stripePromise;

    if (!stripe) {
      console.error("Failed to load Stripe.");
      return;
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    const session = await response.json();

    // Redirect to Stripe checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // Handle error
      console.error(result.error.message);
    }
  };

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemToRemove: Item) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
