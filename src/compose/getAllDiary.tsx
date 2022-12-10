import React, { useState, useEffect } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";

//コンポーネント
import DiaryCard from "../atom/diaryCard";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

export default function GetAllDiary() {
  const [diaryDetils, setDiaryDetils] = useState("");

  type diaryInterface = [
    id: number,
    user_id: number,
    emotion_id: number,
    diary_hashtag_id: number,
    title: string,
    content: string
  ];

  async function useHandleFeatchAllDiary() {
    useEffect(() => {
      axios
        .get("http://localhost:3000/api/v1/diary", {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            access_token: Cookies.get("access-token"),
          },
        })
        .then((res) => {
          const diaries: diaryInterface[] = [res.data.diary];
          console.log(res);
          //diaries[0].mapにすればdiary単体になる
          const deta: any = diaries.map((diary: any, id: any) => {
            setDiaryDetils(diary);
            return;
          });
        })
        .catch(function (error) {
          console.log(error.response.data);
          return;
        });
    }, []);
  }
  useHandleFeatchAllDiary();

  return (
    <>
      <div>Diary一覧</div>
      <DiaryCard diaryDetils={diaryDetils} />
    </>
  );
}
