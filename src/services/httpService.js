import axios from "axios";

axios.defaults.baseURL = "https://rick-and-morty-database.onrender.com/";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
