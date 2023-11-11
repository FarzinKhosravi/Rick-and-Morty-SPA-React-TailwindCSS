import http from "./httpService";

function getAllEpisodes() {
  return http.get("/episodes");
}

export default getAllEpisodes;
