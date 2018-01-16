import axios from 'axios';

const dev = process.env.NODE_ENV === 'production' ? false : true
let baseUrl = dev ? '/api' : 'https://api.round-king.com'

export default {
  Account: {
    getAccountTypes: params => {
      return axios.get(`${baseUrl}/Account/Types`, params);
    },
    createAccountRecord: params => {
      return axios.post(`${baseUrl}/Account`, params);
    },
    updateAccountRecord: (id, request) => {
      return axios.put(`${baseUrl}/Account/${id}`, params);
    },
    deleteAccountRecor: id => {
      return axios.delete(`${baseUrl}/Account/${id}`);
    }
  }
}
