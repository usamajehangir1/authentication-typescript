import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { loadStripe } from "@stripe/stripe-js";
import bgimg from "../images/backimg.jpg";
import toast from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const stripePromise = loadStripe(
  "pk_test_51ObKHJKtMZDHrwRuZeUnnHEPk2YVOiULNUya2iRp7flNyeboDcxojifgs4XeYQSitB7HQYYlY9BVjkhAJEpSJm8K00IVqLlNSe"
);

const Login: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    const { email, password } = data;
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

    // toast.error("Login failed. Please try again.");

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const data = JSON.parse(result);
      const token = data.token;
      localStorage.setItem("token", token);
      if (token) {
        setOpen(true);
        // toast.success("You have successfully logged in!");
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const TransitionLeft = (props: any) => {
    return <Slide {...props} direction="left" />;
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            height: "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Container>
                <Box height={-10} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundSize: "cover",
                    height: "70vh",
                    minHeight: "500px",
                    backgroundColor: "#000000",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: 1,
                  }}
                >
                  <Slide direction="right" in={true} timeout={500}>
                    <Typography
                      component="h1"
                      variant="h1"
                      style={{ color: "#ffffff", fontSize: "38px" }}
                    >
                      Welcome Back, Login
                    </Typography>
                  </Slide>
                </Box>
              </Container>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#000000",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box
                      sx={{
                        position: "relative",
                        top: "50%",
                        left: "37%",
                      }}
                    >
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            {...register("email", { required: true })}
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                          />
                          {errors.email && (
                            <span
                              style={{ color: "#f7d643", fontSize: "12px" }}
                            >
                              This field is required
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            {...register("password", { required: true })}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.password && (
                            <span
                              style={{ color: "#f7d643", fontSize: "12px" }}
                            >
                              This field is required
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <FormControlLabel
                              sx={{ width: "60%" }}
                              onClick={() => setRemember(!remember)}
                              control={<Checkbox checked={remember} />}
                              label="Remember me"
                            />
                            <Typography
                              variant="body1"
                              component="span"
                              onClick={() => {
                                navigate("/reset-password");
                              }}
                              style={{ marginTop: "10px", cursor: "pointer" }}
                            >
                              Forgot password?
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth={true}
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Sign in
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Not registered yet?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/Register");
                                }}
                              >
                                Create an Account
                              </span>
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body1"
                            component="span"
                            style={{ marginTop: "10px" }}
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
                        </Grid>
                      </Grid>
                    </form>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Login;
