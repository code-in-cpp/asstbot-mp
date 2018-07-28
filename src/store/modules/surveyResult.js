const surveyResultUrl = 'https://xiaodamp.cn/asstbot/survey/result'
const surveyUrl = 'https://xiaodamp.cn/asstbot/survey'
const surveyStatisticUrl = 'https://xiaodamp.cn/asstbot/survey/statistic'

const state = {
  result: [],
  subjects: [],
  curSurvey: {},
  chartConfigs: [],
  surveyResult: {}
}

function isToday (str) {
  var d = new Date(str)
  var todaysDate = new Date()
  if (d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
    return true
  } else {
    return false
  }
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
    let todayResult = state.result.filter(item => {
      return isToday(item.created_at)
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
    if (!state.surveyResult.answers || !state.surveyResult.survey) {
      return []
    }
    let answers = state.surveyResult.answers
    console.log('survey Result is ', state.surveyResult)
    let subjects = state.surveyResult.survey.subjects
    let ret = []
    for (let index in answers) {
      let questionId = answers[index].id
      if (questionId > subjects.length) {
        break
      }
      let subject = subjects[parseInt(questionId) - 1]
      let question = subject.question
      let questionUrl = (subject.imageUrl === '') ? null : subject.imageUrl
      let userSay = answers[index].user_say
      if (userSay) {
        ret.push({ id: index + 1, question, correct: answers[index].correct, userSay, questionUrl, needSwipper: false })
        continue
      }

      let hasImage = false
      let textValues = answers[index].result.map((item) => {
        hasImage = hasImage || item.imageUrl
        return item.value
      }).join(';')
      let needSwipper = hasImage && answers[index].result.length > 1

      if (!hasImage) {
        ret.push({ id: index + 1, question, correct: answers[index].correct, userSay: textValues, questionUrl, needSwipper: false })
        continue
      }
      if (needSwipper) {
        ret.push({ id: index + 1, question, results: answers[index].result, correct: answers[index].correct, userSay: null, questionUrl, needSwipper: needSwipper })
      } else {
        ret.push({ id: index + 1, question, results: answers[index].result, correct: answers[index].correct, userSay: null, questionUrl, needSwipper: needSwipper })
      }
    }
    console.log('user answer detail is ', ret)
    return ret
  },

  getResponderName: state => (id, type) => {
    if (!state.surveyResult.responder) {
      return '匿名'
    }
    let responder = state.surveyResult.responder
    return (!responder.nickName || responder.nickName === '') ? '匿名' : responder.nickName
  },

  getSurveyResultType: state => (id, type) => {
    if (!state.surveyResult.survey) {
      return 'exam'
    }
    return state.surveyResult.survey.type
  },

  getResponderAvator: state => (id, type) => {
    if (!state.surveyResult.responder) {
      return '/static/image/nobody3.png'
    }
    let responder = state.surveyResult.responder
    return (!responder.avatarUrl || responder.avatarUrl === '') ? '/static/image/nobody3.png' : responder.avatarUrl
  },

  getConclusion: state => (id, type) => {
    let surveyResult = state.surveyResult
    if (surveyResult == null || !surveyResult.survey) {
      return { text: '' }
    }
    let conclusions = surveyResult.survey.conclusions
    if (surveyResult.conclusion != null) {
      return conclusions[surveyResult.conclusion]
    }
    let score = surveyResult.score
    let ret = ''
    for (let index in conclusions) {
      let conclusion = conclusions[index]
      if (conclusion.scoreRange) {
        if (score >= conclusion.scoreRange.min && score <= conclusion.scoreRange.max) {
          ret = conclusion
        }
      }
    }
    return ret
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

  updateSurveyResult (state, result) {
    state.surveyResult = result
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
  querySurveyResultById ({ dispatch, commit }, resultId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: surveyResultUrl,
        data: {
          id: resultId
        },
        success: (response) => {
          console.log('receive user reply survey', response.data.result)
          commit('updateSurveyResult', response.data.result)
          resolve(response)
        },
        faile: (err) => {
          reject(err)
        }
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
