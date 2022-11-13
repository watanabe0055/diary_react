import React from "react";

const diaryAcquireAllApi = "http://localhost:3000/api/v1/diary";
export default function getDiaryDeta() {
  const main = async () => {
    fetch(diaryAcquireAllApi).then((res) =>
      res.json().then((data) => console.log(data))
    );
  };
  main();
  return <div>getDiaryDeta</div>;
}
