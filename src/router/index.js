import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/simpleCurd',
    children: [
      {
        path: 'simpleQuery',
        component: () => import('@/views/example/query/index'),
        name: 'simpleQuery',
        meta: { title: '简单查询表单', icon: 'dashboard', affix: true }
      },
      {
        path: 'simpleCurd',
        component: () => import('@/views/example/simpleCurd/index'),
        name: 'SimpleCurd',
        meta: { title: '单表简单查询', icon: 'dashboard', affix: true }
      },
      {
        path: 'simpleRefer',
        component: () => import('@/views/example/refer/index'),
        name: 'simpleRefer',
        meta: { title: '简单参照', icon: 'dashboard', affix: true }
      }
    ],
    meta: { title: '规范示例', icon: 'dashboard', affix: true }
  },
  {
    path: '/generator',
    component: Layout,
    redirect: '/generator/datasource',
    children: [
      {
        path: 'datasource',
        component: () => import('@/views/generator/datasource/index'),
        name: 'datasource',
        meta: { title: '数据源管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'generateTableInfo',
        component: () => import('@/views/generator/generateTableInfo/index'),
        name: 'generateTableInfo',
        meta: { title: '表管理管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'runColumn',
        component: () => import('@/views/generator/generateRunColumn/index'),
        name: 'runColumn',
        meta: { title: '运行字段配置', icon: 'dashboard', affix: true }
      }
    ],
    meta: { title: '代码生成器', icon: 'dashboard', affix: true }
  },
  {
    path: '/base',
    component: Layout,
    redirect: '/base/systemConfig',
    children: [
      {
        path: 'systemConfig',
        component: () => import('@/views/basic/baseSystemConfig/index'),
        name: 'systemConfig',
        meta: { title: '系统设置管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'tenant',
        component: () => import('@/views/basic/baseTenant/index'),
        name: 'tenant',
        meta: { title: '租户管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'dictType',
        component: () => import('@/views/basic/baseDictType/index'),
        name: 'dictType',
        meta: { title: '字典管理', icon: 'dashboard', affix: true }
      }
    ],
    meta: { title: '基础管理', icon: 'dashboard', affix: true }
  },
  {
    // 人事管理-用户模块
    path: '/oa',
    component: Layout,
    redirect: '/oa/account',
    children: [
      {
        path: 'account',
        component: () => import('@/views/oa/account'),
        name: 'account',
        meta: { title: '用户管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'mmdp',
        component: () => import('@/views/oa/mmdp'),
        name: 'mmdp',
        meta: { title: '密码修改', icon: 'dashboard', affix: true }
      },
      {
        path: 'reset',
        component: () => import('@/views/oa/reset'),
        name: 'reset',
        meta: { title: '密码重置', icon: 'dashboard', affix: true }
      }
    ],
    meta: { title: 'OA人事', icon: 'dashboard', affix: true }
  },
  {
    // 权限部分
    path: '/jurisdiction',
    component: Layout,
    redirect: '/jurisdiction/roleManagement',
    children: [
      {
        path: 'roleManagement',
        component: () => import('@/views/jurisdiction/roleManagement'),
        name: 'roleManagement',
        meta: { title: '角色管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'roleUser',
        component: () => import('@/views/jurisdiction/roleUser'),
        name: 'roleUser',
        meta: { title: '角色用户', icon: 'dashboard', affix: true }
      }
    ],
    meta: { title: '权限管理', icon: 'dashboard', affix: true }
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
