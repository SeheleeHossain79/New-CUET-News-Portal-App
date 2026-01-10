import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.100:8000", // 🔴 নিজের PC IPv4 দাও
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
