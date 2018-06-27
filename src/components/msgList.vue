<template>
  <block>
    <block v-if="outgoing">  
        <user-say :content="messages.data.query" v-if="messages.type=='text'"></user-say>
    </block>
    <block v-else>
      <block  v-for="(msg, i) in msgs" :key="msg" v-if="msg.type=='text'">
        
        <view class="weui-flex">
          <view style="padding: 3px 10px;width: 40rpx">
            <image :src="bodAvatar" class="small-avatar" v-if="i==msgs.length-1"/>
          </view>
          <view>
            <bot-say-text :content="msg.reply"></bot-say-text> 
          </view>
        </view>
      </block>
    </block>
  </block>
</template>

<script>
import userSay from '@/components/userSay'
import botSayText from '@/components/botSay/botSayText'
import { mapState } from 'vuex'

export default {
  data () {
    console.log('msglist')
    console.log(this.messages)
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
    userSay,
    botSayText
  },

  mounted () {
    console.log('mounted')
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
.small-avatar {
  width: 50rpx!important;
  height: 50rpx!important;
  border-radius: 50%;
}

</style>
