// static/components/userSay/message/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messages: {
      type: Object,
      value: {}
    },
    userAuthed: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    needDisplay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage () {
      this.triggerEvent('previewImage')
    }
  },

  attached () {
    let messages = this.properties.messages
    let needDisplay = messages.type === 'text' ||
      messages.type === 'image' ||
      messages.type === 'speech' ||
      messages.type === 'checkbox-reply' ||
      messages.type === 'radio-reply' ||
      messages.type === 'divider'

    this.setData({
      needDisplay
    })
  }
})
