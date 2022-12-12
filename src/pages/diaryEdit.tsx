import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Error from "../pages/error";

import axios from "axios";
import Cookies from "js-cookie";

export default function DiaryEdit() {
  const params = useParams();

  const [diaryId, setDiaryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdat, setCreatedat] = useState("");
  const [isStatus, setIsStatus] = useState(false);

  const handleOnEditTitle = (title: string) => {
    setTitle(title);
  };

  const handleOnEditContent = (content: string) => {
    setContent(content);
  };

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
      </div>
    </>
  );

  //TODO:認証が通らないので一時的にBEの認証を削除
  //編集APIの実行
  function UseFeathDiaryEdit() {
    axios
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
        console.log(res.data);
      })
      .catch(function (error) {
        console.error(error.response.data);
      });
  }
  UseFeathDiaryDetail();
  return <>{Render()}</>;
}
