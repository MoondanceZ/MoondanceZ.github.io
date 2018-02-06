const state = {
  token: {},
  isLogin: false,
  currentUser: {},
  routerLog: {},
  isBack: false
}

//mutations
const mutations = {
  'SET_TOKEN' (state, token) {
    state.token = token;
  },
  'SET_CURRENT_USER' (state, user) {
    state.currentUser = user;
  },
  'SET_IS_LOGIN' (state, isLogin) {
    state.isLogin = isLogin;
  },
  'UPDATE_CURRENT_USER' (state, userInfo) {
    for (let key in userInfo) {
      if (user.hasOwnProperty(key)) {
        state.currentUser[key] = userInfo[key];

      }
    }
  },
  'SET_ROUTER_LOG'(state, param){
    state.routerLog.prev = param.prev;
    state.routerLog.next = param.next;
  },
  'SET_IS_BACK'(state, param){
    state.isBack = param;
  }
}

export default {
  state,
  mutations
}
