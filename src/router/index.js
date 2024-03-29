import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/components/layout/index.vue'
Vue.use(VueRouter)

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{ path: '/home', name: 'home', /* webpackChunkName:Home */ component: () => import('../views/home/index.vue') }]
  },
  { path: '/login', component: Login },
  { path: '/404', component: () => import('@/views/error/404.vue') }
]

const createRouter = () => new VueRouter({
  // mode: 'history',
  routes: constantRoutes
})

const router = createRouter()
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  {
    path: '/test',
    component: Layout,
    redirect: 'test',
    meta: { role: ['admin', 'user'] }, // 页面需要的权限
    children: [
      { path: '/test/item', component: () => import('@/views/test/index.vue') }
    ]
  },
  { path: '*', redirect: '/404' }
]

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
