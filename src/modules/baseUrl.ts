export const baseUrl = () => {
  let BASEURL: any;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    BASEURL = `http://localhost:3000/api/v1/diary/`;
  } else if (process.env.NODE_ENV === "production") {
    BASEURL = `http://ec2-13-115-221-170.ap-northeast-1.compute.amazonaws.com/`;
  }
  return BASEURL;
};
