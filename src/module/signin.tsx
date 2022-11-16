import React, { useState, useEffect } from "react";
//マテリアル UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

//API用のライブラリ
import axios from "axios";
import Cookies from "js-cookie";

import Paper from "@mui/material/Paper";

export default function Signin() {
  //サインインのパラメータ
  const [email, setEail] = useState("");
  const [password, setPassword] = useState("");

  //サインインエラー判定
  const [errorMessage, setErrorMessage] = useState("");

  const deviseSinginApi = "http://localhost:3000/api/v1/auth/sign_in";

  //email: "test@example.com",
  //password: "password",
  const params = {
    email: email,
    password: password,
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
      .post("http://localhost:3000/api/v1/auth/sign_in", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          let client: any = res.headers["client"];
          let token: any = res.headers["access-token"];
          let uid: any = res.headers["uid"];
          Cookies.set("uid", uid);
          Cookies.set("token", token);
          Cookies.set("client", client);
        }
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 3,
              p: 3,
              width: 400,
              height: 400,
            },
          }}
        >
          <Paper elevation={4}>
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
            <div>
              <Button
                variant="contained"
                sx={{ width: 250 }}
                onClick={onButtonClick}
              >
                送信
              </Button>
            </div>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
