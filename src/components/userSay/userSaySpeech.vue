<template>
  <view class="wrapper word-text right-block">
    <view class="outgoing right-item">
      {{content.asr}}
    </view>
    <!-- <view class="outgoing right-item">
      <view>
        <block v-if="playStatus=='stop'">
          <i class="icon iconfont icon-play" @click="play"></i>
        </block>
        <block v-else-if="playStatus=='playing'">
          <i class="icon iconfont icon-play_fill" @click="pause"></i>
        </block>
        <block v-else>
          <i class="icon iconfont icon-suspend" @click="resume"></i>
        </block>
      </view>  
    </view> -->
  </view>
</template>

<script>
export default {
  data () {
    return {
      playStatus: 'stop',
      innerAudioContext: {}
    }
  },
  props: {
    content: {
      type: Object,
      default: {
      }
    }
  },
  methods: {
    play () {
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.src = this.content.url
      this.playStatus = 'playing'
      this.innerAudioContext.play()
      this.innerAudioContext.onEnded(() => {
        this.playStatus = 'stop'
      })
    },

    pause () {
      this.innerAudioContext.pause()
      this.playStatus = 'paused'
    },

    resume () {
      this.innerAudioContext.play()
      this.playStatus = 'playing'
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row-reverse;
}
.word-text{
  padding-bottom: 10px;
}

.right-block{
  display: flex;
  flex-direction: row-reverse;
}
.right-item{
  max-width: 70%;
}
</style>
