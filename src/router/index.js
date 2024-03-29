import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/index.vue'
Vue.use(VueRouter)

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName:'Home' */ '@/views/Home/index.vue'),
      meta: {
        noShowBreadcrumb: true,
        title: '首页'
      }
    }]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName:'Login' */ '@/views/Login/index.vue'),
    meta: {
      noShowBreadcrumb: true,
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName:'Error' */ '@/views/Error/404.vue'),
    meta: {
      noShowBreadcrumb: true,
      title: '404'
    }
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history',
  routes: constantRoutes
})

const router = createRouter()
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [{
  path: '/test',
  component: Layout,
  redirect: 'test',
  meta: {
    title: '测试模块',
    role: ['admin']
  }, // 页面需要的权限
  children: [{
    path: '/test/item',
    component: () => import(/* webpackChunkName:'test' */ '@/views/Test/index.vue'),
    meta: {
      noShowBreadcrumb: false,
      title: '测试页面'
    }
  }]
},
{
  path: '*',
  redirect: '/404',
  meta: {
    noShowBreadcrumb: true,
    title: '404'
  }
}
]

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
