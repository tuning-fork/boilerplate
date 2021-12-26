import axios from "axios";

const DEVELOPMENT_API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000";
const BASE_URL =
  process.env.NODE_ENV === "development" ? DEVELOPMENT_API_URL : "";

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

export default apiClient;
