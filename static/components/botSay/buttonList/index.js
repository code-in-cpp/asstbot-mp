// static/components/botSay/buttonList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click (event) {
      let item = event.currentTarget.dataset.item
      this.triggerEvent('buttonListEvent',
        { buttonList: this.properties.message,
          item
        })
      console.log(this.properties.message)
      if (this.properties.message.once) {
        this.setData({ show: false })
      }
      console.log(this.data)
    }
  }
})
