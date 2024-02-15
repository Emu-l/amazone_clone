import axios from "axios"

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/e-clone-3d99c/us-central1/api",
  baseURL: "https://amazone-api-deploy.onrender.com",
});

export{axiosInstance}