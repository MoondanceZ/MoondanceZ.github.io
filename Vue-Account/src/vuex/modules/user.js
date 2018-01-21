const state = {
  token: {},
  isLogin: false,
  cuerentUser: {}
}

//mutations
const mutations = {
  'SET_TOKEN' (state, token) {
    state.token = token;
  },
  'SET_CURRENT_USER' (state, user) {
    state.cuerentUser = user;
  },
  'SET_isLogin' (state, isLogin) {
    state.isLogin = isLogin;
  },
  'UPDATE_CURRENT_USER' (state, userInfo) {
    for (let key in userInfo) {
      if (user.hasOwnProperty(key)) {
        state.cuerentUser[key] = userInfo[key];

      }
    }
  }
}

export default {
  state,
  mutations
}
