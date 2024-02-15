import { v4 as uuidv4 } from "uuid";

const createStripeCustomer = async (email, name) => {
  console.log("========email: ", email, "======name: ", name);
  try {
    const response = await fetch("https://api.stripe.com/v1/customers", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&name=${name}`, // Pass the email and name to create the customer
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error.message || "Stripe customer creation failed"
      );
    }

    return result;
  } catch (error) {
    throw new Error("Stripe customer creation error: " + error.message);
  }
};

const Registerapi = async ({ email, password }) => {
  try {
    const url = "https://jwt-bearer-auth1.p.rapidapi.com/register";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "bd61944afdmsh6605bfe1720e716p1bed45jsn5bdf57fe32dc",
        "X-RapidAPI-Host": "jwt-bearer-auth1.p.rapidapi.com",
      },
      body: JSON.stringify({
        email,
        password,
        role: uuidv4(),
      }),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Registration failed");
    }

    return result;
  } catch (error) {
    throw new Error("Registration error:" + error.message);
  }
};

export { Registerapi, createStripeCustomer };
