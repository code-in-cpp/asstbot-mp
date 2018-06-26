import config from '@/config.js'

var url = config.service.openIdUrl

const state = {
  openid: ''
}

const actions = {
  getOpenId () {
    if (state.openid === '') {
      return new Promise(function (resolve, reject) {
        wx.login({
          success: function (loginResult) {
            wx.request({
              url: `${url}?code=${loginResult.code}`,
              success: function (res) {
                if (res.data) {
                  state.openid = res.data.openid
                  resolve(state.openid)
                } else {
                  reject(res)
                }
              },
              fail: function (err) {
                reject(err)
              }
            })
          },
          fail: function (error) {
            reject(error)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(state.openid)
      })
    }
  }
}

export default actions
