import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'disableScroll': true,
    'usingComponents': {
      'loading': '/static/components/loading/index',
      'message-item': '/static/components/messageItem/index',
      'bot-say-receiving': '/static/components/botSay/receiving/index'
    }
  }
}
