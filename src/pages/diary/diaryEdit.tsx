import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Error from "../error";
import { setDiaryEditPageTitle } from "../../modules/setPageTitle";

import axios from "axios";
import Cookies from "js-cookie";

//マテリアル UI
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

const TextFiledBlock = styled.div`
  margin-top: 20px;
`;

export default function DiaryEdit() {
  //ページのタイトルを設定
  setDiaryEditPageTitle();

  const params = useParams();
  const navigation = useNavigate();

  const [diaryId, setDiaryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdat, setCreatedat] = useState("");
  const [isStatus, setIsStatus] = useState(true);

  const handleOnEditTitle = (title: string) => {
    setTitle(title);
  };

  const handleOnEditContent = (content: string) => {
    setContent(content);
  };

  //devise認証用のヘッダー情報（apiを叩く時と同時はできない）
  const generalApiInterface = axios.create({
    baseURL: `http://localhost:3000/api/v1/diary/${Number(params.id)}`,
    headers: {
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      access_token: Cookies.get("access-token"),
    },
  });

  //現在登録されているデータを表示するために、詳細APIを叩く
  function UseFeathDiaryDetail() {
    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/v1/diary/${Number(params.id)}`, {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            access_token: Cookies.get("access-token"),
          },
        })
        .then((res) => {
          const diaryDetail: any = [res.data.diary];
          setDiaryId(diaryDetail[0].id);
          setTitle(diaryDetail[0].title);
          setContent(diaryDetail[0].content);
          setCreatedat(diaryDetail[0].created_at);
          setIsStatus(true);
        })
        .catch(function (error) {
          console.log(error.response.data);
          setIsStatus(false);
        });
    }, []);
  }

  //フロントに400を出すか判断する
  const Render = () => {
    if (isStatus) {
      return <>{SuccsesElm}</>;
    } else {
      return <>{Error()}</>;
    }
  };

  //diary詳細APIで２００が返ってきた際に返すエレメント
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
            onChange={(e) => handleOnEditTitle(e.target.value)}
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
            onChange={(e) => handleOnEditContent(e.target.value)}
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
          onClick={() => UseFeathDiaryEdit()}
          variant="contained"
          endIcon={<SendIcon />}
        >
          送信
        </Button>
      </div>
    </>
  );

  //TODO:認証が通らないので一時的にBEの認証を削除
  //編集APIの実行
  function UseFeathDiaryEdit() {
    generalApiInterface
      .patch(`http://localhost:3000/api/v1/diary/${Number(params.id)}`, {
        headers: {
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          access_token: Cookies.get("access-token"),
        },
        title: title,
        content: content,
        //emotion_id: "2",
      })
      .then((res) => {
        navigation("/diary", { state: "Diaryの編集に成功しました！！" });
      })
      .catch(function (error) {
        console.error(error.response.data);
      });
  }
  UseFeathDiaryDetail();
  return <>{Render()}</>;
}
