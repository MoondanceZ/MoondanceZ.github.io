const state = {
  pageIndex: 1,
  pageSize: 10,
  isLoading: false,
  allLoaded: false,
  accountList: [],
  monthIncome: 0,
  monthExpend: 0
}

//mutations
const mutations = {
  'SET_PAGE_INFO' (state, pageInfo) {
    state.pageIndex = pageInfo.pageIndex;
    state.pageSize = pageInfo.pageSize;
  },
  'SET_ALL_LOADED' (state, allLoaded) {
    state.allLoaded = allLoaded;
  },
  'SET_IS_LOADING' (state, loading) {
    state.isLoading = loading;
  },
  'ADD_ACCOUNT_RECORD' (state, param) {
    state.accountList[param.index].DateAmount = param.dateAmount;
    state.accountList[param.index].AccountRecords.unshift(param.recordItem);
  },
  'UNSHIFT_ACCOUNT_ITEM' (state, item) {
    state.accountList.unshift(item);
  },
  'PUSH_ACCOUNT_ITEM' (state, item) {
    state.accountList.push(item);
  },
  'SET_ACCOUNT_LIST' (state, param) {
    state.accountList[param.index].DateAmount = param.dateAmount;
    param.recordItems.forEach(element => {
      state.accountList[param.index].AccountRecords.push(element);
    });
  },
  'SET_MONTH_AMOUNT' (state, param) {
    state.monthIncome = param.monthIncome;
    state.monthExpend = param.monthExpend;
  },
  'DELETE_ACCOUNT_RECORD' (state, records) {}
}

export default {
  state,
  mutations
}
