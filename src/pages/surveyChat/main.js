import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'disableScroll': true,
    'usingComponents': {
      'bot-avatar': '/static/components/botAvatar/index',
      'divider': '/static/components/divider/index',
      'bot-say-message': '/static/components/botSay/message/index',
      'user-say-message': '/static/components/userSay/message/index'
    }
  }
}
