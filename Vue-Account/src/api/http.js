import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/vuex/store'

import {
  Indicator,
  Toast
} from "mint-ui";
// 超时时间 1 分钟
axios.defaults.timeout = 60000
// http请求拦截器
axios.interceptors.request.use(config => {
  if (store.state.user.token.access_token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `${store.state.user.token.token_type} ${store.state.user.token.access_token}`;

    // config.headers.'Content-Type' = `application/x-www-form-urlencoded`;
  }
  return config
}, error => {
  Indicator.close()
  Toast("响应超时");
  return Promise.reject(error)
})
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace({
            path: '/Login',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          });
          break;
      }
    }
    return Promise.reject(error.response)
  });

export default axios
