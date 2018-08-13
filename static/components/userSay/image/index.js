// static/components/userSay/image/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: ''
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
    previewImage () {
      this.triggerEvent('previewImage')
      let url = this.properties.url
      wx.previewImage({
        current: url,
        urls: [url]
      })
    }
  }
})
