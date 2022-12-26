import axios from "axios";
import Cookies from "js-cookie";

//diary詳細を取得する
export const featchDiary: any = (diary_id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/api/v1/diary/${diary_id}`, {
        headers: {
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          access_token: Cookies.get("access-token"),
        },
      })
      .then((res) => {
        const diaryDetail: any = [res.data.diary];
        //console.log(diaryDetail[0]);
        if (diaryDetail == "unknown") {
          return "test";
        } else {
          resolve(diaryDetail[0]);
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        reject(error.response.data);
      });
    return;
  });
};
