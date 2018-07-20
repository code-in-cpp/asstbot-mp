<template>
  <scroll-view scroll-y='true' :scroll-into-view="scrollToView" style="height: 100%">  
    <view class="padding-top-64" :class="{'height-110':!showImage,'height-444':showImage}">
      <block v-for="(messages, i) in messagesList" :key="i">
        <view :id="i">
          <message-item :survey="survey" :lastBotMsg="i==(messagesList.length-1)&&messages.to!==undefined"
                    :messages="messages" @renderComplete="scollToBottom"/>
        </view>
        <view :id="'bottom'+i"></view>
      </block>
      <block v-if="waitingBotMessage">
        <bot-msg-receiving/>
      </block>
      <view id="bottom"></view>
    </view>
  </scroll-view>
</template>

<script>
import messageItem from '@/components/chatPage/messageItem'

export default {
  data () {
    return {
      scrollToView: 'bottom'
    }
  },
  props: {
    messagesList: {
      type: Array,
      default: []
    },
    showImage: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    messagesList: function (val) {
      const that = this
      if (this.showImage) {
        setTimeout(function () {
          that.scrollToView = `bottom${val.length - 1}`
        }, 500)
      } else {
        this.scrollToView = `bottom${val.length - 1}`
      }
    }
  },
  components: {
    messageItem
  },
  methods: {
    scollToBottom () {
      this.scrollToView = 'bottom'
      this.$emit('renderFinish')
      console.log('scroll to end')
    }
  }
}
</script>

<style>
.padding-top-64{
  padding-top: 64rpx;
}

.height-110{
  box-sizing: border-box;
  padding-bottom: 110rpx;
}
.height-444{
  box-sizing: border-box;
  padding-bottom: 444rpx;
}
</style>