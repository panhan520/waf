import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { NO_RESET_WHITE_LIST } from '@/constants'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/websiteSettings/index',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'RedirectWrap',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal-center',
    name: 'Personal',
    meta: {
      title: t('router.personal'),
      hidden: true,
      canTo: true
    },
    children: [
      {
        path: 'personal-center',
        component: () => import('@/views/Personal/PersonalCenter/PersonalCenter.vue'),
        name: 'PersonalCenter',
        meta: {
          title: t('router.personalCenter'),
          hidden: true,
          canTo: true
        }
      }
    ]
  }
  // {
  //   path: '/404',
  //   component: () => import('@/views/Error/404.vue'),
  //   name: 'NoFind',
  //   meta: {
  //     hidden: true,
  //     title: '404',
  //     noTagsView: true
  //   }
  // }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/websiteSettings',
    component: Layout,
    name: 'WebsiteSettings',
    meta: {},
    redirect: '/websiteSettings/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/websiteSettings/websiteSetting.vue'),
        name: 'websiteSettingsList',
        meta: {
          title: '网站设置',
          icon: 'vi-ep:management'
        }
      }
    ]
  },
  {
    path: '/vulnerabilityProtection',
    component: Layout,
    name: 'VulnerabilityProtection',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/VulnerabilityProtection/index.vue'),
        name: 'vulnerabilityProtectionList',
        meta: {
          title: '漏洞防护',
          icon: 'vi-ic:outline-webhook'
        }
      }
    ]
  },
  {
    path: '/logManagement',
    component: Layout,
    name: 'LogManagement',
    meta: {},
    children: [
      {
        path: 'index',
        // component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'LogManagementList',
        meta: {
          title: '日志管理',
          icon: 'vi-clarity:document-solid'
        }
      }
    ]
  }
  // {
  //   path: '/authorization',
  //   component: Layout,
  //   redirect: '/authorization/user',
  //   name: 'Authorization',
  //   meta: {
  //     title: t('router.authorization'),
  //     icon: 'vi-eos-icons:role-binding',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'department',
  //       component: () => import('@/views/Authorization/Department/Department.vue'),
  //       name: 'Department',
  //       meta: {
  //         title: t('router.department')
  //       }
  //     },
  //     {
  //       path: 'user',
  //       component: () => import('@/views/Authorization/User/User.vue'),
  //       name: 'User',
  //       meta: {
  //         title: t('router.user')
  //       }
  //     },
  //     {
  //       path: 'menu',
  //       component: () => import('@/views/Authorization/Menu/Menu.vue'),
  //       name: 'Menu',
  //       meta: {
  //         title: t('router.menuManagement')
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/Authorization/Role/Role.vue'),
  //       name: 'Role',
  //       meta: {
  //         title: t('router.role')
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/waf' : '/'),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
