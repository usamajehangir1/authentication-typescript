export const fetchProducts = async (
  currentPage: number,
  productsPerPage: number
) => {
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
  return response.json();
};

export const fetchPrices = async (productId: string) => {
  const priceResponse = await fetch(
    `https://api.stripe.com/v1/prices?product=${productId}`,
    {
      headers: {
        Authorization: `Bearer sk_test_51ObKHJKtMZDHrwRuYGMuTA9PtN9HHUe6S49TtO0bJSNVfjcOLGIq9f3ksl59qM2VPX6RXopTDSpJl46bWhjj1uIb00G67Csk2B`,
      },
    }
  );
  const priceData = await priceResponse.json();

  return priceData.data[0]?.unit_amount / 100;
};
