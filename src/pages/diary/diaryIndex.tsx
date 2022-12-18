import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GetAllDiary from "../../compose/diary/getAllDiary";

import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function DiaryIndex() {
  const location = useLocation();

  //const Render = () => {
  //  if (location.state.flag == "succes") {
  //    console.log("成功");
  //  } else {
  //    console.log("失敗");
  //  }
  //};
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <div>Diary一覧</div>
        <GetAllDiary />
      </Grid>
    </>
  );
}
