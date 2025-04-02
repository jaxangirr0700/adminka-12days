import axios from "axios";

export const api = axios.create({
  baseURL: `https://nt.softly.uz/api/`,
});
