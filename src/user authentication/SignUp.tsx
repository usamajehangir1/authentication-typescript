import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

type FormValues = {
  name: string;
  email: string;
};

const SignupForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const stripe = await loadStripe("your_public_stripe_key");
      const response = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers: {
          Authorization: "Bearer your_secret_stripe_key",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data).toString(),
      });

      const customer = await response.json();
      console.log(customer);
      setLoading(false);
    } catch (error) {
      console.error("Error creating customer:", error);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                {...register("name", { required: true })}
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                {...register("email", { required: true })}
                autoComplete="email"
              />
            </Grid>
          </Grid>
          {errors.email && <span>Email is required</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
