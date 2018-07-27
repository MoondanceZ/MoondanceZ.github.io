import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import AcountList from '@/views/account/AccountList'
import AddAccount from '@/views/account/AddRecord'
import Login from '@/views/user/Login'
import UserInfo from '@/views/user/UserInfo'
import UserSetting from '@/views/user/Setting'
import Layout from '@/components/Layout'

Vue.use(Router)

const debug = process.env.NODE_ENV !== 'production'

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
    }, {
      path: '/User/Setting',
      name: 'userSetting',
      component: UserSetting
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
  let sessionUser = sessionStorage.getItem("User");
  let sessionToken = sessionStorage.getItem("Token");

  if (sessionUser && sessionToken) {
    let user = JSON.parse(sessionUser);
    let token = JSON.parse(sessionToken);

    if (!store.state.user.currentUser.Id) store.commit("SET_CURRENT_USER", user);
    if (!store.state.user.token.access_token) store.commit("SET_TOKEN", token);
    if (!store.state.user.isBack) store.commit("SET_IS_LOGIN", true);
    next();
  } else if (!store.state.user.isLogin) {
    next({
      path: '/Login',
    });
  } else {
    // 如果已经登录了的就可以访问该页面
    next();
  }
  // if(!debug){
  //   if (!store.state.user.isLogin) {
  //     next({
  //       path: '/Login',
  //     });
  //   } else {
  //     // 如果已经登录了的就可以访问该页面
  //     next();
  //   }
  // }
});
router.afterEach((to, from) => {
  this.isBack = false;
})
export default router
