const state = {
  isLoading: false,
  accountList: []
}

//mutations
const mutations = {
  'SET_IS_LOADING' (state, loading) {
    state.SET_IS_LOADING = loading;
  },
  'ADD_ACCOUNT_ITEM' (state, item) {
    state.accountList.push(item);
  },
  'SET_ACCOUNT_LIST' (state, param) {
    state.accountList[param.index].DateAmount = param.dateAmount;
    param.recordItems.forEach(element => {
      state.accountList[param.index].AccountRecords.push(element);
    });
  },
  'DELETE_ACCOUNT_RECORD' (state, records) {}
}

export default {
  state,
  mutations
}
