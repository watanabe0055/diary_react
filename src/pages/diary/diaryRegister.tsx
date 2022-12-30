//Reactコンポネート
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//自作コンポーネント
import Header from "../../atom/header";

//外部ライブラリ
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";

//マテリアル UI
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const TextFiledBlock = styled.div`
  margin-top: 20px;
`;

const Counter = styled.div`
  margin-left: 20px;
  color: #000;
`;

const ErrorMessage = styled.div`
  margin-left: 20px;
  color: red;
`;

export default function DiaryRegister() {
  const [title, setTitle] = useState("");
  const [titleCount, setTitleCount] = useState(100);
  const [titleValidation, setTitleValidation] = useState("");
  const [content, setContent] = useState("");
  const [countCount, setCountCount] = useState(4000);
  const [contentValidation, setContentValidation] = useState("");

  const navigation = useNavigate();

  const generalApiInterface = axios.create({
    baseURL: `http://localhost:3000/api/v1/diary/`,
    headers: {
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      access_token: Cookies.get("access-token"),
    },
  });

  function UseFeathDiaryCreate() {
    generalApiInterface
      .post(`http://localhost:3000/api/v1/diary/`, {
        title: title,
        content: content,
        emotion_id: "2",
      })
      .then((res) => {
        navigation("/diary", { state: "Diaryの作成に成功しました！！" });
        setTitleValidation("");
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        setTitleValidation("");
        setContentValidation("");
        if (errorResponse.message.title) {
          setTitleValidation("タイトルは1文字以上100文字以下にしてください");
        }
        if (errorResponse.message.content) {
          setContentValidation(
            "コンテンツは1文字以上4000文字以下にしてください"
          );
        }
      });
  }

  const handleOnCreatetTitle = (title: string) => {
    setTitle(title);
    setTitleCount(100 - title.length);
  };

  const handleOnCreatetContent = (content: string) => {
    setContent(content);
    setCountCount(4000 - content.length);
  };

  const SuccsesElm = (
    <>
      <div>
        <TextFiledBlock>
          <TextField
            inputProps={{ maxLength: 100 }}
            id="outlined-multiline-static"
            label="タイトル"
            multiline
            rows={2}
            value={title}
            onChange={(e) => handleOnCreatetTitle(e.target.value)}
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
          />
          <ErrorMessage>{titleValidation}</ErrorMessage>
          <Counter>後{titleCount}文字入力可能です</Counter>
        </TextFiledBlock>
        <TextFiledBlock>
          <TextField
            inputProps={{ maxLength: 4000 }}
            id="filled-multiline-static"
            label="コンテンツ"
            multiline
            rows={8}
            value={content}
            onChange={(e) => handleOnCreatetContent(e.target.value)}
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
          />
          <ErrorMessage>{contentValidation}</ErrorMessage>
          <Counter>後{countCount}文字入力可能です</Counter>
        </TextFiledBlock>
        <Button
          onClick={() => UseFeathDiaryCreate()}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginTop: "20px", width: "230px" }}
        >
          送信
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <div>新規作成画面</div>
        <div>{SuccsesElm}</div>
      </Grid>
    </>
  );
}
