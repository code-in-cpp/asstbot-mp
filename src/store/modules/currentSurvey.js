function getInitArray (max, value) {
  let arr = new Array(max)
  for (let i = 0; i < max; i++) {
    arr[i] = value
  }
  return arr
}

function verifyRanges (max, ranges) {
  if (!ranges || ranges.length === 0) return true
  if (max <= 0) return false
  let arr = getInitArray(max, false)
  for (let range of ranges) {
    if (range[0] >= range[1]) return false
    if (range[0] < 0 || range[0] >= max) return false
    if (range[1] < 1 || range[1] > max) return false
    for (let i = range[0]; i < range[1]; i++) {
      if (arr[i]) return false
      arr[i] = true
    }
  }
  return true
}

function getFreeRange (maxCount, occupiedRanges) {
  if (!verifyRanges(maxCount, occupiedRanges)) return { min: 0, max: 0 }
  let arr = getInitArray(maxCount, false)
  for (let range of occupiedRanges) {
    for (let i = range[0]; i < range[1]; i++) {
      arr[i] = true
    }
  }
  for (let i = 0; i < maxCount; i++) {
    if (!arr[i]) {
      let j = i + 1
      while (j < maxCount) {
        if (arr[j]) {
          break
        }
        j++
      }
      return { min: i, max: j }
    }
  }

  return { min: 0, max: 0 }
}

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
    let subjectCount = state.survey.subjects.length
    let range = getFreeRange(subjectCount, state.survey.conclusions.map((c) => { return [c.scoreRange.min, c.scoreRange.max] }))
    state.survey.conclusions.push({ scoreRange: {min: range.min, max: range.max}, text: '' })
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
    state.survey.subjects[index].type = type
  },
  updateSubjectQuestion (state, {index, question}) {
    console.log({index, question})
    console.log(state.survey.subjects[index])
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
