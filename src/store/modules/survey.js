import wechat from './wechat'
import config from '@/config.js'
import Fly from 'flyio/dist/npm/wx'

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
      wechat.getOpenId()
        .then((userId) => {
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
