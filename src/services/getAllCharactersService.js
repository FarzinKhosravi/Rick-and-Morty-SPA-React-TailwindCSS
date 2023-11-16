import http from "./httpService";

function getAllCharacters(data) {
  return http.get("/characters-pagination", data);
}

export default getAllCharacters;
