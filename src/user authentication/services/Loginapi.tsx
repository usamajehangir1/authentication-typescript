const Loginapi = async ({ email, password }) => {
  try {
    const url = "https://jwt-bearer-auth1.p.rapidapi.com/login";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "bd61944afdmsh6605bfe1720e716p1bed45jsn5bdf57fe32dc",
        "X-RapidAPI-Host": "jwt-bearer-auth1.p.rapidapi.com",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Login failed");
    }

    return result;
  } catch (error) {
    throw new Error("Login error: " + error.message);
  }
};

export { Loginapi };
