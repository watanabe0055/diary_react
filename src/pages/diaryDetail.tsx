import React from "react";

import { Card, Grid, Button, Stack } from "@mui/material";

export default function diaryDetail() {
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
              <h5>2022-10-31</h5>
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
              <h5>初めての日記！</h5>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <label>コンテンツ</label>
            </Grid>
            <Grid item xs={8}>
              <h5>
                今日初めて雨が降りました！
                今日初めて雨が降りました！今日初めて雨が降りました！
                今日初めて雨が降りました！ 今日初めて雨が降りました！
                今日初めて雨が降りました！ 今日初めて雨が降りました！
                今日初めて雨が降りました！ 今日初めて雨が降りました！
                今日初めて雨が降りました！ 今日初めて雨が降りました！
                今日初めて雨が降りました！ 今日初めて雨が降りました！
                今日初めて雨が降りました！ 今日初めて雨が降りました！
              </h5>
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
