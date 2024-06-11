import axios from 'axios';
import apiConfig from '../Api/Apis';

const instance = axios.create({
  baseURL: 'http://192.168.235.1:7001',
  timeout: 10000,
});
instance.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    if (response) {
      const {status} = response;
      if (status >= 500) {
      } else if (status === 400) {
      } else if (status === 401) {
      } else {
      }
    } else {
    }
    return Promise.reject(error);
  },
);
export const request = (name: string, params: any) => {
  const api = (apiConfig as any)[name];
  const {method, url} = api;
  if (method === 'get') {
    console.log('url', url);
    console.log('params', params);
    return get(url, params);
  } else {
    return post(url, params);
  }
};
export const get = (url: string, params: any) => {
  return instance.get(url, {
    params,
  });
};
export const post = (url: string, params: any) => {
  return instance.get(url, params);
};
