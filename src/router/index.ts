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

        }
      }, {
        path: '/projects',
        name: 'projects',
        component: () => import('@/views/projectsPage.vue'),
        meta: {
          title: '我的项目',
          headMenu: true,
        },
        children: [
          {
            path: '/projects/sqlCreate',
            name: 'sqlCreate',
            component: () => import('@/views/projects/sqlCreate.vue'),
            meta: {
              title: 'SQL语句生成器',
              headMenu: false,
              asideMenu: true
            }
          },
        ]
      },
      {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/toolsPage.vue'),
        meta: {
          title: '小工具',
          headMenu: true,
          asideMenu: true
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
