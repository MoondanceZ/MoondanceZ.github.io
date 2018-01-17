import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import AcountList from '@/components/account/AccountList'
import AddAccount from '@/components/account/AddRecord'
import Login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    children: [{
      path: '',
      alias: 'Account/List',
      component: AcountList
    }, {
      path: 'Account/Add',
      component: AddAccount
    }]
  }, {
    path: '/Login',
    component: Login
  }]
})
