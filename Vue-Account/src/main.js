// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import FastClick from 'fastclick'
import VueTouch from "vue-touch";
import {
  InfiniteScroll,
  Spinner,
  DatetimePicker
} from "mint-ui";
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import '@/assets/css/iconfont.css'
import '@/assets/css/style.css'

Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(VueTouch, {
  name: 'v-touch'
})
VueTouch.config.swipe = { //配置滑动区域为左滑动，解决和滚动事件的冲突
  direction: 'horizontal',
  threshold: 200
}

// Vue.use(Indicator)
// Vue.use(Toast);
// Vue.use(MintUI)
// Vue.component


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
