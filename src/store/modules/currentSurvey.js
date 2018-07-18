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
    if (range[0] > range[1]) return false
    if (range[0] < 0 || range[0] >= max) return false
    if (range[1] < 0 || range[1] >= max) return false
    for (let i = range[0]; i <= range[1]; i++) {
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
    for (let i = range[0]; i <= range[1]; i++) {
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
      return { min: i, max: j - 1 }
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
  updateSurveyAvatarUrl (state, avatarUrl) {
    state.survey.avatarUrl = avatarUrl
  },
  updateSurveyTitle (state, title) {
    state.survey.title = title
  },
  updateSurveyIntro (state, intro) {
    state.survey.intro = intro
  },
  updateCurrentSurvey (state, survey) {
    state.survey = JSON.parse(JSON.stringify(survey))
  },
  updateConclusionMinScore (state, {index, value}) {
    state.survey.conclusions[index].scoreRange.min = value
  },
  updateConclusionMaxScore (state, {index, value}) {
    state.survey.conclusions[index].scoreRange.max = value
  },
  updateConclusionText (state, {index, text}) {
    console.log('update conlusion text', index, text)
    state.survey.conclusions[index].text = text
  },
  updateConclusionimage (state, {index, imageUrl}) {
    state.survey.conclusions[index].imageUrl = imageUrl
  },
  deleteConclusionImage (state, {index}) {
    state.survey.conclusions[index].imageUrl = ''
  },
  addConclusion (state) {
    let subjectCount = state.survey.subjects.length
    let range = getFreeRange(subjectCount, state.survey.conclusions.map((c) => { return [c.scoreRange.min, c.scoreRange.max] }))
    state.survey.conclusions.push({ scoreRange: {min: range.min, max: range.max}, text: '', imageUrl: '' })
  },

  initConclusion (state) {
    console.log('init conclusion for pull', state.survey.conclusions)
    let conclusions = state.survey.conclusions
    if (conclusions.length === 0) {
      conclusions.push({ text: '', imageUrl: '' })
    }
  },

  removeConclusion (state, index) {
    state.survey.conclusions.splice(index, 1)
  },
  addSubject (state) {
    state.survey.subjects.push({
      id: state.survey.subjects.length + 1,
      type: 'radio',
      question: '',
      imageUrl: '',
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
    if (type === 'date') {
      state.survey.subjects[index].nlu = true
    } else {
      state.survey.subjects[index].nlu = false
    }
  },
  updateSubjectQuestion (state, {index, question}) {
    state.survey.subjects[index].question = question
  },
  updateSubjectQuestionImage (state, {index, imageUrl}) {
    state.survey.subjects[index].imageUrl = imageUrl
  },
  deleteSubjectQuestionImage (state, {index}) {
    state.survey.subjects[index].imageUrl = ''
  },
  addAnswer (state, subjectIndex) {
    let subject = state.survey.subjects[subjectIndex]
    let defaultValue = ''
    let defaultCorrect = true
    if (subject.type === 'date') {
      defaultValue = '2018-07-12'
    }
    if (subject.type === 'location') {
      defaultValue = '陕西-西安'
    }
    if (subject.type === 'radio' || subject.type === 'checkbox') {
      defaultCorrect = false
    }
    state.survey.subjects[subjectIndex].answers.push({value: defaultValue, correct: defaultCorrect, imageUrl: ''})
  },
  removeAnswer (state, {subject, answer}) {
    state.survey.subjects[subject].answers.splice(answer, 1)
  },
  updateAnswerValue (state, {subject, answer, value}) {
    console.log(state)
    state.survey.subjects[subject].answers[answer].value = value
  },
  updateAnswerImagePath (state, {subject, answer, value}) {
    state.survey.subjects[subject].answers[answer].imageUrl = value
    console.log(state.survey)
  },
  updateAnswerCorrect (state, {subject, answer, value}) {
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
