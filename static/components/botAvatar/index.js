// components/view/botAvatar/botAvatar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: '/static/image/avatar.png',
      observer: function (newVal) {
        if (newVal && newVal !== '') {
          this.setData({
            displayUrl: newVal
          })
        }
      }
    },
    size: {
      type: Number,
      value: 20
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayUrl: '/static/image/avatar.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})

