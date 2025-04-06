import axios from "axios";
import { useAuthStore } from "../stores";
const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_HOST_API,
});

tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log(token);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
