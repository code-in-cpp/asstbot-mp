import Vue from 'vue'
import App from './index'
const mpvueTrace = require('mpvue-lint/mpvue-trace')
mpvueTrace.trace(Vue)

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'disableScroll': true,
    'usingComponents': {
      'bot-avatar': '/static/components/botAvatar/index',
      'divider': '/static/components/divider/index',
      'bot-say-text': '/static/components/botSay/text/index',
      'bot-say-button-list': '/static/components/botSay/buttonList/index',
      'user-say-message': '/static/components/userSay/message/index'
    }
  }
}
