import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我创建的...',
    'usingComponents': {
      'slider-left': '../../../static/native/slider-left/index',
      'wux-row': '../../../static/wux/row/index',
      'wux-col': '../../../static/wux/col/index'
    },
    'enablePullDownRefresh': false,
    'disableScroll': true
  }
}
