import http from "./httpService";

function getAllCharacters(data) {
  return http.get("/characters", data);
}

export default getAllCharacters;
