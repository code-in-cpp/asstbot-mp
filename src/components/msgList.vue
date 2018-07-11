<template>
  <block>
    <block v-if="outgoing">
        <user-say-text :content="messages.data.query" v-if="messages.type=='text'"></user-say-text>
        <user-say-image :url="messages.data.url" v-else-if="messages.type=='image'"></user-say-image>
        <user-say-allow :content="messages.data.query" v-else-if="messages.type=='allow'"></user-say-allow>
        <user-say-speech :content="messages.data" v-else-if="messages.type=='speech'"></user-say-speech>
    </block>
    <block v-else>
      <block v-for="(msg, i) in msgs" :key="msg" v-if="msg.type=='text' || msg.type=='getUserinfo' || msg.type == 'dialog-end' ">
        <view class="weui-flex word-text left-block">
          <view class="left-item">
            <view style="padding: 3px 10px;width: 40rpx">
              <!--<image :src="bodAvatar" class="small-avatar" v-if="i==0"/>-->
              <bod-avatar :url="survey.avatarUrl" size="30"  v-if="i==0"/>
            </view>
            <view class="botSayContainer">
              <bot-say-user-auth :content="msg.reply" v-if="msg.type=='getUserinfo'"></bot-say-user-auth>
              <bot-say-new :content="msg.reply" v-else-if="msg.type=='dialog-end'"></bot-say-new>
              <!--<bot-say-radio-select :content="msg.title" v-else-if="msg.type=='radio'" :options="msg.items"></bot-say-radio-select>-->
              <bot-say-text :content="msg.reply" v-else></bot-say-text>
            </view>
          </view>
        </view>
      </block>
    </block>
  </block>
</template>

<script>
import userSayText from '@/components/userSay/userSayText'
import userSayImage from '@/components/userSay/userSayImage'
import userSayAllow from '@/components/userSay/userSayAllow'
import userSaySpeech from '@/components/userSay/userSaySpeech'
import botSayText from '@/components/botSay/botSayText'
import botSayUserAuth from '@/components/botSay/botSayUserAuth'
import botSayNew from '@/components/botSay/botSayNew'
import botAvatar from '@/components/bodAvatar'
import botSayRadioSelect from '@/components/botSay/botSayRadioSelect'

import { mapState } from 'vuex'

export default {
  data () {
    // console.log(this.messages)
    return {
      msgs: this.messages.to ? this.messages.msgs.filter((msg) => msg.type !== 'checkbox') : undefined,
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
    },
    survey: {
      type: Object,
      default: {}
    }
  },

  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    })
  },

  components: {
    userSayText,
    userSayImage,
    userSayAllow,
    userSaySpeech,
    botSayText,
    botSayUserAuth,
    botSayNew,
    botAvatar,
    botSayRadioSelect
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

  .word-text{
    padding-bottom: 10px;
  }
  .left-block{
    display: flex;
  }
  .left-item{
    max-width: 80%;
    display: flex;
    width:100%;
  }
  .botSayContainer{
    width:100%
  }
</style>
