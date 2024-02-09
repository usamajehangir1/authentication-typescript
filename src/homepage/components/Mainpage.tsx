import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";

function Mainpage(): JSX.Element {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Slide direction="left" in={true} timeout={500}>
        <Typography variant="h2" gutterBottom>
          Welcome to Services Portal
        </Typography>
      </Slide>
    </Grid>
  );
}

export default Mainpage;
