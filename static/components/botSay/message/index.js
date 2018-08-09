// static/components/botSay/message/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg: {
      type: Object,
      value: {}
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
    loadDone () {
      this.triggerEvent('loadDone')
    },
    previewImage () {
      this.triggerEvent('previewImage')
    },
    buttonListEvent (event) {
      this.triggerEvent('buttonListEvent', event.detail)
    }
  }
})
