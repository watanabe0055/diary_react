import React, { useState, useEffect } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import { setDiaryIndexPageTitle } from "../../modules/setPageTitle";

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

export default function DiaryCard(props: any) {
  //ページタイトルの設定
  setDiaryIndexPageTitle();

  const diaryDeteils: any = props.diaryDetils;

  //getAllDiaryからprops（オブジェクト）を受け取って、mapで回す
  const diaryList: any = Object.keys(diaryDeteils).map(function (key, index) {
    //タイトルは13文字で、コンテンツは30文字までしか表示しないでほこっりは省略する
    if (diaryDeteils[key].title.length >= 16) {
      diaryDeteils[key].title =
        diaryDeteils[key].title.substring(0, 16) + "...";
    }
    if (diaryDeteils[key].content.length >= 30) {
      diaryDeteils[key].content =
        diaryDeteils[key].content.substring(0, 30) + "...";
    }

    return (
      <Style_Card key={index}>
        <Card
          sx={{
            padding: "12px",
            "@media screen and (max-width:480px)": {
              width: "340px",
            },
            "@media screen and (min-width:768px)": {
              width: "720px",
            },
            "@media screen and (min-width:990px)": {
              width: "1300px",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              {moment(diaryDeteils[key].created_at).format("YYYY-MM-DD")}
            </Typography>
            <Typography
              sx={{ fontSize: 20 }}
              variant="h5"
              component="div"
              gutterBottom
            >
              {diaryDeteils[key].title}
            </Typography>
            <Typography
              sx={{ fontSize: 16 }}
              variant="h5"
              component="div"
              gutterBottom
            >
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

  return (
    <>
      <div>{diaryList}</div>
    </>
  );
}
