const state = {
  survey: {}
}

const getters = {
}

const mutations = {
  updateCurrentSurvey (state, survey) {
    state.survey = survey
  },
  updateConclusionMinScore (state, {index, value}) {
    state.survey.conclusions[index].scoreRange.min = value
  },
  updateConclusionMaxScore (state, {index, value}) {
    state.survey.conclusions[index].scoreRange.max = value
  },
  updateConclusionText (state, {index, text}) {
    state.survey.conclusions[index].text = text
  },
  addConclusion (state) {
    state.survey.conclusions.push({ scoreRange: {min: 0, max: 0}, text: '' })
  },
  removeConclusion (state, index) {
    state.survey.conclusions.splice(index, 1)
  },
  addSubject (state) {
    state.survey.subjects.push({type: 'radio', question: '', answers: []})
  },
  removeSubject (state, index) {
    state.survey.subjects.splice(index, 1)
  },
  updateSubjectType (state, {index, type}) {
    state.survey.subjects[index].type = type
  },
  updateSubjectQuestion (state, {index, question}) {
    state.survey.subjects[index].question = question
  },
  addAnswer (state, subjectIndex) {
    state.survey.subjects[subjectIndex].answers.push({value: '', correct: false})
  },
  removeAnswer (state, {subject, answer}) {
    state.survey.subjects[subject].answers.splice(answer, 1)
  },
  updateAnswerValue (state, {subject, answer, value}) {
    state.survey.subjects[subject].answers[answer].value = value
  },
  updateAnswerCorrect (state, {subject, answer, value}) {
    console.log({subject, answer, value})
    state.survey.subjects[subject].answers[answer].correct = value
  }
}

const actions = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
