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

  getSurveyAnswer: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    let answers = []
    let subjects = []
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        answers = item.answers
        subjects = item.survey.subjects
        break
      }
    }
    let ret = []
    for (let index in answers) {
      let item = { id: index + 1, correct: true, value: '', question: subjects[index].question }
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
    console.log('rest ', ret)
    return ret
  },

  getResponderName: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    let responder = {}
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        responder = item.responder
      }
    }
    return (!responder.nickName || responder.nickName === '') ? '匿名' : responder.nickName
  },

  getSurveyResultTitle: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    let title = ''
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        title = item.survey.title
      }
    }
    return title
  },

  getSurveyResultType: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    let surveyType = 'exam'
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        surveyType = item.survey.type
      }
    }
    return surveyType
  },

  getResponderAvator: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    let responder = {}
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        responder = item.responder
      }
    }
    return (!responder.avatarUrl || responder.avatarUrl === '') ? '/static/image/nobody3.png' : responder.avatarUrl
  },

  getCreateTime: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        return item.created_at
      }
    }
    return date.toLocaleDateString().replace('/', '-')
  },

  getConclusion: state => (id, type) => {
    let queryResults = (type === 'ask') ? state.result : state.replySurveys
    let score = ''
    let conclusions = ''
    for (let index in queryResults) {
      let item = queryResults[index]
      if (item.id === id) {
        score = item.score
        conclusions = item.survey.conclusions
        break
      }
    }
    let ret = ''
    for (let index in conclusions) {
      let conclusion = conclusions[index]
      if (conclusion.scoreRange) {
        if (score > conclusion.scoreRange.min && score <= conclusion.scoreRange.max) {
          ret = conclusion.text
        }
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

  updateCurSurvey (state, survey) {
    state.curSurvey = survey
  },

  updateChartConfigs (state, charts) {
    state.chartConfigs = charts
  },

  updateReplySurveys (state, result) {
    state.replySurveys = result
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
            console.log('user survey result', response.data.result)
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
            console.log(response)
            commit('updateCurSurvey', response.data.result)
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
              console.log('receive user reply survey', response.data.result)
              commit('updateReplySurveys', response.data.result)
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
            let subjects = response.data.result.subjects
            let configs = subjects.map((subject, i) => {
              let chartId = 'column_' + (i + 1)
              let datas2 = subject.answers.map(answer => { return answer.count }).slice(0, 5)
              let categs = subject.answers.map(answer => { return answer.value }).slice(0, 5)
              if (categs.length === 0) {
                console.log('has no valid answer')
                categs = ['没有回复']
                datas2 = [0]
              }
              let maxHight = 4
              datas2.forEach(element => {
                maxHight = Math.max(maxHight, element)
              })
              console.log('maxhight is', maxHight)
              let config = {
                canvasId: chartId,
                type: 'column',
                categories: categs,
                series: [{ name: '', data: datas2 }],
                yAxis: {
                  format: function (val) {
                    return val
                  },
                  min: -1,
                  max: maxHight
                },
                xAxis: {
                  fontColor: '#000000'
                },
                legend: false,
                width: 320,
                height: 200,
                extra: {
                  column: { width: 50 }
                }
              }
              return config
            })
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
