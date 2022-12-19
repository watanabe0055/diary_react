import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GetAllDiary from "../../compose/diary/getAllDiary";

import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function DiaryIndex() {
  const location = useLocation();
  const [succes, setSucces] = useState();

  console.log(location.state);
  const Render = () => {
    if (location.state != null) {
      console.log("成功");
      return (
        <>
          <Alert severity="success">{location.state}</Alert>
        </>
      );
    } else {
      console.log("失敗");
      return <></>;
    }
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <div>Diary一覧</div>
        <div>{Render()}</div>
        <GetAllDiary />
      </Grid>
    </>
  );
}
