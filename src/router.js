import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    redirect: '/welcome',
    component: () => import('@/views/index/index'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/index/welcome')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/user/userIndex')
      }
    ]
  },
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
  console.log('路由')
  const token = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    if (token) {
      next('/index')
    }
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router
