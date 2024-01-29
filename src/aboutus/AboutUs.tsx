import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FaLaptopCode, FaMobileAlt, FaVideo, FaSearch } from "react-icons/fa";

const AboutUsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        About Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              p: 2,
            }}
          >
            <FaLaptopCode style={{ fontSize: "3rem", marginBottom: "1rem" }} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Web Development
              </Typography>
              <Typography variant="body1">
                We specialize in creating modern and responsive websites using
                the latest web technologies.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              p: 2,
            }}
          >
            <FaMobileAlt style={{ fontSize: "3rem", marginBottom: "1rem" }} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                App Development
              </Typography>
              <Typography variant="body1">
                Our team crafts mobile applications for both iOS and Android
                platforms tailored to your specific needs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              p: 2,
            }}
          >
            <FaVideo style={{ fontSize: "3rem", marginBottom: "1rem" }} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Video Editing
              </Typography>
              <Typography variant="body1">
                We offer professional video editing services to enhance your
                videos and make them stand out.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              p: 2,
            }}
          >
            <FaSearch style={{ fontSize: "3rem", marginBottom: "1rem" }} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                SEO Optimization
              </Typography>
              <Typography variant="body1">
                Improve your website's visibility and ranking in search engine
                results with our SEO optimization services.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUsPage;
