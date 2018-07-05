import wechat from './wechat'
import config from '@/config.js'

// console.log(config)
const url = config.service.userInfoUrl

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
                // console.log(res.userInfo)
                wechat.getOpenId()
                  .then((openid) => {
                    wx.request({
                      url,
                      data: {
                        id: openid,
                        wechat: res.userInfo
                      },
                      method: 'POST',
                      success: (response) => {
                        // console.log(response.data)
                        commit('appendMessage', response.data)
                        resolve(response)
                      },
                      fail: (err) => {
                        reject(err)
                      }
                    })
                  })
              }
            })
          } else {
            commit('setAuth', false)
            reject(response)
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
