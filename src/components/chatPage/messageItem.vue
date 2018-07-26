<template>
<block>
    <block v-if="outgoing">
      <user-say-message :messages="messages"></user-say-message>
    </block>
    <block v-else-if="messages.gui!=undefined">
      <gui-divider :message="messages"></gui-divider>
    </block>
    <block v-else>
      <block v-for="(msg, i) in displayIncomingMsgs" :key="msg" v-if="!lastBotMsg || i < received">
        <view class="weui-flex bot-message">
          <view class="left-item">
            <view class="avatar-wrapper">
              <!--<image :src="bodAvatar" class="small-avatar" v-if="i==0"/>-->
              <bod-avatar :url="survey.avatarUrl" size="30"  v-if="i==0"/>
            </view>
            <view class="content">
              <bot-say-message :msg="msg" @loadDone="$emit('itemLoad')"/>
            </view>
          </view>
        </view>
      </block>
      <block v-if="lastBotMsg && received < displayIncomingMsgs.length">
        <bot-msg-receiving/>
      </block>
    </block>
</block>
</template>

<script>
import userSayMessage from '@/components/userSay/userSayMessage'
import botSayMessage from '@/components/botSay/botSayMessage'
import botMsgReceiving from '@/components/botSay/botMsgReceiving'
import guiDivider from '@/components/mpSay/divider'

export default {
  data () {
    // console.log(this.messages)
    return {
      outgoing: this.messages.from !== undefined,
      received: 0
    }
  },

  props: {
    messages: {
      type: Object,
      default: {}
    },
    lastBotMsg: {
      type: Boolean,
      default: true
    },
    survey: {
      type: Object,
      default: {}
    }
  },

  computed: {
    displayIncomingMsgs () {
      console.log(this.messages)
      return this.outgoing || !this.messages || !this.messages.msgs ? [] : this.messages.msgs.filter((msg) => {
        return msg.type === 'text' ||
          msg.type === 'getUserinfo' ||
          msg.type === 'dialog-end' ||
          msg.type === 'image'
      })
    }
  },

  components: {
    userSayMessage,
    botSayMessage,
    botMsgReceiving,
    guiDivider
  },

  onLoad () {
    console.log('onload')
    if (this.lastBotMsg) {
      let that = this
      let interval = setInterval(() => {
        that.received++
        if (that.received >= that.displayIncomingMsgs.length || !that.lastBotMsg) {
          console.log(that.displayIncomingMsgs)
          that.$emit('renderComplete')
          clearInterval(interval)
        }
      }, 1000)
    }
  },
  created () {
  }
}
</script>

<style>
.card {
  padding: 10px;
}
.message-wrapper{
  margin-bottom: 10px;
}

.bot-message {
  padding-bottom: 10px;
  display: flex;

}

.bot-message .avatar-wrapper {
  padding: 3px 10px;
  width: 40rpx
}

.bot-message .left-item{
    max-width: 80%;
    display: flex;
    width:100%;
  }
.bot-message .content{
    width:100%
  }
</style>
