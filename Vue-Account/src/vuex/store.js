import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

import user from './modules/user'
import accountRecords from './modules/accountRecords'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    user,
    accountRecords
  },
  strict: debug
})
