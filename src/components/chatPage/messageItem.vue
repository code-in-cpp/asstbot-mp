<template>
<block>
    <block v-if="outgoing">
      <user-say-message :messages="messages" :userAuthed="userAuthed"></user-say-message>
    </block>
    <block v-else>
      <block v-for="(msg, i) in displayIncomingMsgs" :key="msg">
        <block v-if="msg.type=='divider'">
          <block v-if="!lastBotMsg || i < received">
            <divider ></divider>
          </block>
        </block>
        <view class="weui-flex bot-message" v-else>
          <view class="left-item">
            <view class="avatar-wrapper">
              <!--<image :src="bodAvatar" class="small-avatar" v-if="i==0"/>-->
              <bot-avatar :url="survey.avatarUrl" size="30"
                v-if="i==0 || (displayIncomingMsgs[i-1].type =='divider' && (i-1) < received )"/>
            </view>
            <view class="content">
              <bot-say-message :msg="msg" @loadDone="$emit('itemLoad')" v-if="!lastBotMsg || i < received"/>
              <view class="aaa" v-if="lastBotMsg && i == received">
                <bot-msg-receiving/>
              </view>
            </view>
          </view>
        </view>
      </block>
      <!--<block v-if="lastBotMsg && received < displayIncomingMsgs.length">-->
        <!--<bot-msg-receiving/>-->
      <!--</block>-->
    </block>
</block>
</template>

<script>
import botSayMessage from '@/components/botSay/message'
import botMsgReceiving from '@/components/botSay/msgReceiving'
import botSayDivider from '@/components/botSay/divider'
import { mapState } from 'vuex'

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
    ...mapState({
      userAuthed: state => state.userProfile.authed
    }),
    displayIncomingMsgs () {
      // console.log(this.messages)
      return this.outgoing || !this.messages || !this.messages.msgs ? [] : this.messages.msgs.filter((msg) => {
        return msg.type === 'text' ||
          msg.type === 'getUserinfo' ||
          msg.type === 'dialog-end' ||
          msg.type === 'image' ||
          msg.type === 'divider' ||
          msg.type === 'button-list'
      })
    }
  },

  components: {
    botSayMessage,
    botMsgReceiving,
    botSayDivider
  },

  onLoad () {
    if (this.lastBotMsg) {
      let that = this
      this.$emit('renderUpdate')
      let interval = setInterval(() => {
        that.received++
        if (that.received > that.displayIncomingMsgs.length || !that.lastBotMsg) {
          that.$emit('renderComplete')
          clearInterval(interval)
        } else {
          that.$emit('renderUpdate')
        }
      }, 600)
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
  .aaa{
    margin-left: -40rpx;
  }
</style>
