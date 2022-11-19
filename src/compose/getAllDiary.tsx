import React from "react";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

import { Paper, Box } from "@mui/material";

export default function getAllDiary() {
  const onButtonClick = () => {
    axios
      .get("http://localhost:3000/api/v1/diary", {
        headers: {
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          access_token: Cookies.get("access-token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        // Cookieからトークンを削除しています
        console.log(error.response.data);
      });
  };
  onButtonClick();
  return (
    <>
      <div>getAllDiary</div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 900,
            height: 180,
          },
        }}
      >
        <Paper elevation={1}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Paper>
      </Box>
    </>
  );
}
