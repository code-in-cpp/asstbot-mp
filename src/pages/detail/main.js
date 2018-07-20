import Vue from 'vue'
import App from './detail'
import 'weui-wxss/dist/style/weui.wxss'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': false,
    'disableScroll': true
  }

}
