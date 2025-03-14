import axios from "axios";

const instance = axios.create({
  baseURL: "https://readjourney.b.goit.study/api", // Адрес бэкенда
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
