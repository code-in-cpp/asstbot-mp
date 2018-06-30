import Vue from 'vue'
import App from './detail'
import 'weui-wxss/dist/style/weui.wxss'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'usingComponents': {
      'i-button': '../../../static/iview/button/index',
      'i-input': '../../../static/iview/input/index',
      'i-avatar': '../../../static/iview/avatar/index',
      'i-row': '../../../static/iview/row/index',
      'i-col': '../../../static/iview/col/index'
    },
    page: {
      'enablePullDownRefresh': false
    }
  }

}
