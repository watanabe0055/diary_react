import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function DiaryEdit() {
  const params = useParams();

  return (
    <>
      <div>diaryEdit</div>
      <div>
        <p>タイトル</p>
        <input type="text" />
      </div>
      <div>
        <p>コンテンツ</p>
        <textarea />
      </div>
    </>
  );
}
