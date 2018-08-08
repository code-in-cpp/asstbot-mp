// static/components/userSay/radioReply/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Object,
      value: {},
      observer: function (val) {
        // console.log(val)
      }
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
      let url = this.properties.content.imageUrl
      wx.previewImage({
        current: url,
        urls: [url]
      })
    }
  }
})
