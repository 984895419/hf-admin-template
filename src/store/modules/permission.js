import { asyncRoutes, constantRoutes } from '@/router'
import { isEmpty } from 'element-ui/src/utils/util'
import { getUserRoute } from '../../api/getRouteList'
import Layout from '@/layout'
import Vue from 'vue'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  if (route.menu) {
    return menus.indexOf(route.menu) > -1
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */

export function filterAsyncRoutes(routes, menus) {
  // eslint-disable-next-line no-undef
  const accessedRouters = asyncRouterMap.filter(route => {
    // filter,js语法里数组的过滤筛选方法
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        // 如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRoutes(route.children, menus)
        // 如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export function genRoutesFromMenuTree(childMenus) {
  // eslint-disable-next-line
  let accessedRouters = []

  if (!isEmpty(childMenus)) {
    childMenus.forEach(function(menu, index) {
      const menuRoute = {
        hidden: menu.hidden === '1',
        redirect: menu.redirect,
        alwaysShow: menu.alwaysshow === '1', // will always show the root menu

        meta: {
          title: menu.menuName,
          icon: menu.icon,
          noCache: menu.metaNocache === '0',
          breadcrumb: menu.metaBreadcrumb === '1'
        }
      }
      if (menu.parentId === 0) { // 根节点
        menuRoute.component = Layout
        menuRoute.path = `/${menu.menuAlias}`
      } else {
        const componentPath = menu.component
        menuRoute.name = menu.menuAlias
        menuRoute.path = menu.menuAlias
        menuRoute.component = (resolve) => require([`@/views${componentPath}`], resolve)
      }
      menuRoute.children = genRoutesFromMenuTree(menu.children)
      if (isEmpty(menuRoute.children)) {
        delete menuRoute.children
      }

      accessedRouters.push(menuRoute)
    })
  } else {
  }
  // console.log(accessedRouters, 'accessedRouters')
  return accessedRouters
}

const state = {
  routes: [],
  addRoutes: null
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // constantRoutes 默认路由  routes为基本路由
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // console.log(state.routes, 'state.routes')
  },
  // 当前权限方法集合
  SET_ROUTES_METHODS: (state, methods) => {
    state.routesMethods = methods
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      getUserRoute().then((res) => {
        let accessedRoutes = asyncRoutes
        const routesFromMenuTree = genRoutesFromMenuTree(res.menus)
        accessedRoutes = accessedRoutes.concat(routesFromMenuTree)
        commit('SET_ROUTES_METHODS', res.methods)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
