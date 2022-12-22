import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "../images/logo.png";
import Login from "../pages/login/login";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const LogoImage = styled.img`
  width: 80px;
  height: auto;
`;

const HeaderMargin = styled.div`
  margin-bottom: 40px;
`;

export default function header() {
  return (
    <>
      <HeaderMargin>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <LogoImage src={Logo} alt="sample" />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DIARY
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </HeaderMargin>
    </>
  );
}
