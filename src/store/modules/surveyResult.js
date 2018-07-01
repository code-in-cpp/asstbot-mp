const surveyUrl = 'https://xiaodamp.cn/asstbot/survey/result'

const state = {
  result: []
}

const getters = {
  surveySummary: state => {
    let ret = []
    for (let index in state.result) {
      let item = state.result[index][0]
      console.log(item)
      let summary = { name: item.responder, score: item.score }
      console.log(summary)
      ret.push(summary)
    }
    return ret
  }
}

const mutations = {
  updateResult (state, result) {
    state.result = result
  }
}

const actions = {
  querySurveyResult ({commit}, surveyId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: surveyUrl,
        data: {
          surveyId: surveyId
        },
        success: (response) => {
          if (response.statusCode === 200) {
            console.log(response.data)
            commit('updateResult', response.data)
            resolve(response.data)
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
