import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();
const BASE_URL = env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

export default apiClient;
