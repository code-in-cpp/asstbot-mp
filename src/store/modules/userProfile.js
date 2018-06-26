const state = {
  userInfo: {},
  authed: false
}

const getters = {
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setAuth (state, auth) {
    state.authed = auth
  }
}

const actions = {
  updateUserInfo ({commit}) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (response) => {
          if (response.authSetting['scope.userInfo']) {
            commit('setAuth', true)
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              }
            })
          } else {
            commit('setAuth', false)
          }
        }
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
