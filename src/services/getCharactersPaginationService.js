import http from "./httpService";

function getCharactersPagination(data) {
  return http.get("/characters-pagination", data);
}

export default getCharactersPagination;
