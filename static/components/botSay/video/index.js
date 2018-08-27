// static/components/botSay/video/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showVideoFlag: false,
    defaultImageUrl: 'http://img2.imgtn.bdimg.com/it/u=2917177549,2896213205&fm=27&gp=0.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playVideo (event) {
      this.triggerEvent('videoPlay', 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400')
    },
    showVideo () {
      this.setData({
        showVideoFlag: true
      })
    },
    hideVideo () {
      this.setData({
        showVideoFlag: false
      })
    },
    clickVideo (e) {
      e.stoppropagation()
    }
  }
})
