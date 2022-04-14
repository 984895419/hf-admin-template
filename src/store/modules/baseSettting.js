const state = {
  // 全局设置，尺寸大小
  size: 'mini',
  // 默认分页条数大小
  pageSize: 20
}

const mutations = {
  SET_SIZE: (state, size) => {
    state.size = size
  },
  SET_PAGE_SIZE: (state, pageSize) => {
    state.pageSize = pageSize
  }
}

const actions = {
  /**
   * 从执行的url上获取用户的基础配置信息
   * @param commit
   * @param state
   * @param loginForm
   * @returns {Promise<unknown>}
   */
  loadBaseSetting({ commit, state }, loginForm) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      // TODO 发起请求，并设置到state里
      resolve()
    })
  },
  /**
   * 设置页面的尺寸大小
   * @param commit
   * @param size
   * @returns {Promise<unknown>}
   */
  setSize({ commit }, size) {
    return new Promise(resolve => {
      commit('SET_SIZE', size)
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
