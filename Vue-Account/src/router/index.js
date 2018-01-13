import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import HelloWorld from '@/components/HelloWorld'
import AcountList from '@/components/account/AccountList'
import AddAccount from '@/components/account/AddRecord'

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
  }]
})
