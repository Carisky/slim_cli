import axios from 'axios';
import chalk from 'chalk';
import { getConfig } from './config.js';

const createApi = () => {
  const { BASE_URL, X_API_KEY } = getConfig();
  return axios.create({
    baseURL: BASE_URL,
    headers: { 'X-API-Key': X_API_KEY }
  });
};

export const apiGet = async url => {
  const api = createApi();
  console.log(chalk.green('GET'), url);
  return (await api.get(url)).data;
};

export const apiPost = async (url, data) => {
  const api = createApi();
  console.log(chalk.keyword('orange')('POST'), url);
  return (await api.post(url, data)).data;
};

export const apiPut = async (url, data) => {
  const api = createApi();
  console.log(chalk.yellow('PUT'), url);
  return (await api.put(url, data)).data;
};

export const apiDelete = async url => {
  const api = createApi();
  console.log(chalk.red('DELETE'), url);
  return (await api.delete(url)).data;
};
