import React, { useState, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";

export default function Signin() {
  const [email, setEail] = useState("");
  const [password, setPassword] = useState("");

  const deviseSinginApi = "http://localhost:3000/api/v1/auth/sign_in";

  //email: "test@example.com",
  //password: "password",
  let putParam = {
    body: {
      email: email,
      password: password,
    },
  };

  const option: any = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(putParam),
  };

  //サインイン
  const deviceSignin = () =>
    fetch(deviseSinginApi, option)
      .then((res) => res.json().then((data) => console.log(data)))
      .catch((error) => {
        console.error("Error:", error);
      });

  return (
    <>
      <div>サインアップ</div>
      <div>
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
        <input type="submit" value="Submit" onClick={deviceSignin} />
      </div>
    </>
  );
}
