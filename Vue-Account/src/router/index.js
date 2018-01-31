import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import AcountList from '@/components/account/AccountList'
import AddAccount from '@/components/account/AddRecord'
import Login from '@/components/login/Login'
import Layout from '@/components/Layout'

Vue.use(Router)

const router = new Router({
  routes: [{
    path:'/',
    component: Layout,
    children:[{
      path: '',
      alias: '/Login',
      component: Login
    }, {
      path: '/Account/List',
      name: 'accountList',
      component: AcountList
    }, {
      path: '/Account/Add',
      name: 'addAccount',
      component: AddAccount
    }]
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})


router.beforeEach((to, from, next) => {
  store.commit('SET_ROUTER_LOG', {
    prev: from.path.toLowerCase(),
    next: to.path.toLowerCase()
  });
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
