import React, { useState, useEffect } from "react";

//コンポーネント
import DiaryCard from "../../atom/diary/diaryCard";
import Error from "../../pages/error";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

export default function GetAllDiary() {
  const [diaryDetils, setDiaryDetils] = useState("");
  const [isStatus, setIsStatus] = useState(false);

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
          setIsStatus(true);
          const diaries: diaryInterface[] = [res.data.diary];
          //diaries[0].mapにすればdiary単体になる
          const deta: any = diaries.map((diary: any, id: number) => {
            setDiaryDetils(diary);
            return;
          });
        })
        .catch(function (error) {
          console.log(error.response.data);
          setIsStatus(false);
          return;
        });
    }, []);
  }
  useHandleFeatchAllDiary();

  const Render = () => {
    if (isStatus) {
      return (
        <>
          <div>Diary一覧</div>
          <DiaryCard diaryDetils={diaryDetils} />
        </>
      );
    } else {
      return <>{Error()}</>;
    }
  };

  return <>{Render()}</>;
}
