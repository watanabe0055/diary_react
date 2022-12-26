import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GetAllDiary from "../../compose/diary/getAllDiary";

import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function DiaryIndex() {
  const location = useLocation();
  const [succes, setSucces] = useState();

  const Render = () => {
    if (location.state != null) {
      return (
        <>
          <Alert severity="success">{location.state}</Alert>
        </>
      );
    } else {
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
