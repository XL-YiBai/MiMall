import Vue from 'vue'
import Router from 'vue-router'
// import Login from './pages/login'
import Home from './pages/home'
import Index from './pages/index'
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Cart from './pages/cart'
// import Order from './pages/order'
// import OrderConfirm from './pages/orderConfirm'
// import OrderList from './pages/orderList'
// import OrderPay from './pages/orderPay'
// import AliPay from './pages/alipay'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      // home的所有子路由都复用了home组件加载的头部navheader和底部navfooter，从而只需要关注对应逻辑开发
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('./pages/product')
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('./pages/detail')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/order'),
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList')
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm')
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay')
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/alipay')
        }
      ]
    }
  ]
});