import React from "react";
import GetAllDiary from "../../compose/diary/getAllDiary";

import { Grid } from "@mui/material";

export default function diaryIndex() {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <GetAllDiary />
      </Grid>
    </>
  );
}
