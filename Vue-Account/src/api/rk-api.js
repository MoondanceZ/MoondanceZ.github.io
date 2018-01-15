import axios from 'axios';

const dev = process.env.NODE_ENV === 'production' ? false : true
let baseUrl = dev ? '/api' : 'https://api.round-king.com'

export default {
  account:{
    getAccountTypes = params => {
      return axios.get(`${baseUrl}/Account/Types`, {
        params: params
      });
    },
    createAccountRecord = params =>{
      return axios.post(`${baseUrl}/Account`, {
        params: params
      });
    },
    updateAccountRecord = (id, params) => {
      return axios.put(`${baseUrl}/Account${id}`, {
        params: params
      });
    },
    deleteAccountRecord = id =>{
      return axios.delete(`${baseUrl}/Account${id}`);
    }
  }
}