import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import AcountList from '@/components/account/AccountList'
import AddAccount from '@/components/account/AddRecord'
import Login from '@/components/login/Login'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    alias: '/Login',
    component: Login
  }, {
    path: '/Account/List',
    component: AcountList
  }, {
    path: '/Account/Add',
    component: AddAccount
  }]
})

router.beforeEach((to, from, next) => {
  if (from.path != '/' || from.path !== '/Login') {
    next();
  }

  if (!store.state.user.isLogin) {
    next({
      path: '/Login',
    });
  } else {
    // 如果已经登录了的就可以访问该页面
    next();
  }
});

export default router
