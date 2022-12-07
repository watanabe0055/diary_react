import React, { useState } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";

//外部ライブラリ
import moment from "moment";

//マテリアルUI
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

export default function DiaryCard(props: any) {
  const diaryDeteils: any = props.diaryDetils;

  //getAllDiaryからprops（オブジェクト）を受け取って、mapで回す
  const diaryList: any = Object.keys(diaryDeteils).map(function (key, index) {
    return (
      <Card key={index} sx={{ minWidth: 360, maxWidth: 800 }}>
        <CardContent>
          <Typography sx={{ mb: 0.5 }} color="text.secondary">
            {moment(diaryDeteils[key].created_at).format("YYYY-MM-DD")}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {diaryDeteils[key].title}
          </Typography>
          <Typography variant="h5" component="div">
            {diaryDeteils[key].content}
          </Typography>
        </CardContent>
        <CardActions>
          <div>
            <Link
              to={`/diary/${diaryDeteils[key].id}`}
              state={{ diary_id: diaryDeteils[key].id }}
            >
              <Button variant="outlined" size="medium">
                詳細
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    );
  });
  return (
    <>
      <div>{diaryList}</div>
    </>
  );
}
