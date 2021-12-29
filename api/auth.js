import axios from './axios-adapter';

export const loginAuth = (params) => {
  return axios.post('auth/login', params);
};

export const signatureMsgAuth = (params) => {
  return axios.post('auth/signature-msg', params);
};
