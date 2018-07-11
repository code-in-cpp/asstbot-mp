import wechat from './wechat'
import config from '@/config.js'

var url = `${config.service.hostRoot}/chatbot/survey`

const state = {
  data: [
  ]
}
/*
* messageAction 获取messagelist的最后一条数据
* typeStatus 获取最后一条数据的类型
* activeAction 获取最后一条数据的类型radio和imageUploader（后续可能有扩展）返回true，否则返回false
* messageAction 可以解决上诉所有问题
* */
const getters = {
  activeAction: state => {
    let list = state.data[state.data.length - 1]
    if (list && list.to && list.msgs && list.msgs.length > 0) {
      let len = list.msgs.length - 1
      let type = list.msgs[len].type
      if (type === 'radio' || type === 'imageUploader' || type === 'checkbox') {
        return true
      }
    }
    return false
  },
  textOrRadioAction: state => {
    let list = state.data[state.data.length - 1]
    if (list && list.to && list.msgs && list.msgs.length > 0) {
      let len = list.msgs.length - 1
      let type = list.msgs[len].type
      if (type === 'imageUploader' || type === 'checkbox' || (type === 'radio' && list.msgs[len].items && list.msgs[len].items.length > 10)) {
        return true
      }
    }
    return false
  },
  typeStatus: state => {
    let list = [...state.data].slice(-1).pop()
    if (list && list.to) {
      let type = [...list.msgs].slice(-1).pop()
      return type.type
    } else {
      return list ? list.type ? list.type : 'text' : 'text'
    }
  },
  messageAction: state => {
    let list = [...state.data].slice(-1).pop()
    if (list && list.to) {
      return [...list.msgs].slice(-1).pop()
    } else {
      let objType = Object.prototype.toString.call(list).slice(8, -1)
      switch (objType) {
        case 'Array' :
          return {
            title: '',
            type: 'text',
            items: '',
            ...[...list].slice(-1).pop()
          }
        case 'Object':
          return {
            title: '',
            type: 'text',
            items: '',
            ...list
          }
        default:
          return {
            title: '',
            type: 'text',
            items: ''
          }
      }
    }
  }
}

const mutations = {
  appendMessage (state, message) {
    const timestamp = new Date()
    state.data.push({timestamp, ...message})
  },
  talkToBotFather (state) {
    url = `${config.service.hostRoot}/chatbot`
  },
  talkToSurveyBot (state) {
    url = `${config.service.hostRoot}/chatbot/survey`
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
  console.log(message)
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
  start ({commit}, id) {
    return _sendmessage(commit, 'start', {id})
  },
  getUserinfo ({commit}, data) {
    return _sendmessage(commit, 'getUserinfo', data)
  },
  allowPermise ({commit}, data) {
    return _sendmessage(commit, 'allow', data)
  },
  sendSpeech ({commit}, {url, asr, nlu}) {
    return _sendmessage(commit, 'speech', {url, asr, nlu})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
