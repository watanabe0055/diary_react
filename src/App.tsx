import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./module/header";
import Login from "./pages/login";
import DiaryIndex from "./pages/diaryIndex";
import DiaryDetail from "./pages/diaryDetail";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path={`/login/`} element={<Login />} />
          <Route path={`/diary/`} element={<DiaryIndex />} />
          <Route path={`/diary/:id`} element={<DiaryDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
