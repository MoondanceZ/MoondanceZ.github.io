import Vue from 'vue'
import Rk from "@/api/rk-api";
import {
  Indicator,
  Toast
} from 'mint-ui'

export const userSignUp = async function ({
    commit,
    dispatch,
    state
  },
  param) {
  await Rk.User.signUp(param).then(response => {
    var res = response.data;
    if (res.IsSuccess) {
      console.log(res);
      commit('SET_CURRENT_USER', res.Data);
    } else {
      Indicator.close();
      Toast(res.Message)
    }
  }).catch(error => {
    Indicator.close();
    Toast("注册失败");
  });
  if (state.user.currentUser.Account) {
    var tokenRequest = {
      grant_type: "password",
      client_id: "pwd_client",
      client_secret: "pwd_secret",
      scope: "rk offline_access",
      username: param.Account,
      password: param.Password
    }
    Indicator.close();
    Indicator.open({
      text: '注册成功, 登录中...'
    });
    await Rk.User.getToken(tokenRequest).then(response => {
      var res = response.data;
      console.log(res);
      sessionStorage.setItem("access_token", res.access_token);
      sessionStorage.setItem("refresh_token", res.refresh_token);
      sessionStorage.setItem("token_type", res.token_type);
      commit('SET_TOKEN', res);
      commit('SET_IS_LOGIN', true);
    }).catch(error => {
      Indicator.close();
      Toast("登录异常：获取 TOKEN 失败");
    });
  }
}

export const userSignIn = async function ({
  commit,
  dispatch,
  state
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
  if (state.user.token.access_token) {
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
}

export const addAccountRecord = function ({
  commit,
  state
}, param) {
  let currentDateIndex = state.accountRecords.accountList.findIndex(
    item => item.Date == param.AccountDate
  );
  if (currentDateIndex == -1) {
    commit('UNSHIFT_ACCOUNT_ITEM', param);
  } else {
    var dateAmount = (parseFloat(state.accountRecords.accountList[currentDateIndex].DateAmount) + parseFloat(param.Amount)).toFixed(2);
    commit('ADD_ACCOUNT_RECORD', {
      index: currentDateIndex,
      dateAmount: dateAmount,
      recordItem: param
    });
  }
  commit('SET_MONTH_AMOUNT', {
    monthIncome: (parseFloat(state.accountRecords.monthIncome) + parseFloat(param.Amount)).toFixed(2),
    monthExpend: (parseFloat(state.accountRecords.monthExpend) + parseFloat(param.Amount)).toFixed(2)
  })
}

export const getAccountRecords = function ({
  commit,
  state
}) {
  if (state.accountRecords.isLoading || state.accountRecords.allLoaded) return;
  var param = {
    PageIndex: state.accountRecords.pageIndex,
    PageSize: state.accountRecords.pageSize,
    UserId: state.user.currentUser.Id
  }
  commit('SET_IS_LOADING', true);
  Rk.Account.getAccountRecords(param).then(response => {
    let res = response.data;
    if (res.IsSuccess) {
      if (res.Data.length == 0) {
        commit('SET_ALL_LOADED', true);
        Toast(res.Message);
      } else {
        //备份当前记录
        // const savedCoountList = [...state.accountList];
        res.Data.forEach(m => {
          let currentDateIndex = state.accountRecords.accountList.findIndex(
            item => item.Date == m.Date
          );
          if (currentDateIndex == -1) {
            commit('PUSH_ACCOUNT_ITEM', m);
          } else {
            commit('SET_ACCOUNT_LIST', {
              index: currentDateIndex,
              dateAmount: m.DateAmount,
              recordItems: m.AccountRecords
            });
          }
          commit('SET_MONTH_AMOUNT', {
            monthIncome: m.MonthIncome,
            monthExpend: m.MonthExpend
          })
        });
        commit('SET_PAGE_INFO', {
          pageIndex: state.accountRecords.pageIndex + 1,
          pageSize: state.accountRecords.pageSize
        });
      }
    } else {
      console.error(res.Message);
      Toast(res.Message);
    }
    commit('SET_IS_LOADING', false);
  }).catch(error => {
    console.error(error);
    Toast("获取列表异常");
    commit('SET_IS_LOADING', false);
  });
}
