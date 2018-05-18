import axios from './http';
import qs from 'qs'

const dev = process.env.NODE_ENV === 'production' ? false : true
let baseUrl = dev ? '/api' : 'https://api.round-king.com'
let identityserver4Url = dev ? '/identityserver4' : 'https://identityserver4.round-king.com'

export default {
  Account: {
    getAccountTypes: param => {
      return axios.get(`${baseUrl}/Account/Types/${param}`);
    },
    getAccountRecords: param => {
      return axios.get(`${baseUrl}/Account/List?${qs.stringify(param)}`);
    },
    createAccountRecord: param => {
      return axios.post(`${baseUrl}/Account`, param);
    },
    updateAccountRecord: (id, param) => {
      return axios.put(`${baseUrl}/Account/${id}`, param);
    },
    deleteAccountRecord: id => {
      return axios.delete(`${baseUrl}/Account/${id}`);
    }
  },
  User: {
    signIn: param => {
      return axios.post(`${baseUrl}/UserInfo/Login`, param);
    },
    signUp: param => {
      return axios.post(`${baseUrl}/UserInfo`, param);
    },
    getUser: param => {
      return axios.get(`${baseUrl}/UserInfo/${param}`);
    },
    setting: param => {
      return axios.put(`${baseUrl}/UserInfo`, param);
    }
  }
}
