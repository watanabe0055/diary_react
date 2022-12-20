import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

//マテリアル UI
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { count } from "console";

const TextFiledBlock = styled.div`
  margin-top: 20px;
`;

const Counter = styled.div`
  margin-left: 20px;
`;

export default function DiaryRegister() {
  const [title, setTitle] = useState("");
  const [titleCount, setTitleCount] = useState(100);
  const [content, setContent] = useState("");
  const [countCount, setCountCount] = useState(4000);

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
        console.log(res);
      })
      .catch(function (error) {
        console.log(error.response.data);
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
      <div>新規作成画面</div>
      <div>{SuccsesElm}</div>
    </>
  );
}
