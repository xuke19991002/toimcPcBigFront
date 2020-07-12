import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('_views/channels/Index')
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: () => import('_views/channels/Template1')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/Reg'),
    beforeEnter(to, from, next){
      if(from.name === 'login'){
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/Forget')
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this', // 设置精准激活匹配 要设置的class名
  routes
})

export default router
