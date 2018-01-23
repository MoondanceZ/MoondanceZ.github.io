import Vue from 'vue'
import Rk from "@/api/rk-api";
import { Indicator, Toast } from 'mint-ui'

export const userSignIn = async function ({
  commit,
  dispatch
}, param) {
  await Rk.User.getToken(param.tokenRequest).then(response => {
    var res = response.data;
    console.log(res);
    sessionStorage.setItem("access_token", res.access_token);
    sessionStorage.setItem("refresh_token", res.refresh_token);
    sessionStorage.setItem("token_type", res.token_type);
    commit('SET_TOKEN', res);
  }).catch(error => {
    Indicator.close();
    Toast("登录异常：获取 TOKEN 失败");
  });
  await Rk.User.getUser(param.account).then(response => {
    var res = response.data;
    if (res.IsSuccess) {
      console.log(res);
      commit('SET_CURRENT_USER', res.Data);
      commit('SET_IS_LOGIN', true);
    } else {
      Indicator.close();
      Toast(res.Message)
    }
  }).catch(error => {
    Indicator.close();
    Toast("登录异常：获取用户信息失败");
  });
}
export const getAccountRecords = function ({
  commit,
  state
}, param) {
  commit('SET_IS_LOADING', true);
  Rk.Account.getAccountRecords(param).then(response => {
    let res = response.data;
    if (res.IsSuccess) {
      //备份当前记录
      // const savedCoountList = [...state.accountList];
      res.Data.forEach(m => {
        let currentDateIndex = state.accountList.findIndex(
          item => item.Date == m.Date
        );
        if (currentDateIndex == -1) {
          commit('ADD_ACCOUNT_ITEM', m);
        } else {
          commit('SET_ACCOUNT_LIST', {
            index: currentDateIndex,
            recordItems: m.AccountRecords
          });
        }
        commit('SET_IS_LOADING', false);
      });
    } else {
      console.error(res.Message);
    }
  }).catch(error => {
    console.error(error);
  });
}
