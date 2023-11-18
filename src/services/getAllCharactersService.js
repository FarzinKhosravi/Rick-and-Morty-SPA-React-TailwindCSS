import http from "./httpService";

function getAllCharacters() {
  return http.get("/characters");
}

export default getAllCharacters;
