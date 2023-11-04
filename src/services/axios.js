import axios from "axios";
import { BASE_URL } from "@/constants/api";

window.axios = axios;
axios.defaults.baseURL = BASE_URL;