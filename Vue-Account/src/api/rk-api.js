import axios from 'axios';

let base = 'http://core-rk.local.cn'


export const getAccountTypes = params => { return axios.get(`/api/Account/Types`, { params: params }); };