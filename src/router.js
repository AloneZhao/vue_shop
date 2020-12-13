import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index')
  },
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/login/login')
  }
]

const router = new Router({
  routes
})

// 挂在全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  return next()
})

export default router
