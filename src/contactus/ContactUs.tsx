import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import contactImage from "../images/contactimage.png";

const ContactUsForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} sx={{ height: "100%" }}>
          <img
            src={contactImage}
            alt="Contact"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h1" gutterBottom>
            Contact Us
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contact Number"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Company Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUsForm;
