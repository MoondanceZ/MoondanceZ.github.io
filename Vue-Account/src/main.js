// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import FastClick from 'fastclick'
import { InfiniteScroll, Spinner, DatetimePicker  } from "mint-ui";
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import layer from 'vue-layer'

import '@/assets/css/iconfont.css'
import '@/assets/css/style.css'

Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(DatetimePicker.name, DatetimePicker);

// Vue.use(Indicator)
// Vue.use(Toast);
// Vue.use(MintUI)
// Vue.component

// Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false

FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
