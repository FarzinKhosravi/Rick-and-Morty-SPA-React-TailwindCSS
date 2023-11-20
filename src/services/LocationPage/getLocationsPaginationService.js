import http from "../httpService";

function getLocationsPagination(data) {
  return http.get("/locations-pagination", data);
}

export default getLocationsPagination;
