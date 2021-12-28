import axios from 'axios';
import { envConfig } from '../configs';

const { API_URL_BACKEND } = envConfig;

const instance = axios.create({ baseURL: API_URL_BACKEND });
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken && JSON.parse(accessToken)) {
    config.headers.authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return config;
});

export default instance;
