import http from "./../httpService";

function getEpisodesPagination(data) {
  return http.get("/episodes-pagination", data);
}

export default getEpisodesPagination;
