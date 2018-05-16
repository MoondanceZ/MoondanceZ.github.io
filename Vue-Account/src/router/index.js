import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import AcountList from '@/views/account/AccountList'
import AddAccount from '@/views/account/AddRecord'
import Login from '@/views/user/Login'
import UserInfo from '@/views/user/UserInfo'
import Layout from '@/components/Layout'

Vue.use(Router)


const router = new Router({
  routes: [{
    path: '/',
    component: Layout,
    children: [{
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
    }, {
      path: '/User/Info',
      name: 'userInfo',
      component: UserInfo
    }]
  }],
  // routes: [{
  //   path: '',
  //   alias: '/Login',
  //   component: Login
  // }, {
  //   path: '/Account/List',
  //   name: 'accountList',
  //   component: AcountList
  // }, {
  //   path: '/Account/Add',
  //   name: 'addAccount',
  //   component: AddAccount
  // }],
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
router.afterEach((to, from)=>{
  this.isBack = false;
})
export default router
