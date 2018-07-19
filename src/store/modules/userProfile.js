import wechat from './wechat'
import config from '@/config.js'

const url = config.service.userInfoUrl

const state = {
  userInfo: {},
  authed: undefined,
  loginStatus: undefined
}

const getters = {
  hasLogin: state => {
    return state.authed || state.loginStatus
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setAuth (state, auth) {
    state.authed = auth
  },
  setLogin (state) {
    state.loginStatus = true
  }
}

function __updateUserInfo (userInfo) {
  return new Promise((resolve, reject) => {
    wechat.getOpenId()
      .then((openid) => {
        wx.request({
          url,
          data: {
            id: openid,
            wechat: userInfo
          },
          method: 'POST',
          success: (response) => {
            resolve(response)
          },
          catch: (err) => {
            reject(err)
          }
        })
      })
  })
}

function __getUserInfo (auth) {
  return new Promise((resolve, reject) => {
    if (auth) {
      wx.getUserInfo({
        success: function (res) {
          resolve(res.userInfo)
        },
        fail: function (err) {
          reject(err)
        }
      })
    } else {
      resolve({
        nickName: '',
        avatarUrl: '',
        gender: 0,
        city: ''
      })
    }
  })
}

const actions = {
  updateUserInfo ({dispatch, commit}) {
    return new Promise((resolve, reject) => {
      dispatch('updateAuthStatus')
        .then((auth) => {
          __getUserInfo(auth).then((userInfo) => {
            __updateUserInfo(userInfo)
              .then((response) => {
                resolve(response)
              })
              .catch((err) => {
                reject(err)
              })
          })
          .catch((err) => {
            reject(err)
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  updateAuthStatus ({commit}) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (response) => {
          let auth = !!response.authSetting['scope.userInfo']
          commit('setAuth', auth)
          resolve(auth)
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
