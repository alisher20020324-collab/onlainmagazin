import axios from "axios";

export const axiosInstanse = axios.create({
  baseURL: "https://onlainmagazin.onrender.com/api/v1",
  headers: { "Content-Type": "Application/json" },
});
