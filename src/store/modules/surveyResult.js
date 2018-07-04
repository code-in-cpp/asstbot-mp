const surveyResultUrl = 'https://xiaodamp.cn/asstbot/survey/result'
const surveyUrl = 'https://xiaodamp.cn/asstbot/survey'
var date = new Date()

const state = {
  result: [],
  subjects: [],
  survey: {}
}

const getters = {
  surveySummary: state => {
    let ret = []
    for (let index in state.result) {
      let item = state.result[index]
      let nickName = (!item.responder.nickName || item.responder.nickName === '') ? '匿名' : item.responder.nickName
      let userAvatarUrl = (!item.responder.avatarUrl || item.responder.avatarUrl === '') ? '/static/image/avatar.png' : item.responder.avatarUrl
      if (userAvatarUrl.indexOf('localhost') > 0) {
        userAvatarUrl = '/static/image/nobody.png'
      }
      let summary = { id: item.id, name: nickName, score: '答对' + item.score + '题', avatarUrl: userAvatarUrl }
      ret.push(summary)
    }

    return ret
  },

  commitToday: state => {
    let currentTime = date.toLocaleDateString().replace('/', '-')
    let todayResult = state.result.filter(item => { return item.created_at.indexOf(currentTime) >= 0 })
    return todayResult.length
  },
  commitCount: state => {
    return state.result.length
  },
  reviewCount: state => {
    return state.result.length
  },

  emptySurveyAnswer: state => {
    let ret = []
    var defaultSummary = { id: '', name: '', score: '', avatarUrl: '' }
    if (state.result.length < 5) {
      for (var i = state.result.length; i < 5; i++) {
        ret.push(defaultSummary)
      }
    }
    return ret
  },

  getSurveyAnswer: state => (id) => {
    let answers = []
    for (let index in state.result) {
      let item = state.result[index]
      if (item.id === id) {
        answers = item.answers
        break
      }
    }
    let ret = []
    for (let index in answers) {
      let item = { id: index + 1, correct: true, value: '', question: state.survey.subjects[index].question }
      let answer = answers[index].result
      let spilterCh = ''
      for (let j in answer) {
        let element = answer[j]
        item.correct = element.correct && item.correct
        item.value = item.value + spilterCh + element.value
        spilterCh = '，'
      }
      ret.push(item)
    }
    console.log(ret)
    return ret
  },

  getCreateTime: state => (id) => {
    for (let index in state.result) {
      let item = state.result[index]
      if (item.id === id) {
        return item.created_at
      }
    }
    return date.toLocaleDateString().replace('/', '-')
  },

  getConclusion: state => (id) => {
    let score = ''
    for (let index in state.result) {
      let item = state.result[index]
      if (item.id === id) {
        score = item.score
        break
      }
    }
    let conclusions = state.survey.conclusions
    let ret = '没有找个合适的结论'
    for (let index in conclusions) {
      let conclusion = conclusions[index]
      if (score > conclusion.scoreRange.min && score <= conclusion.scoreRange.max) {
        ret = conclusion.text
      }
    }
    return ret
  }
}

const mutations = {
  updateResult (state, result) {
    state.result = result
  },
  updateSubjects (state, result) {
    state.subjects = result
  },
  updateSurveyInResult (state, survey) {
    state.survey = survey
  }
}

const actions = {
  querySurveyResult ({ commit }, surveyId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: surveyResultUrl,
        data: {
          surveyId: surveyId
        },
        success: (response) => {
          if (response.statusCode === 200) {
            console.log(response.data)
            commit('updateResult', response.data.result)
            resolve(response)
          } else {
            reject(response)
          }
        },
        faile: (err) => {
          reject(err)
        }
      })
    })
  },
  querySurveyById ({ commit }, surveyId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: surveyUrl,
        data: {
          id: surveyId
        },
        success: (response) => {
          if (response.statusCode === 200) {
            console.log(response.data.result.subjects)
            commit('updateSurveyInResult', response.data.result)
            resolve(response)
          } else {
            reject(response)
          }
        },
        faile: (err) => {
          reject(err)
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
