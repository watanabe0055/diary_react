import axios from "axios";
import Cookies from "js-cookie";

export const deleteDiary = (diaryId: number) => {
  return new Promise((resolve, reject) => {
    const generalApiInterface = axios.create({
      baseURL: `http://localhost:3000/api/v1/diary/${Number(diaryId)}`,
      headers: {
        uid: Cookies.get("uid"),
        client: Cookies.get("client"),
        access_token: Cookies.get("access-token"),
      },
    });

    //削除API
    function UseFeathDiaryDelete(diaryId: number) {
      generalApiInterface
        .delete(`http://localhost:3000/api/v1/diary/${Number(diaryId)}`, {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            access_token: Cookies.get("access-token"),
          },
        })
        .then((res) => {
          resolve(res);
          //navigation("/diary", { state: `タイトル:${title}を削除にしました` });
        })
        .catch(function (error) {
          const errorResponse = error.response;
          reject(errorResponse.status);
        });
    }
    UseFeathDiaryDelete(diaryId);
  });
};
