import React from "react";
import GetAllDiary from "../compose/getAllDiary";

import { Typography, AppBar, Tab, Tabs, Grid, Box } from "@mui/material";

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
