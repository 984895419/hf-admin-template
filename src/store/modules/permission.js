import { asyncRoutes, constantRoutes } from '@/router'
import { isEmpty } from 'element-ui/src/utils/util'
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
        path: menu.path,
        hidden: menu.hidden === '1',
        redirect: menu.redirect,
        alwaysShow: menu.alwaysshow === '1', // will always show the root menu
        name: menu.name,
        meta: {
          title: menu.metaTitle,
          icon: menu.metaIcon,
          noCache: menu.metaNocache === '0',
          breadcrumb: menu.metaBreadcrumb === '1'
        }
      }
      if (menu.parentMenuId === '0') { // 根节点
        menuRoute.component = () => import('@/layout')
      } else {
        const componentPath = menu.component
        if (!isEmpty(componentPath) && componentPath.startsWith('/jmreport/') && componentPath.indexOf('/jmreport/index') < 0) {
          let urlT = ''
          const tempstr = componentPath.substr(componentPath.indexOf('/jmreport/') + 10)
          if (tempstr.indexOf('http') > -1) {
            urlT = tempstr.substr(tempstr.indexOf('/') + 1)
          }
          const temp = {
            template:
              '  <div>' +
              '    <iframe :src="url" style="position: absolute; top: 0; left: 0;width: 100%;height: 100%; " />' +
              '  </div>',
            data() {
              return {
                url: urlT
              }
            },
            mounted() {
              if (!isEmpty(this.$route.params.url)) {
                this.url = this.$route.params.url
              }
            }
          }
          menuRoute.component = Vue.component(menu.name, temp)
        } else if (!isEmpty(componentPath) && componentPath.startsWith('/urlRedirect/')) {
          const urlT = componentPath.substr(componentPath.indexOf('/urlRedirect/') + '/urlRedirect/'.length)
          const temp = {
            template:
              '  <div>' +
              '    <iframe :src="srcParamsInside" style="position: absolute; top: 5px; left: 5px;width: 100%;height: 100%; " />' +
              '  </div>',
            props: {
              src: String
            },
            data() {
              return {
                /**
                 * 暂存map
                 */
                storeMap: {}
              }
            },
            computed: {
              srcParamsInside() {
                // 进行组合，添加站点
                const url = this.src
                const qIndex = url.indexOf('?')
                if (qIndex > 0) {
                  const urls = url.substr(qIndex + 1)
                  let urlParams = ''
                  const paramsCnts = urls.split('&')
                  for (const ind in paramsCnts) {
                    const params = paramsCnts[ind].split('=')
                    if (params[1].startsWith('$')) {
                      urlParams += params[0] + '=' + this.storeMap[params[1].substr(1)]
                    } else {
                      urlParams += params[0] + '=' + params[1]
                    }

                    if (ind !== (paramsCnts.length - 1) + '') {
                      urlParams += '&'
                    }
                  }

                  return url.substr(0, qIndex + 1) + urlParams
                }
                return url
              }
            },
            created() {
              this.storeMap['username'] = this.$store.getters.username
              this.storeMap['userCode'] = this.$store.getters.userCode
              this.storeMap['userId'] = this.$store.getters.userId
              this.storeMap['companyId'] = this.$store.getters.companyId
              this.storeMap['organizationId'] = this.$store.getters.curCompanyId
              this.storeMap['dept'] = this.$store.getters.dept
              this.storeMap['deptId'] = this.$store.getters.curDeptId
              this.storeMap['pageSize'] = 30
            }
          }
          menuRoute.component = Vue.component(menu.name, temp)
          menuRoute.props = {
            src: urlT
          }
        } else if (!isEmpty(componentPath)) {
          // menuRoute.component = () => import(`@/views${componentPath}`) --旧版本nodejs ..新装版不支持
          menuRoute.component = (resolve) => require([`@/views${componentPath}`], resolve)
        }
      }
      menuRoute.children = genRoutesFromMenuTree(menu.subMenuList)
      if (isEmpty(menuRoute.children)) {
        delete menuRoute.children
      }
      accessedRouters.push(menuRoute)
    })
  }

  return accessedRouters
}
const state = {
  routes: [],
  addRoutes: null
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, userPermission) {
    return new Promise(resolve => {
      let accessedRoutes = asyncRoutes
      const menuTree = userPermission.menuTree
      const routesFromMenuTree = genRoutesFromMenuTree(menuTree)
      if (userPermission.isAdmin) {
        accessedRoutes = accessedRoutes.concat(routesFromMenuTree)
      } else {
        accessedRoutes = routesFromMenuTree
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, menuList)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
