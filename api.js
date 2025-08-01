import axios from 'axios';
import chalk from 'chalk';
import { getConfig } from './config.js';

const createApi = (extraHeaders = {}) => {
  const { BASE_URL, X_API_KEY } = getConfig();
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-API-Key': X_API_KEY,
      ...extraHeaders
    }
  });
};

export const apiGet = async (url, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.green('GET'), url);
  return (await api.get(url)).data;
};

export const apiPost = async (url, data = {}, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.hex("#ff8800ff")('POST'), url);
  return (await api.post(url, data)).data;
};

export const apiPut = async (url, data = {}, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.yellow('PUT'), url);
  return (await api.put(url, data)).data;
};

export const apiDelete = async (url, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.red('DELETE'), url);
  return (await api.delete(url)).data;
};
