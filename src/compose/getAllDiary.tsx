import React from "react";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

import { Paper, Box } from "@mui/material";
import { json } from "stream/consumers";

export default function getAllDiary() {
  type diaryInterface = [
    id: number,
    user_id: number,
    emotion_id: number,
    diary_hashtag_id: number,
    title: string,
    content: string
  ];

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
        const diaries: diaryInterface[] = [res.data.diary];
        const diary: any = diaries[0].map((diary: any) => {
          return (
            <Paper key={diary.id} elevation={1}>
              {diary}
            </Paper>
          );
        });
      })
      .catch(function (error) {
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
      ></Box>
    </>
  );
}
