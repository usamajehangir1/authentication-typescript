import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUsForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_7dzlimw", "template_5cd4t0e", form.current, {
        publicKey: "K_AIf7LQwwB884xPH",
      })
      .then(
        () => {
          toast.success("Email sent successfully!");
        },
        (error) => {
          toast.error("Failed to send email.");
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <Box maxWidth="sm" mx="auto" my={8}>
      <ToastContainer />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <PhoneIcon sx={{ fontSize: 60, color: "primary" }} />
          <EmailIcon sx={{ fontSize: 60, color: "primary" }} />
        </Grid>
        <Grid item xs={12}>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              name="user_name"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              variant="outlined"
              name="user_email"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contact Number"
              variant="outlined"
              name="contact_number"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              name="message"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsForm;
