function __validAnswer (answer) {
  return answer.value !== '' || answer.imageUrl !== ''
}

function __validTrueAnswer (answer) {
  return __validAnswer(answer) && answer.correct
}

function __validConclusion (conclusion) {
  return conclusion.text !== '' || conclusion.imageUrl !== ''
}

class Validator {
  validSubjectQuestion (survey) {
    return survey.subjects.map(subject => subject.question !== '' || subject.imageUrl !== '')
  }
  __validSubjectType (survey, validAnswer) {
    return survey.subjects.map((subject) => {
      if (subject.type === 'radio') {
        return subject.answers.filter(validAnswer).length >= 1
      } else if (subject.type === 'checkbox') {
        return subject.answers.filter(validAnswer).length >= 2
      } else {
        return true
      }
    })
  }

  validSubjectAnswer (survey) {
    return survey.subjects.map((subject) => {
      let answers = subject.answers.map(__validAnswer)
      return answers
    })
  }

  validConclusion (survey) {
    return survey.conclusions.map(__validConclusion)
  }
}

class ExamValidator extends Validator {
  constructor () {
    super()
    this.subjectTypeValidator = {
      'radio': (answers) => {
        return answers.filter(__validTrueAnswer).length === 1
      },
      'checkbox': (answers) => {
        return answers.filter(__validTrueAnswer).length > 1
      },
      'text': (answers) => {
        return answers.filter(__validAnswer).length >= 1
      },
      'date': (answers) => {
        return answers.filter(__validAnswer).length >= 1
      },
      'location': (answers) => {
        return answers.filter(__validAnswer).length >= 1
      }
    }
  }
  validSubjectType (survey) {
    return survey.subjects.map((subject) => this.subjectTypeValidator[subject.type](subject.answers))
  }
  valid (survey) {
    let subjectQuestion = super.validSubjectQuestion(survey)
    let subjectType = this.validSubjectType(survey)
    let subjectAnswer = super.validSubjectAnswer(survey)
    let conclusion = super.validConclusion(survey)
    return {subjectQuestion, subjectType, subjectAnswer, conclusion}
  }
}

class InqueryValidator extends Validator {
  validSubjectType (survey) {
    return super.__validSubjectType(survey, __validAnswer)
  }

  valid (survey) {
    let subjectQuestion = super.validSubjectQuestion(survey)
    let subjectType = this.validSubjectType(survey)
    let subjectAnswer = super.validSubjectAnswer(survey)
    let conclusion = super.validConclusion(survey)
    return {subjectQuestion, subjectType, subjectAnswer, conclusion}
  }
}

function __analysisResult (result) {
  let subjectQuestion = (result.subjectQuestion.filter(result => !result).length === 0)
  let subjectType = (result.subjectType.filter(result => !result).length === 0)
  let subjectAnswer = result.subjectAnswer.filter((answers) => {
    return answers.filter(answer => !answer).length !== 0
  }).length === 0
  let conclusion = (result.conclusion.filter(result => !result).length === 0)

  if (subjectQuestion && subjectType && subjectAnswer && conclusion) {
    return 'ok'
  } else {
    return {subjectQuestion, subjectType, subjectAnswer, conclusion}
  }
}

var validSurvey = function (survey) {
  let validator = survey.type === 'exam' ? new ExamValidator() : new InqueryValidator()
  let detail = validator.valid(survey)
  let result = __analysisResult(detail)
  return {result, detail}
}

export default {
  validSurvey
}
