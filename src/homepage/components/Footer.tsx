import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate("/ContactUs");
  };

  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(73,73,73,1) 52%, rgba(255,255,255,1) 100%);",
      }}
    >
      <Toolbar>
        <Tooltip title="Mail">
          <IconButton color="inherit">
            <MailOutlineIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" sx={{ mx: 2, color: "white" }}>
          For inquiries, email us directly at: usama.jehangir@netsoltech.com
        </Typography>
        <Typography variant="body2" sx={{ mx: 2, color: "white" }}>
          For inquiries, call us directly at: +923247607149
        </Typography>
        <Typography variant="body2" sx={{ mx: 2, color: "white" }}>
          OR
        </Typography>
        <Button variant="contained" color="primary" onClick={handleContactUs}>
          Contact Us
        </Button>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
