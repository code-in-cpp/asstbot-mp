import wechat from './wechat'
import config from '@/config.js'
import Fly from 'flyio/dist/npm/wx'
import validator from '@/validator/survey.js'

var fly = new Fly()
const url = `${config.service.hostRoot}/survey`

const state = {
  editingSurvey: {},
  surveyList: []
}

const getters = {
  getSurvey: (state) => (id) => {
    return state.surveyList.find(survey => survey.id === id)
  }
}

const mutations = {
  editSurvey (state, surveyId) {
    var survey = state.surveyList.filter((sv) => {
      return sv.surveyId === surveyId
    })
    state.editingSurvey = survey !== [] ? survey[0] : {}
  },

  updateSurveyList (state, surveyList) {
    state.surveyList = surveyList
  }
}

const actions = {
  createSurvey ({dispatch, commit}, survey) {
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((userId) => {
          fly.post(url, {survey: {userId, ...survey}})
            .then((response) => {
              dispatch('retrieveSurvey')
                .then(() => {
                  resolve(response.data.id)
                })
            }).fail((err) => {
              reject(err)
            })
        })
    })
  },

  editSurvey ({dispatch, commit}, survey) {
    return new Promise((resolve, reject) => {
      let valid = validator.validSurvey(survey)
      if (valid.result !== 'ok') {
        let title
        if (!valid.result.subjectQuestion) {
          title = '题目: 文字和图片至少要填一个'
        } else if (!valid.result.subjectType) {
          title = '题目: 类型不对或单选多选题没有答案'
        } else if (!valid.result.subjectAnswer) {
          title = '答案: 文字和图片至少要填一个'
        } else {
          title = '评语: 文字和图片至少要填一个'
        }
        wx.showToast({
          title,
          icon: 'none',
          duration: 2000
        })
        reject(valid)
        return
      }
      wechat.getOpenId()
        .then((userId) => {
          if (survey.hasOwnProperty('__v')) {
            delete survey.__v
          }
          console.log(survey)
          fly.put(url, {userId, survey})
            .then((response) => {
              dispatch('retrieveSurvey')
                .then(() => {
                  resolve(response)
                })
            }).fail((err) => {
              reject(err)
            })
        })
    })
  },

  retrieveSurvey ({commit}) {
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((userId) => {
          fly.get(url, {userId})
            .then((response) => {
              commit('updateSurveyList', response.data.result)
              resolve()
            })
            .fail((err) => {
              reject(err)
            })
        })
    })
  },

  deleteSurvey ({dispatch, commit}, id) {
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((userId) => {
          fly.delete(`${url}?id=${id}`)
            .then((response) => {
              dispatch('retrieveSurvey').then(() => {
                resolve()
              })
            })
            .fail((err) => {
              reject(err)
            })
        })
    })
  },

  retrieveSurveyById ({commit}, id) {
    return new Promise((resolve, reject) => {
      fly.get(url, {id})
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data.result)
          } else {
            reject(response)
          }
        })
        .catch((err) => {
          reject(err)
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
