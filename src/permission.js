import router from './router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/connect/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/weighbridgeRecord'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 判断是否有获取全局设置，没有去获取
  if (store.getters.settingLoader !== true) {
    store.dispatch('app/loadSettings').then(resp => {
      document.title = store.getters.title || getPageTitle(to.meta.title)
    })
  }
  // start progress bar
  NProgress.start()
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const ff = store.getters.addRouters
      const hasRoles = store.getters.addRouters
      if (hasRoles) {
        next()
      } else {
        // 获取用户的登录信息
      //   try {
      //     // get user info
      await store.dispatch('user/getInfo').then(async(data) => {
        await store.dispatch('permission/generateRoutes', []).then(() => {
              // 生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })
      })
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
