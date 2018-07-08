import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '图标',
    'usingComponents': {
      // 'i-icon': '../../../static/iview/icon/index'
    }
  }
}
