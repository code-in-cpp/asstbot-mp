import Vue from 'vue'
import Vuex from 'vuex'
import phone from './modules/phone'
import bodProfile from './modules/bodProfile'
import userProfile from './modules/userProfile'
import messages from './modules/messages'
import image from './modules/image'
import survey from './modules/survey'
import currentSurvey from './modules/currentSurvey'
import surveyResult from './modules/surveyResult'
import id from './modules/id'
import iphonex from './modules/iphonex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    phone,
    bodProfile,
    userProfile,
    messages,
    image,
    survey,
    currentSurvey,
    surveyResult,
    id,
    iphonex
  },
  strict: debug
})
