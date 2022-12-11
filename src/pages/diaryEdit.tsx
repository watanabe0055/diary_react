import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import { ConstructionOutlined } from "@mui/icons-material";

export default function DiaryEdit() {
  const params = useParams();

  const [diaryId, setDiaryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdat, setCreatedat] = useState("");

  const handleOnEditTitle = (title: string) => {
    setTitle(title);
  };

  const handleOnEditContent = (content: string) => {
    setContent(content);
  };

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
        })
        .catch(function (error) {
          console.log(error.response.data);
          return;
        });
    }, []);
  }

  //認証が通らないので一時的にBEの認証を削除
  function UseFeathDiaryEdit() {
    axios
      .patch(`http://localhost:3000/api/v1/diary/${Number(params.id)}`, {
        headers: {
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          access_token: Cookies.get("access-token"),
        },
        title: "test7abcd",
        content: "content_7abcd",
        emotion_id: "2",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.error(error.response.data);
      });
  }
  UseFeathDiaryDetail();
  return (
    <>
      <div>diaryEdit</div>
      <div>
        <p>タイトル</p>
        <input
          type="text"
          value={title}
          onChange={(e) => handleOnEditTitle(e.target.value)}
        />
      </div>
      <div>
        <p>コンテンツ</p>
        <textarea
          value={content}
          onChange={(e) => handleOnEditContent(e.target.value)}
        />
      </div>
      <button onClick={() => UseFeathDiaryEdit()}>Submit</button>
    </>
  );
}
