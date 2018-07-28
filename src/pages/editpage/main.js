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
      'wxc-button': '../../../static/minui/packages/wxc-button/dist/index',
      'wxc-tab': '../../../static/minui/packages/wxc-tab/dist/index',
      'wxc-tab-panel': '../../../static/minui/packages/wxc-tab/dist/panel',
      'wxc-tab-label': '../../../static/minui/packages/wxc-tab/dist/label',
      'wxc-elip': '../../../static/minui/packages/wxc-elip/dist/index'
    },
    'enablePullDownRefresh': false,
    'disableScroll': true
  }
}
