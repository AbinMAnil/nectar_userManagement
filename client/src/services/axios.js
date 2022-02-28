import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
});

export default Axios;
