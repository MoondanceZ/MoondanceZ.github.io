const state = {
  token: {},
  isLogin: false,
  currentUser: {}
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
  }
}

export default {
  state,
  mutations
}
