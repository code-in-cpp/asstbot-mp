import Vue from 'vue'
import App from './App'
import store from './store'
import 'weui-wxss/dist/style/weui.wxss'
import '@/../static/font/iconfont.css'
import bodAvatar from '@/components/bodAvatar'
import pageTitle from '@/components/pageTitle'
import spinner from '@/components/view/spinner'
import recordStatus from '@/components/view/recordStatus'
import botTitleBar from '@/components/titleBar/botTitleBar'
import titleBar from '@/components/titleBar/titleBar'
import devicePadding from '@/components/view/devicePadding'
import homeButton from '@/components/widget/homeButton'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

Vue.component('bod-avatar', bodAvatar)
Vue.component('page-title', pageTitle)
Vue.component('spinner', spinner)
Vue.component('record-status', recordStatus)
Vue.component('bot-title-bar', botTitleBar)
Vue.component('title-bar', titleBar)
Vue.component('device-padding', devicePadding)
Vue.component('home-button', homeButton)

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2C2D31',
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom',
      enablePullDownRefresh: false
    }
  }
}
