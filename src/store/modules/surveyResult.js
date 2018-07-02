const surveyResultUrl = 'https://xiaodamp.cn/asstbot/survey/result'
const surveyUrl = 'https://xiaodamp.cn/asstbot/survey'

const state = {
  result: [],
  subjects: []
}

const getters = {
  surveySummary: state => {
    let ret = []
    for (let index in state.result) {
      let item = state.result[index]
      let summary = { id: item.id, name: item.responder.nickName, score: item.score }
      ret.push(summary)
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
      let item = {id: index + 1, correct: true, value: '', question: state.subjects[index].question}
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
  }
}

const mutations = {
  updateResult (state, result) {
    state.result = result
  },
  updateSubjects (state, result) {
    state.subjects = result
  }
}

const actions = {
  querySurveyResult ({commit}, surveyId) {
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
            resolve('')
          }
        },
        faile: (err) => {
          reject(err)
        }
      })
    })
  },
  querySurveyById ({commit}, surveyId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: surveyUrl,
        data: {
          id: surveyId
        },
        success: (response) => {
          if (response.statusCode === 200) {
            console.log(response.data.result.subjects)
            commit('updateSubjects', response.data.result.subjects)
            resolve(response)
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
}

export default {
  state,
  getters,
  actions,
  mutations
}
