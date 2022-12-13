import React, { useState, useEffect } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

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

const Style_Card = styled.div`
  margin-top: 20px;
`;

const Style_Card_Center = styled.div`
  display: flex;
  justify-content: center;
`;

export default function DiaryCard(props: any) {
  const diaryDeteils: any = props.diaryDetils;

  //getAllDiaryからprops（オブジェクト）を受け取って、mapで回す
  const diaryList: any = Object.keys(diaryDeteils).map(function (key, index) {
    //タイトルは13文字で、コンテンツは30文字までしか表示しないでほこっりは省略する
    if (diaryDeteils[key].title.length >= 13) {
      diaryDeteils[key].title =
        diaryDeteils[key].title.substring(0, 13) + "...";
    }
    if (diaryDeteils[key].content.length >= 30) {
      diaryDeteils[key].content =
        diaryDeteils[key].content.substring(0, 30) + "...";
    }
    return (
      <Style_Card key={index}>
        <Card
          sx={{
            "@media screen and (min-width:1000px)": {
              width: "1300px",
            },
            "@media screen and (max-width:600px)": {
              width: ".300pxm",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              {moment(diaryDeteils[key].created_at).format("YYYY-MM-DD")}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
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
      </Style_Card>
    );
  });

  function UseSetDocumentTitle() {
    document.title = process.env.REACT_APP_TITLE_DIARY_INDEX || "読み込み失敗";
    return;
  }
  UseSetDocumentTitle();
  return (
    <>
      <div>{diaryList}</div>
    </>
  );
}
