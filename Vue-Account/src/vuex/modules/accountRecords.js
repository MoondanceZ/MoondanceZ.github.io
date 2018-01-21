const state = {
  isLoading: false,
  accountList: []
}

//mutations
const mutations = {
  'SET_IS_LOADING' (state, loading) {
    state.SET_IS_LOADING = loading;
  },
  'SET_ACCOUNT_LIST' (state, list) {
    state.accountList.push(list);
  },
  'DELETE_ACCOUNT_RECORD' (state, records) {

  }
}

export default {
  state,
  mutations
}
