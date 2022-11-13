import React, { useState, useEffect } from "react";

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
        console.log(res.headers.client);
        let client: any = res.headers["client"];
        let token: any = res.headers["access-token"];
        let uid: any = res.headers["uid"];
        Cookies.set("uid", uid);
        Cookies.set("token", token);
        Cookies.set("client", client);
      });
  };

  //サインイン
  const deviceSignin = () =>
    fetch(deviseSinginApi, option)
      .then((res) => {
        res.json().then((data) => {
          if (res.status === 200) {
            Cookies.set("uid", data.data.uid);
            setErrorMessage("");
          } else if (res.status === 401) {
            console.log(data);
            setErrorMessage(data.errors);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  return (
    <>
      <div>Signin</div>
      <div>
        <div>{errorMessage}</div>
        <label>
          Email:
          <input
            type="email"
            name="mail"
            placeholder="メールアドレスを入力してください"
            value={email}
            onChange={(event) => setEail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="mail"
            placeholder="パスワードを入力してください"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value="Submit" onClick={onButtonClick} />
      </div>
    </>
  );
}
