export const fetchProductDetails = async (productId: string) => {
  try {
    const productResponse = await fetch(
      `https://api.stripe.com/v1/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B`,
        },
      }
    );

    if (!productResponse.ok) {
      throw new Error("Failed to fetch product details");
    }

    const productData = await productResponse.json();
    return productData;
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
};

export const fetchPrices = async (productId: string) => {
  try {
    const priceResponse = await fetch(
      `https://api.stripe.com/v1/prices?product=${productId}`,
      {
        headers: {
          Authorization: `Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B`,
        },
      }
    );

    if (!priceResponse.ok) {
      throw new Error("Failed to fetch prices");
    }

    const priceData = await priceResponse.json();
    console.log("this is my price data", priceData);

    return priceData.data.map((price: any) => ({
      id: price.id,
      price: price.unit_amount / 100,
      nickname: price.nickname,
    }));
  } catch (error) {
    console.error("Error fetching prices:", error.message);
    throw error;
  }
};
