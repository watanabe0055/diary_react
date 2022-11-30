import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

import { Card, Grid, Button, Modal, Box, Typography } from "@mui/material";

interface State {
  diary_id: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GetDiiaryDetail() {
  const location = useLocation();
  const { diary_id } = location.state as State;

  console.log(diary_id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdat, setCreatedat] = useState("");

  //モーダル用のステート
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  type diaryInterface = [
    id: number,
    user_id: number,
    emotion_id: number,
    diary_hashtag_id: number,
    title: string,
    content: string,
    created_at: any,
    updated_at: any
  ];

  async function UseFeathDiaryDetail() {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/v1/diary/${diary_id}`, {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            access_token: Cookies.get("access-token"),
          },
        })
        .then((res) => {
          const diaryDetail: any = [res.data.diary];
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
              <Link to={`/diary/${2}/update`} state={{ diary_id: "105" }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ minWidth: 100 }}
                >
                  編集
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="error"
                sx={{ minWidth: 100 }}
                onClick={handleOpen}
              >
                削除
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                最終確認
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                この日記を削除しますか？
              </Typography>
              <Typography>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ minWidth: 100 }}
                >
                  削除
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ minWidth: 100 }}
                >
                  削除
                </Button>
              </Typography>
            </Box>
          </Modal>
        </div>
      </Card>
    </>
  );
}