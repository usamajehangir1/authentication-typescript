// import { useQuery } from "react-query";
// const navigate = useNavigate();
// import { useNavigate } from "react-router-dom";
// const [open, setOpen] = useState(false);

// const Loginapi = async ({ email, password }) => {
//   try {
//     const url = "https://jwt-bearer-auth1.p.rapidapi.com/login";
//     const options = {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         "Content-Type": "application/json",
//         "X-RapidAPI-Key": "bd61944afdmsh6605bfe1720e716p1bed45jsn5bdf57fe32dc",
//         "X-RapidAPI-Host": "jwt-bearer-auth1.p.rapidapi.com",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     };

//     const response = await fetch(url, options);
//     const result = await response.text();
//     const data = JSON.parse(result);
//     const token = data.token;
//     localStorage.setItem("token", token);
//     if (token) {
//       setOpen(true);
//       navigate("/");
//     }
//   } catch (error) {
//     console.error(error);

// export { Loginapi };
// }
