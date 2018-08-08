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
      'bot-avatar': '../../../static/components/botAvatar/index',
      'divider': '../../../static/components/divider/index',
      'bot-say-text': '../../../static/components/botSay/text/index',
      'user-say-radio-reply': '../../../static/components/userSay/radioReply/index',
      'user-say-text': '../../../static/components/userSay/text/index'
    }
  }
}
