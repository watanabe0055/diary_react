import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

import {
  Paper,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const useValue: any = (diaryTitle: string) => {
  console.log(diaryTitle);
  return;
};

export default function GetAllDiary() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  type diaryInterface = [
    id: number,
    user_id: number,
    emotion_id: number,
    diary_hashtag_id: number,
    title: string,
    content: string
  ];

  async function onButtonClick() {
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
        const diaryP: any = diaries[0].map((diary: any) => {
          console.log(diary);
          //setTitle(diary.title);
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }
  onButtonClick();
  return (
    <>
      <div>Diary一覧</div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Card sx={{ minWidth: 360, maxWidth: 500 }}>
          <CardContent>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              2022-11-25
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              タイトルです！
            </Typography>
            <Typography variant="h5" component="div">
              コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！コンテンツです！
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="medium">
              詳細
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Card sx={{ minWidth: 360, maxWidth: 500 }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              2022-11-25
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              タイトルです！
            </Typography>
            <Typography variant="h5" component="div">
              コンテンツです！
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="medium">
              詳細
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Card sx={{ minWidth: 360 }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              2022-11-25
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              タイトルです！
            </Typography>
            <Typography variant="h5" component="div">
              コンテンツです！
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="medium">
              詳細
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Card sx={{ minWidth: 360 }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              2022-11-25
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              タイトルです！
            </Typography>
            <Typography variant="h5" component="div">
              コンテンツです！
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="medium">
              詳細
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
