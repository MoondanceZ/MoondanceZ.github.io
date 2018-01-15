import axios from 'axios';

const dev = process.env.NODE_ENV === 'production' ? false : true
let baseUrl = dev ? '/api' : 'https://api.round-king.com'


export const getAccountTypes = params => {
  return axios.get(`${baseUrl}/Account/Types`, {
    params: params
  });
};
