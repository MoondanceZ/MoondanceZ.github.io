// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import { InfiniteScroll } from "mint-ui";
import layer from 'vue-layer'

import '@/assets/css/iconfont.css'
import '@/assets/css/style.css'

Vue.use(Vuex)
Vue.use(InfiniteScroll)
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false

FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
