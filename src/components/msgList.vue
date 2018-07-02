<template>
  <block>
    <block v-if="outgoing">
        <user-say-text :content="messages.data.query" v-if="messages.type=='text'"></user-say-text>
        <user-say-image :url="messages.data.url" v-else-if="messages.type=='image'"></user-say-image>
    </block>
    <block v-else>
      <block v-for="(msg, i) in msgs" :key="msg" v-if="msg.type=='text'">
        <view class="weui-flex word-text left-block">
          <view class="left-item">
            <view style="padding: 3px 10px;width: 40rpx">
              <image :src="bodAvatar" class="small-avatar" v-if="i==0"/>
            </view>
            <view>
              <bot-say-text :content="msg.reply"></bot-say-text>
            </view>
          </view>
        </view>
      </block>
    </block>
  </block>
</template>

<script>
import userSayText from '@/components/userSay/userSayText'
import botSayText from '@/components/botSay/botSayText'
import userSayImage from '@/components/userSay/userSayImage'

import { mapState } from 'vuex'

export default {
  data () {
    // console.log(this.messages)
    return {
      msgs: this.messages.to ? this.messages.msgs.filter((msg) => msg.type !== 'radio') : undefined,
      receivingMsgId: this.messages.to ? this.messages.msgs.length : undefined,
      outgoing: this.messages.from !== undefined
    }
  },

  props: {
    messages: {
      type: Object,
      default: {}
    },
    receiving: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    })
  },

  components: {
    userSayText,
    botSayText,
    userSayImage
  },

  mounted () {
    // console.log('mounted')
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

  .word-text{
    padding-bottom: 10px;
  }
  .left-block{
    display: flex;
  }
  .left-item{
    max-width: 80%;
    display: flex;
  }
</style>
