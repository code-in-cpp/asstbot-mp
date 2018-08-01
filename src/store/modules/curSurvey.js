import wechat from './wechat'
import config from '@/config.js'
import Fly from 'flyio/dist/npm/wx'

var fly = new Fly()
const url = `${config.service.hostRoot}/survey`

const state = {
  survey: {}
}

const getters = {

}

const mutations = {
  handleQuizNextByDelete (state, index) {
    state.survey.subjects.forEach(subject => {
      subject.answers.forEach(answer => {
        if (answer.next === (index + 1)) {
          answer.next = 0
        } else if (answer.next > (index + 1)) {
          answer.next = answer.next - 1
        }
      })
    })
  },

  deleteCurSurveySubject (state, subject) {
    state.survey.subjects.splice(subject, 1)
    if (state.survey.type === 'quiz') {
      this.commit('handleQuizNextByDelete', subject)
    }
  },

  moveUpCurSurveySubject (state, subject) {
    if (subject > 0) {
      let array = state.survey.subjects.splice(subject, 1)
      state.survey.subjects.splice(subject - 1, 0, ...array)
    }
  },

  moveDownCurSurveySubject (state, subject) {
    if (subject < state.survey.subjects.length - 1) {
      let array = state.survey.subjects.splice(subject, 1)
      state.survey.subjects.splice(subject + 1, 0, ...array)
    }
  },

  changeCurSurveyAvatar (state, avatar) {
    state.survey.avatarUrl = avatar
  },

  deleteCurConclusion (state, conclusion) {
    state.survey.conclusions.splice(conclusion, 1)
    if (state.survey.type === 'quiz') {
      this.commit('handleQuizNextByDelete', state.survey.subjects.length + conclusion)
    }
  },

  appendCurConclusion (state, conclusion) {
    state.survey.conclusions.push(conclusion)
  },

  updateCurConcusion (state, {index, conclusion}) {
    state.survey.conclusions.splice(index, 1)
    state.survey.conclusions.splice(index, 0, conclusion)
  },

  appendCurSubject (state, subject) {
    state.survey.subjects.push({id: state.survey.subjects.length + 1, ...subject})
    if (state.survey.type === 'quiz') {
      let length = state.survey.subjects.length
      state.survey.subjects.forEach(subject => {
        subject.answers.forEach(answer => {
          if (answer.next >= length) {
            answer.next = answer.next + 1
          }
        })
      })
    }
  },

  updateCurSubject (state, {index, subject}) {
    state.survey.subjects.splice(index, 1)
    state.survey.subjects.splice(index, 0, subject)
  },

  updateCurSurvey (state, survey) {
    state.survey = survey
  }
}

const actions = {
  saveCurSurvey ({dispatch, commit}, survey) {
    return new Promise((resolve, reject) => {
      wechat.getOpenId()
        .then((userId) => {
          if (survey.hasOwnProperty('__v')) {
            delete survey.__v
          }
          fly.put(url, {userId, survey})
            .then((response) => {
              resolve(response)
            }).fail((err) => {
              reject(err)
            })
        })
    })
  },

  retrieveCurSurvey ({commit}, id) {
    return new Promise((resolve, reject) => {
      fly.get(url, {id})
        .then((response) => {
          if (response.status === 200) {
            resolve()
            commit('updateCurSurvey', response.data.result)
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
