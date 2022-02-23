import { API_URL } from "./constants";
import axios from "axios";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;