import { rejects } from "assert";
import axios from "axios";
import Cookies from "js-cookie";
import { stringify } from "querystring";

export function diaryEdit(diaryId: number, title: string, content: string) {
  const generalApiInterface = axios.create({
    baseURL: `http://localhost:3000/api/v1/diary/${diaryId}`,
    headers: {
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      access_token: Cookies.get("access-token"),
    },
  });

  return new Promise((resolve, rejects) => {
    generalApiInterface
      .patch(`http://localhost:3000/api/v1/diary/${diaryId}`, {
        title: title,
        content: content,
        //emotion_id: "2",
      })
      .then((res) => {
        const status = res.request.status;
        const sucusessTitle: string = res.data.updateDiary.title;
        const resArray: [number, string] = [status, sucusessTitle];
        resolve(resArray);
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        let tivleValidation: string = "";
        let tivleContent: string = "";
        if (errorResponse.message.title) {
          tivleValidation = "タイトルは1文字以上100文字以下にしてください";
        }
        if (errorResponse.message.content) {
          tivleContent = "コンテンツは1文字以上4000文字以下にしてください";
        }
        let validationArray: string[] = [tivleValidation, tivleContent];

        resolve(validationArray);
      });
  });
}
