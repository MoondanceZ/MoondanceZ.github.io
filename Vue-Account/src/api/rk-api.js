import axios from 'axios';
import qs from 'qs'

const dev = process.env.NODE_ENV === 'production' ? false : true
let baseUrl = dev ? '/api' : 'https://api.round-king.com'
let identityserver4Url = dev ? '/identityserver4' : 'https://identityserver4.round-king.com'

const authConfig = {
  headers: {
    'Authorization': sessionStorage.getItem("token_type") + ' ' + sessionStorage.getItem("access_token")
  }
}

export default {
  Account: {
    getAccountTypes: params => {
      return axios.get(`${baseUrl}/Account/Types`, params);
    },
    getAccountRecords: params =>{
      return axios.get(`${baseUrl}/Account/List`, params);
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
  },
  User: {
    getToken: params => {
      return axios.post(`${identityserver4Url}/connect/token`, qs.stringify(params));
    },
    signUp: params => {
      return axios.post(`${baseUrl}/UserInfo`, params);
    },
    signIn: params => {
      return axios.get(`${baseUrl}/UserInfo/${params}`, authConfig);
    }
  }
}
