import axios from "axios";
import type { AxiosInstance } from "axios";
import { CONSTANTS } from "./constants";

const tsunV1: AxiosInstance = axios.create({
  baseURL: CONSTANTS.TSUN_API_V1,
  headers: {
    "Content-Type": "application/json",
  },
});

export { tsunV1 };
