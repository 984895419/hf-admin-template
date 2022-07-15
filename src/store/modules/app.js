import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import store from '@/store'
import { isEmpty } from 'element-ui/src/utils/util'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, isSuccessResult } from '@/utils/ajaxResultUtil'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  // 语言
  language: getLanguage(),
  // 支持的语言
  supportLanguage: ['zh', 'en', 'es'],
  // 尺寸大小
  size: Cookies.get('size') || 'mini',
  // 标题名称
  title: '',
  // 设置是否从后端拉取了
  settingLoader: false,
  // 分页大小,
  pageSize: 50,
  // 默认支持的分页大小
  pageSizes: [],
  // 是否是开发环境？
  isDeveloping: process.env.NODE_ENV === 'development',
  // 前端的提示是否开启，影响范围为国际化文件中以“Helper”结尾的用户帮助
  helper: true,
  // 企业微信扫码
  qywxScan: false,
  tenantOpen: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_TITLE: (state, title) => {
    state.title = title
  },
  SET_LOADING_FLAG: (state, settingLoader) => {
    state.settingLoader = settingLoader
  },
  SET_SUPPORT_LANGUAGE: (state, supportLanguage) => {
    state.supportLanguage = supportLanguage
  },
  SET_PAGE_SIZE: (state, pageSize) => {
    state.pageSize = pageSize
  },
  SET_PAGE_SIZES: (state, pageSizes) => {
    state.pageSizes = pageSizes
  },
  SET_IS_DEVELOPING: (state, isDeveloping) => {
    state.isDeveloping = isDeveloping
  },
  SET_HELPER: (state, helper) => {
    state.helper = helper
  },
  SET_QYWX_SCAN: (state, qywxScan) => {
    state.qywxScan = qywxScan
  },
  SET_OPEN_TENANT: (state, open) => {
    state.tenantOpen = open
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit, state, dispatch }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  loadSettings({ commit }, size) {
    return new Promise((resolve, reject) => {
      // 初始从后台加载基础配置
      baseApiGetMethod('/api/open/settings').then(resp => {
        commit('SET_LOADING_FLAG', true)
        if (isSuccessResult(resp)) {
          const data = getData(resp)
          // 标题设置
          commit('SET_TITLE', data['fe.project.name'])
          // 设置
          commit('SET_SIZE', data['fe.theme.size'] || 'mini')
          // 语言设置
          const language = (navigator.languages ? navigator.languages[0]
            : navigator.language).split('-')[0]
          commit('SET_LANGUAGE', language)
          // 设置支持的语种
          commit('SET_SUPPORT_LANGUAGE', data['fe.theme.supportLanguage']
            ? data['fe.theme.supportLanguage'].split(',') : ['zh', 'en', 'es'])
          // 设置分页
          commit('SET_PAGE_SIZE', data['fe.setting.pageSize'] ? parseInt(data['fe.setting.pageSize']) : 50)
          commit('SET_PAGE_SIZES', data['fe.setting.pageSizes']
            ? data['fe.setting.pageSizes'].split(',').map(t => parseInt(t)) : undefined)
          // 设置开发功能是否启用
          commit('SET_IS_DEVELOPING', process.env.NODE_ENV === 'development' && data['fe.setting.develop.helper'] === 'true')
          // 设置功能是否开启
          commit('SET_HELPER', data['fe.setting.tooltip'] ? data['fe.setting.tooltip'] : true)
          // 设置是否可以开启微信扫码
          commit('SET_QYWX_SCAN', data['hf.login.qywxscan'] ? data['hf.login.qywxscan'] : true)
          // 设置是否开启租户
          commit('SET_OPEN_TENANT', data['hf.setting.tenant'] ? data['hf.setting.tenant'] : true)
        }
        resolve(resp)
      }).catch(() => {
        reject()
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

var test = { a: 'aaa' }
export { test }
