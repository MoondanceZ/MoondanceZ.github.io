import Rk from "@/api/rk-api";

const actions = {
  getUserToken: ({
    commit,
    state
  }, param) => {
    Rk.User.getToken(param).then(response => {
      var res = response.data;
      commit('SET_TOKEN', res);
    }).catch(error => {
      console.error(error);
    });
  },
  getAccountRecords: ({
    commit,
    state
  }, param) => {
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
}

export default {
  actions
}
