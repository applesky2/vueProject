import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'
import Adress from '@/views/Adress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path:'/adress',
      name: 'Adress',
      component: Adress
    }
  ]
})
