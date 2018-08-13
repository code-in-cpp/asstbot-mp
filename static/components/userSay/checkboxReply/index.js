// static/components/userSay/checkboxReply/index.js
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
    displayText: '',
    imgUrls: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage (event) {
      this.triggerEvent('previewImage')
      let url = event.currentTarget.dataset.item
      let urls = this.data.imgUrls
      wx.previewImage({
        current: url,
        urls: urls
      })
    }
  },

  attached () {
    let val = this.data.content
    if (!val.items) {
      return
    }

    let texts = val.items.filter((item) => item.caption && item.caption.length > 0)
      .map((item) => {
        return item.caption
      })

    let displayText = texts.join(',')
    let imgUrls = val.items.filter((item) => item.imageUrl).map((item) => {
      if (item.imageUrl) {
        return item.imageUrl
      }
    })
    this.setData({
      displayText,
      imgUrls
    })
  }
})
