import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '编辑机器人',
    'usingComponents': {
      'wxc-list': '../../../static/minui/packages/wxc-list/dist/index',
      'wxc-icon': '../../../static/minui/packages/wxc-icon/dist/index',
      'wxc-elip': '../../../static/minui/packages/wxc-elip/dist/index'
    },
    'enablePullDownRefresh': false,
    'disableScroll': true
  }
}
