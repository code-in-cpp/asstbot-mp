import wechat from './wechat'
import config from '@/config.js'

var url = `${config.service.hostRoot}/chatbot/survey`
var surveyId = ''
var chatBot = 'surveyBot'
var sceneMode = 'publish'

const state = {
  creatorBotMsg: [],
  surveybotMsg: []
}

var __appendMsg = function (state, msg) {
  if (chatBot === 'surveyBot') {
    state.surveybotMsg = [...state.surveybotMsg, msg]
  } else {
    state.creatorBotMsg = [...state.creatorBotMsg, msg]
  }
}

const getters = {
}

const mutations = {
  appendMessage (state, message) {
    const timestamp = new Date()
    __appendMsg(state, {timestamp, ...message})
  },
  talkToBotFather (state) {
    chatBot = 'bodFather'
    url = `${config.service.hostRoot}/chatbot`
  },
  talkToSurveyBot (state, {id, scene}) {
    state.surveybotMsg = []
    chatBot = 'surveyBot'
    url = `${config.service.hostRoot}/chatbot/survey`
    surveyId = id
    sceneMode = scene
  },
  appendDividerMessage (state, cause) {
    const timestamp = new Date()
    __appendMsg(state, {timestamp, gui: 'gui', type: 'divider'})
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
  const responseMessage = {
    to: {
      id: ''
    },
    msgs: [
      {type: data.type, reply: data.content}
    ]
  }
  if (data.type === 'getUserinfo') {
    commit('appendMessage', responseMessage)
    return
  }
  if (type === 'allow') {
    commit('appendMessage', message)
    return
  }
  commit('appendMessage', message)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: message,
      method: 'POST',
      success: (response) => {
        commit('appendMessage', response.data)
        resolve(response)
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器出问题了，工程师正在抓紧解决',
          icon: 'none'
        })
        console.log('test')
        reject(err)
      },
      complete: (response) => {
        if (response.statusCode !== 200) {
          wx.showToast({
            title: '服务器出问题了，工程师正在抓紧解决',
            icon: 'none'
          })
          console.error(response)
          reject(response)
        }
      }
    })
  })
}

var _sendmessage = (commit, type, data) => {
  return new Promise((resolve, reject) => {
    wechat.getOpenId().then((openid) => {
      // console.log(openid)
      _impleSendmessage(commit, openid, type, data)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
    .catch((err) => {
      console.error(err)
      reject(err)
    })
  })
}

var __sendLogin = (commit, isNew) => {
  return new Promise((resolve, reject) => {
    _sendmessage(commit, 'login', {code: '', isNew})
              .then(() => {
                wx.setStorage({
                  key: 'has-login',
                  value: 'true',
                  success: () => {
                    resolve()
                  },
                  fail: (err) => {
                    reject(err)
                  }
                })
              })
              .catch((err) => {
                console.error(err)
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
  },
  sendImage ({commit}, {url, indicator}) {
    return _sendmessage(commit, 'image', {url, indicator})
  },
  sentRadioReply ({ commit }, data) {
    return _sendmessage(commit, 'radio-reply', data)
  },
  sentCheckBoxReply ({ commit }, data) {
    return _sendmessage(commit, 'checkbox-reply', data)
  },
  start ({commit}) {
    if (chatBot === 'surveyBot') {
      return _sendmessage(commit, 'dialog-start', {surveyId, scene: sceneMode})
    } else {
      return new Promise((resolve, reject) => {
        wx.getStorage({
          key: 'has-login',
          success: (res) => {
            __sendLogin(commit, false)
              .then(() => {
                resolve()
              })
              .catch((err) => {
                console.err(err)
                reject(err)
              })
          },
          fail: (res) => {
            __sendLogin(commit, true)
              .then(() => {
                resolve()
              })
              .catch((err) => {
                console.err(err)
                reject(err)
              })
          }
        })
      })
    }
  },
  getUserinfo ({commit}, data) {
    return _sendmessage(commit, 'getUserinfo', data)
  },
  allowPermise ({commit}, data) {
    return _sendmessage(commit, 'allow', data)
  },
  sendSpeech ({commit}, {url, asr, nlu}) {
    return _sendmessage(commit, 'speech', {url, asr, nlu})
  },
  sendGenericRequest ({commit}, {type, data}) {
    return _sendmessage(commit, type, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
