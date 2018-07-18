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
/*
* messageAction 获取messagelist的最后一条数据
* typeStatus 获取最后一条数据的类型
* activeAction 获取最后一条数据的类型radio和imageUploader（后续可能有扩展）返回true，否则返回false
* messageAction 可以解决上诉所有问题
* */

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
    if (chatBot === 'bodFather') {
      state.surveybotMsg = []
    }
    chatBot = 'surveyBot'
    url = `${config.service.hostRoot}/chatbot/survey`
    surveyId = id
    sceneMode = scene
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
        reject(err)
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
      _sendmessage(commit, 'dialog-start', {surveyId, scene: sceneMode})
    } else {
      _sendmessage(commit, 'login', {code: ''})
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
