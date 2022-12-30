import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigation = useNavigate();

  const deviseSinginApi = "http://localhost:3000/api/v1/auth";

  //email: "test@example.com",
  //password: "password",
  const BASEURL: any = baseUrl();
  const generalApiInterface = axios.create({
    baseURL: BASEURL,
    headers: {
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      access_token: Cookies.get("access-token"),
    },
  });
  const onButtonClick = () => {
    generalApiInterface
      .post(`${BASEURL}auth`, {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then((res) => {
        if (res.status === 200) {
          let client: any = res.headers["client"];
          let token: any = res.headers["access-token"];
          let uid: any = res.headers["uid"];
          Cookies.set("client", client);
          Cookies.set("access-token", token);
          Cookies.set("uid", uid);
          navigation("/diary", {
            state: `サインアップに成功しました！！`,
          });
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
        <h3>新規登録</h3>
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
        <br />
        <label>
          パスワード確認用
          <br />
          <TextField
            label="確認用パスワードを入力してください"
            type="password"
            size="small"
            value={passwordConfirmation}
            sx={{ width: 300, m: 1 }}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
        </label>
        <div>
          <Button
            variant="contained"
            sx={{ width: 280, mt: 3, mb: 3 }}
            onClick={onButtonClick}
          >
            登録
          </Button>
        </div>
      </Grid>
    </>
  );
}
