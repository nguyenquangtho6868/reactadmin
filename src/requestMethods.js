import axios from "axios";

const BASE_URL = "https://projecte-ecomerce.onrender.com/api/";
const TOKEN = localStorage.getItem("admin")
  ? [JSON.parse(localStorage.getItem("admin")).accessToken]
  : [];
console.log(TOKEN[0]);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: TOKEN[0] },
});
