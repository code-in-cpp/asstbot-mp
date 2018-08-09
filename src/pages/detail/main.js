import Vue from 'vue'
import App from './detail'
import 'weui-wxss/dist/style/weui.wxss'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'disableScroll': true,
    'usingComponents': {
      'bot-say-text': '/static/components/botSay/text/index',
      'bot-say-image': '/static/components/botSay/image/index',
      'user-say-text': '/static/components/userSay/text/index',
      'user-say-image': '/static/components/userSay/image/index'
    }
  }

}
