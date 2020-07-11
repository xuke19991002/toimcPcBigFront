import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
  routes
})

export default router
