// static/components/userSay/speech/index.js
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
    playStatus: 'stop',
    innerAudioContext: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play () {
      if (this.data.playStatus === 'stop') {
        this.data.innerAudioContext = wx.createInnerAudioContext()
        this.data.innerAudioContext.src = this.properties.content.url
        this.setData({
          playStatus: 'playing'
        })
        this.data.innerAudioContext.play()
        this.data.innerAudioContext.onEnded(() => {
          this.setData({
            playStatus: 'stop'
          })
        })
      }
    },

    pause () {
      this.data.innerAudioContext.pause()
      this.setData({
        playStatus: 'paused'
      })
    },

    resume () {
      this.data.innerAudioContext.play()
      this.setData({
        playStatus: 'playing'
      })
    }
  }
})
