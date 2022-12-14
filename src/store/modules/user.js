import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/connect/auth'
import { resetRouter } from '@/router'
import store from '@/store'
import mockUserInfo from '@/mock/menulist'

const state = {
  token: getToken(),
  avatar: '',
  introduction: '',
  roles: [],
  isAdmin: null,
  username: '',
  userCode: '',
  userId: '',
  deptName: '',
  dept: '',
  companyName: '',
  curCompanyName: '',
  companyId: '',
  curCompanyId: '',
  menuList: [],
  operateList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, userInfo) => {
    state.isAdmin = userInfo.isAdmin
    state.username = userInfo.username
    state.userCode = userInfo.userCode
    state.userId = userInfo.userId
    state.deptName = userInfo.deptName
    state.dept = userInfo.dept
    state.companyName = userInfo.companyName
    state.companyId = userInfo.companyId
    state.curCompanyName = userInfo.curCompanyName
    state.curCompanyId = userInfo.curCompanyId
    state.curDeptId = userInfo.curDeptId
    state.curDeptName = userInfo.curDeptName
    state.menuList = userInfo.menuList
    state.operateList = userInfo.operateList
  },
  RESET_USER: (state) => {
    state.isAdmin = null
    state.username = ''
    state.userCode = ''
    state.userId = ''
    state.companyName = ''
    state.companyId = ''
    state.menuList = []
    state.operateList = []
  }
}

const actions = {
  // user login
  login({ commit, state }, loginForm) {
    // const { username, password } = userInfo
    //  Object.assign(param, this.searchForm, this.pageData)
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      login(Object.assign(loginForm, { 'lang': store.getters.language })).then(response => {
        const data = response

        commit('SET_TOKEN', data.obj)
        setToken(data.obj)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // const data = response
        const data = mockUserInfo
        // ??????????????????
        commit('SET_USER', data.obj)
        // cookie??????????????????,??????vuex????????????,????????????????????????????????????
        // ????????????
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeCampany({ commit, state, dispatch }, param) {
    return new Promise((resolve, reject) => {
      getInfo(param).then(response => {
        const data = response
        // ??????????????????
        commit('SET_USER', data.obj)
        // cookie??????????????????,??????vuex????????????,????????????????????????????????????
        // ????????????
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        store.commit('permission/SET_ROUTES', null)
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  setToken({ commit }, token) {
    return new Promise(resolve => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
