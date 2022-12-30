import React, { useState, useEffect } from "react";
//マテリアル UI
import TextField from "@mui/material/TextField";
import { Button, Grid, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

import { baseUrl } from "../modules/baseUrl";
export default function Signin() {
  //サインインのパラメータ
  const [email, setEail] = useState("");
  const [password, setPassword] = useState("");

  //email: "test@example.com",
  //password: "password",
  const params = {
    email: email,
    password: password,
  };

  const BASEURL: any = baseUrl();
  const generalApiInterface = axios.create({
    baseURL: BASEURL,
    headers: {
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      access_token: Cookies.get("access-token"),
    },
  });

  const option: any = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(params),
  };

  const onButtonClick = () => {
    generalApiInterface
      .post("auth/sign_in", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          const client: any = res.headers["client"];
          const token: any = res.headers["access-token"];
          const uid: any = res.headers["uid"];
          //Cookieの登録
          Cookies.set("client", client);
          Cookies.set("access-token", token);
          Cookies.set("uid", uid);
        }
      })
      .catch(function (error) {
        // Cookieからトークンを削除しています
        Cookies.remove("client");
        Cookies.remove("access-token");
        Cookies.remove("uid");
      });
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Paper elevation={3} />
        <h3>ログイン</h3>
        <label>
          メールアドレス
          <br />
          <TextField
            label="メールアドレスを入力してください"
            variant="outlined"
            type="email"
            name="mail"
            size="small"
            value={email}
            sx={{ width: 300, m: 1 }}
            onChange={(event) => setEail(event.target.value)}
          />
        </label>
        <br />
        <label>
          パスワード
          <br />
          <TextField
            label="パスワードを入力してください"
            variant="outlined"
            type="password"
            size="small"
            value={password}
            sx={{ width: 300, m: 1 }}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
          <Button
            variant="contained"
            sx={{ width: 280, mt: 3, mb: 3 }}
            onClick={onButtonClick}
          >
            ログイン
          </Button>
        </div>
      </Grid>
    </>
  );
}
