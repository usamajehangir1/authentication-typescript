// import React from "react";
// import { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe, StripeError } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
// );

// const PaymentForm: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       if (cardElement) {
//         const { token } = await stripe.createToken(cardElement);

//         const response = await fetch("https://api.stripe.com/v1/customers", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization:
//               "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe",
//           },
//           body: `email=usama.jehangir@netsoltech.com&source=${token.id}`,
//         });

//         const result = await response.json();
//         console.log(result);
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//     </form>
//   );
// };

// export default PaymentForm;
