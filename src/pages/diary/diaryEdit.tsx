//Reactコンポネート
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//自作コンポーネント
import Error from "../error";
import { setDiaryEditPageTitle } from "../../modules/setPageTitle";
import Header from "../../atom/header";
import { diaryEdit } from "../../modules/diary/diaryEdit";

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

export default function DiaryEdit() {
  //ページのタイトルを設定
  setDiaryEditPageTitle();

  const params = useParams();
  const navigation = useNavigate();

  const [diaryId, setDiaryId] = useState(0);
  const [title, setTitle] = useState("");
  const [titleCount, setTitleCount] = useState(100);
  const [titleValidation, setTitleValidation] = useState("");
  const [content, setContent] = useState("");
  const [countCount, setCountCount] = useState(4000);
  const [contentValidation, setContentValidation] = useState("");
  const [createdat, setCreatedat] = useState("");
  const [isStatus, setIsStatus] = useState(true);

  const handleOnEditTitle = (title: string) => {
    setTitle(title);
    setTitleCount(100 - title.length);
  };

  const handleOnEditContent = (content: string) => {
    setContent(content);
    setCountCount(4000 - content.length);
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
  //即時実行してます
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

          setTitleCount(100 - diaryDetail[0].title.length);
          setCountCount(4000 - diaryDetail[0].content.length);
        })
        .catch(function (error) {
          setIsStatus(false);
        });
    }, []);
  }
  UseFeathDiaryDetail();

  //編集のオンクリックイベント
  const onClickDiaryEdit = async () => {
    const resuponse: any = await diaryEdit(diaryId, title, content);
    console.log(resuponse[0]);
    if (resuponse[0] === 200) {
      navigation("/diary", {
        state: `${resuponse[1]}の編集に成功しました！！`,
      });
    } else if (resuponse[0] != 200) {
      console.log("ヴァリデーション");
      setTitleValidation(resuponse[0]);
      setContentValidation(resuponse[1]);
    }
  };

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
          <ErrorMessage>{titleValidation}</ErrorMessage>
          <Counter>後{titleCount}文字入力可能です</Counter>
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

        <ErrorMessage>{contentValidation}</ErrorMessage>
        <Counter>後{countCount}文字入力可能です</Counter>
        <Button
          onClick={() => onClickDiaryEdit()}
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
        {Render()}
      </Grid>
    </>
  );
}
