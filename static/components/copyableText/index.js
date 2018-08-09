// static/components/botSay/text/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      Value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    copyText () {
      wx.setClipboardData({
        data: this.properties.text,
        success: () => {
          wx.showToast({
            title: '内容已复制'
          })
        }
      })
    }
  }
})
