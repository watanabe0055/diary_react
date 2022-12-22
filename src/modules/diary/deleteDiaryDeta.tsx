import React from "react";
import { useParams } from "react-router-dom";

//外部ライブラリ
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";

export default function DeleteDiaryDeta(): any {
  const params = useParams();

  const generalApiInterface = axios.create({
    baseURL: `http://localhost:3000/api/v1/diary/${Number(params.id)}`,
    headers: {
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      access_token: Cookies.get("access-token"),
    },
  });

  function UseFeathDiaryDelete() {
    generalApiInterface
      .delete(`http://localhost:3000/api/v1/diary/${Number(params.id)}`, {
        headers: {
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          access_token: Cookies.get("access-token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        console.log(errorResponse.message);
      });
  }
  UseFeathDiaryDelete();
  return 0;
}
