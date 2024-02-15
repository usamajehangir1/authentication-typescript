import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Registerapi, createStripeCustomer } from "./services/Registerapi";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

const schema = yup.object({
  username: yup.string().min(3).max(10).required(),
  password: yup.string().min(3).required(),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup.string().email().required(),
});

interface FormData {
  username: string;
  password: string;
  confirmpassword: string;
  email: string;
}

const Register: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState("");
  const { error: registerError, isLoading: isRegistering } = useQuery(
    ["register", email],
    () => Registerapi({ email, password }),
    { enabled: clicked }
  );

  const {
    error: stripeError,
    isLoading: isCreatingCustomer,
    data: createdCustomerData,
  } = useQuery(
    ["createCustomer", email],
    () => createStripeCustomer(email, username),
    { enabled: !registerError && clicked }
  );

  useEffect(() => {
    if (clicked && !registerError && !isRegistering) {
      setOpen(true);
      setClicked(false);
      console.log(clicked);
      setTimeout(() => navigate("/login"), 2000);
    } else if (registerError) {
      setClicked(false);
      toast.success("Registered successfully!");
    }
  }, [clicked, registerError]);

  useEffect(() => {
    if (createdCustomerData) {
      const createdCustomerEmail = createdCustomerData.email; // Extract the email address from the object
      localStorage.setItem("customerEmail", createdCustomerEmail); // Store the email address in local storage
    }
  }, [createdCustomerData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const OnSubmit: SubmitHandler<FormData> = (items) => {
    setEmail(items.email);
    setUsername(items.username);
    setPassword(items.password);
    setClicked(true);
    createStripeCustomer(email, "");
  };

  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          height: "100vh",
          color: "#fffffff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "-75%",
            height: "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Container>
            <Box height={25} />
            <Box
              sx={{
                position: "relative",
                top: "50%",
                left: "30%",
              }}
            >
              <Typography component="h1" variant="h4" color="black">
                {" "}
                Create Account
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }} />
            <form onSubmit={handleSubmit(OnSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register("username")}
                    fullWidth
                    label="Username"
                    size="small"
                    name="username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{ style: { color: "black" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("email")}
                    fullWidth
                    label="Email"
                    size="small"
                    name="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{ style: { color: "black" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("password")}
                    fullWidth
                    label="Password"
                    size="small"
                    name="password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{ style: { color: "black" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("confirmpassword")}
                    fullWidth
                    label="Confirm Password"
                    size="small"
                    name="confirmpassword"
                    type="password"
                    error={!!errors.confirmpassword}
                    helperText={errors.confirmpassword?.message}
                    InputProps={{ style: { color: "black" } }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                size="large"
                sx={{
                  mt: "15px",
                  mr: "20px",
                  borderRadius: 28,
                  color: "#ffffff",
                  minWidth: "170px",
                  backgroundColor: "#FF9A01",
                }}
              >
                Register
              </Button>
              <Typography
                variant="body1"
                component="span"
                style={{ marginTop: "10px", color: "black" }}
              >
                Already have an Account?{" "}
                <span
                  style={{ color: "#beb4fb", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </span>
              </Typography>
              <Typography
                variant="body1"
                component="span"
                style={{ marginTop: "10px", color: "black" }}
              >
                Go back to Homepage --
                <span
                  style={{ color: "#beb4fb", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {" "}
                  Homepage
                </span>
              </Typography>
            </form>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Register;
