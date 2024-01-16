import axios from "axios";
import { ONANDA_API_KEY } from "constants/config";

const axiosInstance = axios.create({
  baseURL: "https://api-fxpractice.oanda.com/v3",
  headers: {
    Authorization: `Bearer ${ONANDA_API_KEY}`,
  },
});

export const axiosStream = axios.create({
  baseURL: "https://stream-fxtrade.oanda.com/v3",
  responseType: "stream",
  headers: {
    Authorization: `Bearer ${ONANDA_API_KEY}`,
  },
});

export default axiosInstance;
