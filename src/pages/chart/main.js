import Vue from 'vue'
import App from './chart'
import 'weui-wxss/dist/style/weui.wxss'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    page: {
      'enablePullDownRefresh': false
    }
  }
}
