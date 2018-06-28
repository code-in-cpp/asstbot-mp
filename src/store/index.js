import Vue from 'vue'
import Vuex from 'vuex'
import phone from './modules/phone'
import bodProfile from './modules/bodProfile'
import userProfile from './modules/userProfile'
import messages from './modules/messages'
import image from './modules/image'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    phone,
    bodProfile,
    userProfile,
    messages,
    image
  },
  strict: debug
})
