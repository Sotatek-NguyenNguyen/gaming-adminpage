import axios from 'axios';
import { envConfig } from '../configs';

const { API_URL_BACKEND } = envConfig;

const instance = axios.create({ baseURL: API_URL_BACKEND });
instance.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken && JSON.parse(accessToken)) {
    req.headers.authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return req;
});

instance.interceptors.response.use(
  (response) => {
    const result = response.data;
    /* if (typeof result === 'object') {
      result.success = true;
    } */
    return result;
  },
  (error) => {
    if (error?.response?.data) {
      const result = error.response.data;
      result.success = false;
      return result;
    }

    return null;
  },
);

export default instance;