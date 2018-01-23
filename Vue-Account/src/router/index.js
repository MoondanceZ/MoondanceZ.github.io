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
  console.log(to);
  console.log(from);
  console.log(store.state.user.isLogin);
  // 判断配置的路由中是否存在needLogin存在则做出对应的判断
  // if (true) {
  // 从状态管理器（vuex）中获取登录状态，如果未登录过的跳转至登录页
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
  // } else {
  //   next();
  // }
});

export default router
