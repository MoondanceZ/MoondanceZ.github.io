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
  'CREATE_ACCOUNT_RECORD' (state, param) {
    state.accountList[param.index].DateAmount = param.dateAmount;
    state.accountList[param.index].AccountRecords.unshift(param.recordItem);
  },
  'SPLICE_ACCOUNT_ITEM' (state, param) {
    state.accountList.splice(param.index, 0, param.record);
  },
  'PUSH_ACCOUNT_ITEM' (state, item) {
    state.accountList.push(item);
  },
  'UPDATE_ACCOUNT_ITEM'(state, param){
    state.accountList[param.updateInfo.index1].DateAmount =  param.dateAmount;
    state.accountList[param.updateInfo.index1].AccountRecords[param.updateInfo.index2] = param.record;
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
  'DELETE_ACCOUNT_RECORD' (state, param) {
    if (state.accountList[param.index1].AccountRecords.length == 1) { //将整个删除
      state.accountList.splice(param.index1, 1);
    }else{
      state.accountList[param.index1].AccountRecords.splice(param.index2, 1);
    }
  }
}

export default {
  state,
  mutations
}
