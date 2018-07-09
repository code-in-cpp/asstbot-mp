import Vue from 'vue'
import App from './App'
import store from './store'
import 'weui-wxss/dist/style/weui.wxss'
import '@/../static/font/iconfont.wxss'
import bodAvatar from '@/components/bodAvatar'
import pageTitle from '@/components/pageTitle'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

Vue.component('bod-avatar', bodAvatar)
Vue.component('page-title', pageTitle)

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/home/main', 'pages/display/main', 'pages/detail/main', 'pages/surveySubjects/main', 'pages/chart/main', 'pages/publish/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '2C2D31',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: false
    }
  }
}
