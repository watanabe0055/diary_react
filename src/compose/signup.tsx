import React, { useState, useEffect } from "react";
//マテリアル UI
import TextField from "@mui/material/TextField";
import { Button, Grid, Box } from "@mui/material";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

import Paper from "@mui/material/Paper";

export default function Signin() {
  //サインインのパラメータ
  const [email, setEail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const deviseSinginApi = "http://localhost:3000/api/v1/auth/sign_up";

  //email: "test@example.com",
  //password: "password",
  const params = {
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  };

  const option: any = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(params),
  };

  const onButtonClick = () => {
    axios
      .post("http://localhost:3000/api/v1/auth", {
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
        <h3>サインアップ</h3>
        <label>
          メールアドレス
          <br />
          <TextField
            id="outlined-basic"
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
            id="outlined-basic"
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
            id="outlined-basic"
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
            sx={{ width: 250 }}
            onClick={onButtonClick}
          >
            送信
          </Button>
        </div>
      </Grid>
    </>
  );
}
