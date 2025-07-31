import axios from 'axios';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
import chalk from 'chalk';

dotenv.config({ path: path.join(os.homedir(), '.slim-cli', '.env') });
const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-API-Key': process.env.X_API_KEY }
});

export const apiGet = async url => {
  console.log(chalk.green('GET'), url);
  return (await api.get(url)).data;
};

export const apiPost = async (url, data) => {
  console.log(chalk.keyword('orange')('POST'), url);
  return (await api.post(url, data)).data;
};

export const apiPut = async (url, data) => {
  console.log(chalk.yellow('PUT'), url);
  return (await api.put(url, data)).data;
};

export const apiDelete = async url => {
  console.log(chalk.red('DELETE'), url);
  return (await api.delete(url)).data;
};
