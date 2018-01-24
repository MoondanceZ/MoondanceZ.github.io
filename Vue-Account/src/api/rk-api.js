import axios from 'axios';
import qs from 'qs'

const dev = process.env.NODE_ENV === 'production' ? false : true
let baseUrl = dev ? '/api' : 'https://api.round-king.com'
let identityserver4Url = dev ? '/identityserver4' : 'https://identityserver4.round-king.com'

// var authConfig = {
//   headers: {
//     'Authorization': sessionStorage.getItem("token_type") + ' ' + sessionStorage.getItem("access_token")
//   }
// }

function ApiConfig() {
  return {
    headers: {
      'Authorization': sessionStorage.getItem("token_type") + ' ' + sessionStorage.getItem("access_token")
    }
  }
}

export default {
  Account: {
    getAccountTypes: param => {
      return axios.get(`${baseUrl}/Account/Types/${param}`, ApiConfig());
    },
    getAccountRecords: param => {
      return axios.get(`${baseUrl}/Account/List?${qs.stringify(param)}`, ApiConfig());
    },
    createAccountRecord: param => {
      return axios.post(`${baseUrl}/Account`, param, ApiConfig());
    },
    updateAccountRecord: (id, request) => {
      return axios.put(`${baseUrl}/Account/${id}`, param, ApiConfig());
    },
    deleteAccountRecor: id => {
      return axios.delete(`${baseUrl}/Account/${id}`, ApiConfig());
    }
  },
  User: {
    getToken: param => {
      return axios.post(`${identityserver4Url}/connect/token`, qs.stringify(param));
    },
    signUp: param => {
      return axios.post(`${baseUrl}/UserInfo`, param);
    },
    getUser: param => {
      return axios.get(`${baseUrl}/UserInfo/${param}`, ApiConfig());
    }
  }
}
