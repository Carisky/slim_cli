import axios from 'axios';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';

dotenv.config({ path: path.join(os.homedir(), '.slim-cli', '.env') });
const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-API-Key': process.env.X_API_KEY }
});

export const apiGet = async url => (await api.get(url)).data;
export const apiPost = async (url, data) => (await api.post(url, data)).data;
export const apiPut = async (url, data) => (await api.put(url, data)).data;
export const apiDelete = async url => (await api.delete(url)).data;
