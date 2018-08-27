// static/components/botSay/audio/index.js
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
    current: {
      poster: '',
      name: '',
      author: '',
      src: ''
    },
    audioAction: {
      method: 'pause'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    audioPlayed: function (e) {
      console.log('audio is played')
    }
  }
})
