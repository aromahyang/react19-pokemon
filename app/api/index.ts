import axios, { type AxiosRequestConfig } from "axios";

export default async function fetch(config: AxiosRequestConfig) {
  const response = await axios(config);
  return response.data;
}
