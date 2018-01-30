import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import AcountList from '@/components/account/AccountList'
import AddAccount from '@/components/account/AddRecord'
import Login from '@/components/login/Login'
import Layout from '@/components/Layout'

// // 增强原方法，好处是旧的业务模块不需要任何变动
// Router.prototype.go = function () {
//   this.isBack = true
//   window.history.go(-1)
// }

// // 或者你可以新建一个方法
// Router.prototype.goBack = function () {
//   this.isBack = true
//   window.history.go(-1)
// }

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
      console.log(savedPosition);
      
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
