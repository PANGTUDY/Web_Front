import axios from "axios";

export const conference_instance = axios.create({
  baseURL: "http://pangtudy.xyz:8000/conference/",
});

export const boardInstance = axios.create({
  baseURL: "http://127.0.0.1:10831",
});
