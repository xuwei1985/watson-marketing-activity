import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import GuideView from '@/views/GuideView.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
    path: '/applyList',
    name: 'applyList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ApplyListView.vue')
  },
  {
    path: '/guide',
    name: 'guide',
    component: GuideView
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import(/* webpackChunkName: "error" */ '@/views/ApplyView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import(/* webpackChunkName: "error" */ '@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  console.log('进入守卫')
  next()
  if (to.meta.auth) {

  }
})

export default router
