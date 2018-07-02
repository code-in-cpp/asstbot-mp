const surveyResultUrl = 'https://xiaodamp.cn/asstbot/survey/result'
const surveyUrl = 'https://xiaodamp.cn/asstbot/survey'

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
      let summary = { id: item.id, name: item.responder.nickName, score: '答对' + item.score + '题', avatarUrl: item.responder.avatarUrl }
      ret.push(summary)
    }

    var defaultSummary = { id: '', name: '', score: '', avatarUrl: '' }

    if (ret.length < 5) {
      for (var i = ret.length; i < 5; i++) {
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
      for (let j in answer) {
        let element = answer[j]
        item.correct = element.correct && item.correct
        item.value = item.value + element.value
      }
      ret.push(item)
    }
    console.log(ret)
    return ret
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
    console.log('comming here ')
    console.log(state.survey)
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
  updateSurvey (state, survey) {
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
            console.log(response.data.result)
            commit('updateSurvey', response.data.result)
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
