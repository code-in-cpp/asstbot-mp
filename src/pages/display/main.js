import Vue from 'vue'
import App from './display'
import 'weui-wxss/dist/style/weui.wxss'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'usingComponents': {
      // 'i-icon': '../../../static/iview/icon/index',
      'i-button': '../../../static/iview/button/index',
      'i-input': '../../../static/iview/input/index',
      'i-avatar': '../../../static/iview/avatar/index',
      'i-row': '../../../static/iview/row/index',
      'i-col': '../../../static/iview/col/index'
      // 'zan-icon': '../../../static/zanui/icon/index'
    },
    page: {
      'enablePullDownRefresh': false
    }
  }
}
