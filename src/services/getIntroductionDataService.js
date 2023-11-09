import http from "./httpService";

export default function fetchIntroductionData() {
  return http.get("/app-introduction");
}
