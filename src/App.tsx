import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./atom/header";
import Login from "./pages/login";
import DiaryIndex from "./pages/diaryIndex";
import DiaryDetail from "./pages/diaryDetail";
import DiaryEdit from "./pages/diaryEdit";
import Error from "./pages/error";

import { Button, Grid, Box } from "@mui/material";

function App() {
  return (
    <>
      <Header />

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <BrowserRouter>
          <Routes>
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/diary/`} element={<DiaryIndex />} />
            <Route path={`/diary/:id`} element={<DiaryDetail />} />
            <Route path={`/diary/:id/update`} element={<DiaryEdit />} />
            <Route path={`Error`} element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </>
  );
}

export default App;
