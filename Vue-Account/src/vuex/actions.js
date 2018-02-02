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
      commit('SET_TOKEN', res.Data.Token);
      commit('SET_CURRENT_USER', res.Data.UserInfo);
      commit('SET_IS_LOGIN', true);
      Indicator.close();
    } else {
      Indicator.close();
      Toast(res.Message)
    }
  }).catch(error => {
    Indicator.close();
    Toast("注册失败");
  });
  // if (state.user.currentUser.Account) {
  //   var tokenRequest = {
  //     grant_type: "password",
  //     client_id: "pwd_client",
  //     client_secret: "pwd_secret",
  //     scope: "rk offline_access",
  //     username: param.Account,
  //     password: param.Password
  //   }
  //   Indicator.close();
  //   Indicator.open({
  //     text: '注册成功, 登录中...'
  //   });
  // await Rk.User.getToken(tokenRequest).then(response => {
  //   var res = response.data;
  //   console.log(res);
  //   // sessionStorage.setItem("access_token", res.access_token);
  //   // sessionStorage.setItem("refresh_token", res.refresh_token);
  //   // sessionStorage.setItem("token_type", res.token_type);
  //   commit('SET_TOKEN', res);
  //   commit('SET_IS_LOGIN', true);
  // }).catch(error => {
  //   Indicator.close();
  //   Toast("登录异常：获取 TOKEN 失败");
  // });
  // }
}

export const userSignIn = async function ({
  commit,
  dispatch,
  state
}, param) {
  // await Rk.User.getToken(param.tokenRequest).then(response => {
  //   var res = response.data;
  //   console.log(res);
  //   sessionStorage.setItem("access_token", res.access_token);
  //   sessionStorage.setItem("refresh_token", res.refresh_token);
  //   sessionStorage.setItem("token_type", res.token_type);
  //   commit('SET_TOKEN', res);
  // }).catch(error => {
  //   Indicator.close();
  //   Toast("登录异常：获取 TOKEN 失败");
  // });
  await Rk.User.signIn(param).then(response => {
    debugger;
    var res = response.data;
    if (res.IsSuccess) {
      console.log(res);
      commit('SET_TOKEN', res.Data.Token);
      commit('SET_CURRENT_USER', res.Data.UserInfo);
      commit('SET_IS_LOGIN', true);
    } else {
      Indicator.close();
      Toast(res.Message)
    }
  }).catch(error => {
    Indicator.close();
    Toast("登录异常");
  });
}

export const addAccountRecord = function ({
  commit,
  state
}, param) {
  let currentDateIndex = state.accountRecords.accountList.findIndex(
    item => item.Date == param.AccountDate
  );
  if (currentDateIndex == -1) {
    let gtDateIndex = state.accountRecords.accountList.findIndex(
      item => new Date(param.AccountDate) > new Date(item.Date)
    );
    if (gtDateIndex == -1) {
      gtDateIndex = state.accountRecords.accountList.length;
    }
    commit('SPLICE_ACCOUNT_ITEM', {
      index: gtDateIndex,
      record: {
        Date: param.AccountDate,
        DateAmount: param.Amount,
        AccountRecords: [param],
        MonthExpend: "",
        MonthIncome: ""
      }
    });
  } else {
    let dateAmount = 0;
    if (param.Type == 1) {
      dateAmount = (parseFloat(state.accountRecords.accountList[currentDateIndex].DateAmount) + parseFloat(param.Amount)).toFixed(2);
    } else {
      dateAmount = state.accountRecords.accountList[currentDateIndex].DateAmount;
    }
    commit('CREATE_ACCOUNT_RECORD', {
      index: currentDateIndex,
      dateAmount: dateAmount,
      recordItem: param
    });
  }
  let paramDate = new Date(param.AccountDate);
  let nowDate = new Date();
  if (paramDate.getFullYear() == nowDate.getFullYear() && paramDate.getMonth() == nowDate.getMonth()) {
    if (param.Type == 0) {
      commit('SET_MONTH_AMOUNT', {
        monthIncome: (parseFloat(state.accountRecords.monthIncome) + parseFloat(param.Amount)).toFixed(2),
        monthExpend: state.accountRecords.monthExpend
      })
    } else {
      commit('SET_MONTH_AMOUNT', {
        monthIncome: state.accountRecords.monthIncome,
        monthExpend: (parseFloat(state.accountRecords.monthExpend) + parseFloat(param.Amount)).toFixed(2)
      })
    }
  }
}

export const updateAccountRecord = function ({
  commit,
  state
}, param) {
  if (param.updateInfo.hasUpdateDate) { //表示时间被修改了, 则先删除
    commit('DELETE_ACCOUNT_RECORD', param.updateInfo);
    addAccountRecord({
      commit,
      state
    }, param.record); //重新添加
  } else {
    //计算 dateAmount
    if (param.record.Type == 0) {
      param.dateAmount = state.accountRecords.accountList[param.updateInfo.index1].DateAmount;
      commit('SET_MONTH_AMOUNT', {
        monthIncome: (parseFloat(state.accountRecords.monthIncome) + parseFloat(param.updateInfo.updateAmount)).toFixed(2),
        monthExpend: state.accountRecords.monthExpend
      });
    } else {
      param.dateAmount = (parseFloat(state.accountRecords.accountList[param.updateInfo.index1].DateAmount) + parseFloat(param.updateInfo.updateAmount)).toFixed(2);
      commit('SET_MONTH_AMOUNT', {
        monthIncome: state.accountRecords.monthIncome,
        monthExpend: (parseFloat(state.accountRecords.monthExpend) + parseFloat(param.updateInfo.updateAmount)).toFixed(2)
      })
    }
    commit('UPDATE_ACCOUNT_ITEM', param);
  }
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
        commit('SET_IS_LOADING', false);
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

export const deleteAccountRecord = function ({
  commit,
  state
}, param) {
  let record = state.accountRecords.accountList[param.index1].AccountRecords[param.index2];
  //计算 dateAmount
  let paramDate = new Date(record.AccountDate);
  let nowDate = new Date();
  if (paramDate.getFullYear() == nowDate.getFullYear() && paramDate.getMonth() == nowDate.getMonth()) {
    if (record.Type == 0) {
      commit('SET_MONTH_AMOUNT', {
        monthIncome: (parseFloat(state.accountRecords.monthIncome) + parseFloat(record.Amount)).toFixed(2),
        monthExpend: state.accountRecords.monthExpend
      })
    } else {
      commit('SET_MONTH_AMOUNT', {
        monthIncome: state.accountRecords.monthIncome,
        monthExpend: (parseFloat(state.accountRecords.monthExpend) + parseFloat(record.Amount)).toFixed(2)
      })
    }
  }
  commit('DELETE_ACCOUNT_RECORD', param);
}
