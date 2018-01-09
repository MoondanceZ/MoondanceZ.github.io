import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import HelloWorld from '@/components/HelloWorld'
import AcountList from '@/components/Account/AccountList'
import Add from '@/components/Account/AddRecord'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    children: [{
        path: '/',
        component: AcountList,
        name: "Hello World"
      },
      {
        path: '/Add',
        component: Add,
        name: "Add"
      }
    ]
  }]
})
