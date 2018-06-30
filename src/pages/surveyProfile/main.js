import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '创建机器人',
    'usingComponents': {
      'i-icon': '../../../static/iview/icon/index'
    }
  }
}
