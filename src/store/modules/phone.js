import config from '@/config.js'
import wechat from './wechat'
import util from '@/utils/index'

const url = config.service.phoneUrl
const requestCodeUrl = config.service.requestCodeUrl
const verifyCodeUrl = config.service.verifyCodeUrl

const state = {
  phone: '',
  requestTimes: 0
}

const getters = {
  phone: state => state.phone
}

const mutations = {
  setPhone (state, phone) {
    state.phone = phone
  },
  setRequestTimes (state, times) {
    state.requestTimes = times
  }
}

function _toGetPhone (openid) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {
        openid: openid
      },
      success: (response) => {
        if (response.statusCode === 200) {
          resolve(response.data.phone)
        } else {
          resolve('')
        }
      },
      faile: (err) => {
        reject(err)
      }
    })
  })
}

function _tobindPhone (openid, phone, formId) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: 'POST',
      data: {
        openid,
        phone,
        formId
      },
      success: (response) => {
        resolve(response)
      },
      faile: (err) => {
        reject(err)
      }
    })
  })
}

function _toVerifyCode (phone, code) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: verifyCodeUrl,
      method: 'POST',
      data: {
        phone,
        code
      },

      success: (response) => {
        if (response.data.result === 'ok') {
          resolve()
        } else {
          reject(response)
        }
      },

      fail: (err) => {
        reject(err)
      }
    })
  })
}

function __currentday () {
  var d = new Date()
  return util.formatDay(d)
}

function __isReachLimit () {
  var requestData = wx.getStorageSync('requestCode') || {time: 0}
  console.log(requestData)
  return __currentday() === requestData.last && requestData.time >= 10
}
function __updateRequest () {
  var requestData = wx.getStorageSync('requestCode') || {time: 0}
  const currentday = __currentday()
  if (requestData.last === currentday) {
    requestData.time++
  } else {
    requestData.last = currentday
    requestData.time = 1
  }

  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: 'requestCode',
      data: requestData,
      success: () => {
        resolve()
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const actions = {
  toBindPhone ({commit}, {phone, code, formId}) {
    return new Promise((resolve, reject) => {
      _toVerifyCode(phone, code)
        .then(() => {
          wechat.getOpenId()
            .then((openid) => {
              _tobindPhone(openid, phone, formId)
                .then(() => {
                  commit('setPhone', phone)
                  resolve()
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

  toUnbindPhone ({commit}, formId) {
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((openid) => {
          _tobindPhone(openid, '', formId)
            .then(() => {
              commit('setPhone', '')
              resolve()
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

  toGetPhone ({commit}) {
    return new Promise(function (resolve, reject) {
      wechat.getOpenId()
        .then((openid) => {
          _toGetPhone(openid)
            .then((phone) => {
              commit('setPhone', phone)
              resolve()
            })
            .catch((err) => { reject(err) })
        })
        .catch((err) => { reject(err) })
    })
  },

  toRequestCode ({commit}, phone) {
    return new Promise((resolve, reject) => {
      if (!__isReachLimit()) {
        wx.request({
          url: requestCodeUrl,
          method: 'POST',
          data: {
            phone
          },
          success: (response) => {
            if (response.statusCode !== 200) {
              reject(response)
            } else {
              __updateRequest().then(() => {
                resolve()
              }).catch(err => {
                reject(err)
              })
            }
          },
          fail: (err) => {
            reject(err)
          }
        })
      } else {
        console.log('fail')
        reject(new Error('请求太多'))
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
