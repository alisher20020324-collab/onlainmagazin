import axios from "axios";

export const axiosInstanse = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-Type": "Application/json" },
});
