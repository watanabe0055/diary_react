import React, { useState, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

import { Card, Grid, Button, Stack } from "@mui/material";

export default function GetDiiaryDetail() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdat, setCreatedat] = useState("");

  type diaryInterface = [
    id: number,
    user_id: number,
    emotion_id: number,
    diary_hashtag_id: number,
    title: string,
    content: string
  ];

  async function UseFeathDiaryDetail() {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/v1/diary/105`, {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            access_token: Cookies.get("access-token"),
          },
        })
        .then((res) => {
          const diaryDetail: any = [res.data.diary];
          console.log(diaryDetail);
          setTitle(diaryDetail[0].title);
          setContent(diaryDetail[0].content);
          setCreatedat(diaryDetail[0].created_at);
        })
        .catch(function (error) {
          console.log(error);
          return;
        });
    }, []);
  }
  UseFeathDiaryDetail();
  return (
    <>
      <div> Diary詳細</div>
      <Card sx={{ minWidth: 360, maxWidth: 1300, padding: 3 }}>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <label>
                <p>作成日</p>
              </label>
            </Grid>
            <Grid item xs={4}>
              <h5>{moment(createdat).format("YYYY-MM-DD")}</h5>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <label>
                <p>タイトル</p>
              </label>
            </Grid>
            <Grid item xs={4}>
              <h5>{title}</h5>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <label>コンテンツ</label>
            </Grid>
            <Grid item xs={8}>
              <h5>{content}</h5>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ minWidth: 100 }}
              >
                編集
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="error" sx={{ minWidth: 100 }}>
                削除
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </Card>
    </>
  );
}
