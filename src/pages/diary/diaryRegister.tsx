import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

//マテリアル UI
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

const TextFiledBlock = styled.div`
  margin-top: 20px;
`;

export default function DiaryRegister() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        navigation("/diary", { state: { flag: "succes" } });
        console.log(res);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  const handleOnCreatetTitle = (title: string) => {
    setTitle(title);
  };

  const handleOnCreatetContent = (content: string) => {
    setContent(content);
  };

  const SuccsesElm = (
    <>
      <div>
        <TextFiledBlock>
          <TextField
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
        </TextFiledBlock>
        <TextFiledBlock>
          <TextField
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
        </TextFiledBlock>
        <Button
          onClick={() => UseFeathDiaryCreate()}
          variant="contained"
          endIcon={<SendIcon />}
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
