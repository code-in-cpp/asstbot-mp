import wechat from './wechat'
import config from '@/config.js'

const url = config.service.messageUrl

const state = {
  data: [
  ]
}

const getters = {

}

const mutations = {
  appendMessage (state, message) {
    const timestamp = new Date()
    state.data.push({timestamp, message})
  }
}

var _impleSendmessage = (commit, id, type, data) => {
  const message = {
    from: {
      id
    },
    type,
    data
  }

  commit('appendMessage', message)

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: message,
      method: 'POST',
      success: (response) => {
        console.log(response)
        commit('appendMessage', response.data)
        resolve(response)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

var _sendmessage = (commit, type, data) => {
  return new Promise((resolve, reject) => {
    wechat.getOpenId().then((openid) => {
      console.log(openid)
      _impleSendmessage(commit, openid, type, data)
        .then((response) => {
          resolve(response)
        })
        .fail((err) => {
          reject(err)
        })
    })
    .fail((err) => {
      reject(err)
    })
  })
}

const actions = {
  fetchMessages () {
    return new Promise((resolve, reject) => {
    })
  },
  login ({commit}) {
    return _sendmessage(commit, 'login', {code: ''})
  },
  sendQuery ({commit}, query) {
    return _sendmessage(commit, 'text', {query})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
