import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useForm, SubmitHandler } from "react-hook-form";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface FormData {
  username: string;
  password: string;
  confirmpassword: string;
  email: string;
  mobile: number;
  gender: string;
}

const schema = yup.object({
  username: yup.string().min(3).max(10).required(),
  password: yup.string().min(3).required(),
  confirmpassword: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.number().positive().min(6).required(),
  gender: yup.string().required(),
});

const Register: React.FC = () => {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const { email, password } = data;
    const url = "https://jwt-bearer-auth1.p.rapidapi.com/register";
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
        role: uuidv4(),
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert>
      </Snackbar>
      <div
        style={{
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
                  <Slide direction="down" in={true} timeout={500}>
                    <Typography
                      component="h1"
                      variant="h1"
                      style={{ color: "#ffffff", fontSize: "48px" }}
                    >
                      Welcome New Users!
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
                    <Box height={25} />
                    <Box
                      sx={{
                        position: "relative",
                        top: "50%",
                        left: "30%",
                      }}
                    >
                      <Typography component="h1" variant="h4">
                        Create Account
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            {...register("username")}
                            fullWidth
                            label="Username"
                            size="small"
                            name="username"
                          />
                          {errors.username && (
                            <span
                              style={{ color: "#f7d643", fontSize: "12px" }}
                            >
                              {errors.username.message}
                            </span>
                          )}
                        </Grid>
                        {/* Other form fields go here */}
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
                      <Stack direction="row" spacing={2}>
                        <Typography
                          variant="body1"
                          component="span"
                          style={{ marginTop: "10px" }}
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

export default Register;
