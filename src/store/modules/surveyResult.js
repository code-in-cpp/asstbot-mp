const surveyResultUrl = 'https://xiaodamp.cn/asstbot/survey/result'
const surveyUrl = 'https://xiaodamp.cn/asstbot/survey'
const surveyStatisticUrl = 'https://xiaodamp.cn/asstbot/survey/statistic'
var date = new Date()
import wechat from './wechat'

const state = {
  result: [],
  subjects: [],
  replySurveys: [],
  curSurvey: {},
  chartConfigs: []
}

const getters = {
  chartCreateConfigs: state => {
    return state.chartConfigs
  },

  surveySummary: state => {
    let ret = []
    for (let index in state.result) {
      let item = state.result[index]
      let nickName = (!item.responder.nickName || item.responder.nickName === '') ? '匿名' : item.responder.nickName
      let userAvatarUrl = (!item.responder.avatarUrl || item.responder.avatarUrl === '') ? '/static/image/nobody3.png' : item.responder.avatarUrl
      if (userAvatarUrl.indexOf('localhost') > 0) {
        userAvatarUrl = '/static/image/avatar.png'
      }
      let summary = { id: item.id, name: nickName, score: item.score, avatarUrl: userAvatarUrl }
      ret.push(summary)
    }

    return ret
  },

  commitToday: state => {
    let currentTime = date.toLocaleDateString().replace(new RegExp('/', 'gm'), '-')
    console.log('current time:' + currentTime)
    let todayResult = state.result.filter(item => {
      return item.created_at.indexOf(currentTime) >= 0
    })
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
      if (state.curSurvey.subjects.length <= index) {
        break
      }
      let item = { id: index + 1, correct: true, value: '', question: state.curSurvey.subjects[index].question }
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
    return ret
  },

  getResponderName: state => (id) => {
    let responder = {}
    for (let index in state.result) {
      let item = state.result[index]
      if (item.id === id) {
        responder = item.responder
      }
    }
    return (!responder.nickName || responder.nickName === '') ? '匿名' : responder.nickName
  },

  getResponderAvator: state => (id) => {
    let responder = {}
    for (let index in state.result) {
      let item = state.result[index]
      if (item.id === id) {
        responder = item.responder
      }
    }
    return (!responder.avatarUrl || responder.avatarUrl === '') ? '/static/image/nobody3.png' : responder.avatarUrl
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
    let conclusions = state.curSurvey.conclusions
    let ret = '没有找个合适的结论'
    for (let index in conclusions) {
      let conclusion = conclusions[index]
      if (score > conclusion.scoreRange.min && score <= conclusion.scoreRange.max) {
        ret = conclusion.text
      }
    }
    return ret
  },
  getReplySurveys: state => {
    return state.replySurveys
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
    state.curSurvey = survey
  },
  resetReplySurveys (state) {
    state.replySurveys = []
  },
  addReplySurveys (state, survey) {
    state.replySurveys.push(survey)
  },
  updateChartConfigs (state, charts) {
    state.chartConfigs = charts
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
            commit('updateSurveyInResult', response.data.result)
            resolve(response.data.result)
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
  querySurveyResultByUser ({dispatch, commit}) {
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((userId) => {
          wx.request({
            url: surveyResultUrl,
            data: {
              userId: userId
            },
            success: (response) => {
              commit('updateResult', response.data.result)
              commit('resetReplySurveys')
              response.data.result.map(item => {
                let surveyId = item.surveyId
                dispatch('querySurveyById', surveyId)
                  .then(survey => {
                    survey.resultId = item.id
                    survey.score = item.score
                    commit('addReplySurveys', survey)
                  })
              })
              resolve(response)
            },
            faile: (err) => {
              reject(err)
            }
          })
        })
    })
  },

  queryAnswerStatics ({commit}, surveyId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: surveyStatisticUrl,
        data: {
          surveyId: surveyId
        },
        success: (response) => {
          if (response.statusCode === 200) {
            console.log(response.data.result)
            let subjects = response.data.result.subjects
            let configs = subjects.map(subject => {
              let chartId = 'column_' + subject.id
              // let datas = subject.answers.map(answer => { return { name: answer.value, data: [answer.count] } })
              let datas2 = subject.answers.map(answer => { return answer.count })
              let categs = subject.answers.map(answer => { return answer.value })
              let config = {
                canvasId: chartId,
                type: 'column',
                categories: categs,
                series: [{ name: '', data: datas2 }],
                yAxis: {
                  format: function (val) {
                    return val
                  }
                },
                xAxis: {
                  fontColor: '#000000'
                },
                legend: false,
                width: 640,
                height: 400,
                extra: {
                  column: { width: 50 }
                }
              }
              return config
            })
            console.log('comming here .............')
            console.log(configs)
            commit('updateChartConfigs', configs)
            resolve(configs)
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
