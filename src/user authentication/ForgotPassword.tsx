import React from "react";
import { useState, forwardRef, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Checkbox,
  Snackbar,
  Stack,
  Slide,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import bgimg from "../images/backimg.jpg";

// Define custom Alert component
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ForgotPassword = () => {
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

  const onSubmit = async (data: { email: string }) => {
    console.log(data);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props: any) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Password reset link sent.
        </Alert>
      </Snackbar>
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
                  <Slide direction="left" in={true} timeout={500}>
                    <Typography
                      component="h1"
                      variant="h1"
                      style={{ color: "#ffffff", fontSize: "38px" }}
                    >
                      Welcome to Reset Password
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
                        left: "30%",
                      }}
                    >
                      <Avatar sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Reset Password
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
                            label="Email"
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
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
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
                            Send Reset Link
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Login to your Account --{" "}
                              <span
                                style={{
                                  color: "#beb4fb",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/login");
                                }}
                              >
                                {" "}
                                Sign In
                              </span>
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body1"
                            component="span"
                            style={{ marginTop: "10px" }}
                          >
                            Go back to Homepage --{" "}
                            <span
                              style={{
                                color: "#beb4fb",
                                cursor: "pointer",
                              }}
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

export default ForgotPassword;
