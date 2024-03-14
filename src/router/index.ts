import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
let pages = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/homePage',
    component: () => import('@/layout/default-layout.vue'),
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage.vue'),
        meta: {
          title: '主页',
          headMenu: true,
          asideMenu: false
        }
      }, {
        path: '/user',
        name: 'user',
        component: () => import('@/views/sqlCreatePage.vue'),
        meta: {
          title: 'SQL语句生成器',
          headMenu: true,
          asideMenu: false
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: pages
});
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start();
  next();
});

router.afterEach(() => {
  // 结束进度条
  NProgress.done();
});

export default router
