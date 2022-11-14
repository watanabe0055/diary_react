import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";

import axios from "axios";
import Cookies from "js-cookie";
import { isSetIterator } from "util/types";

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
      <div>サインアップ</div>
      <div>
        <div>{errorMessage}</div>
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
          <Button variant="contained" onClick={onButtonClick}>
            送信
          </Button>
        </div>
      </div>
    </>
  );
}
