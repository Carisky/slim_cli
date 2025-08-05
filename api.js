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

const handleRequest = async (promise) => {
  try {
    return (await promise).data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(chalk.red('404 Not Found'));
      return null;
    }
    throw error;
  }
};

export const apiGet = async (url, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.green('GET'), url);
  return handleRequest(api.get(url));
};

export const apiPost = async (url, data = {}, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.hex("#ff8800ff")('POST'), url);
  return handleRequest(api.post(url, data));
};

export const apiPut = async (url, data = {}, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.yellow('PUT'), url);
  return handleRequest(api.put(url, data));
};

export const apiDelete = async (url, headers = {}) => {
  const api = createApi(headers);
  console.log(chalk.red('DELETE'), url);
  return handleRequest(api.delete(url));
};
