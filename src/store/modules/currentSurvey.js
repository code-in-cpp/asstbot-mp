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
    state.survey.subjects.push({
      id: state.survey.subjects.length + 1,
      type: 'radio',
      question: '',
      answers: []})
  },
  removeSubject (state, index) {
    state.survey.subjects.splice(index, 1)
  },
  clearSurvey (state) {
    state.survey.subjects = []
    state.survey.conclusions = []
  },
  updateSubjectType (state, {index, type}) {
    var oldType = state.survey.subjects[index].type
    if (type === 'radio' && oldType !== 'radio') {
      var findFirstRadio = false
      var answers = state.survey.subjects[index].answers
      answers = answers.map((answer) => {
        if (answer.correct && !findFirstRadio) {
          findFirstRadio = true
        } else {
          answer.correct = false
        }
        return answer
      })
      state.survey.subjects[index].answers = answers
    }
    state.survey.subjects[index].type = type
  },
  updateSubjectQuestion (state, {index, question}) {
    console.log({index, question})
    console.log(state.survey.subjects[index])
    state.survey.subjects[index].question = question
  },
  addAnswer (state, subjectIndex) {
    console.log(subjectIndex)
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
