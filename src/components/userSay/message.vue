<template>
  <block v-if="needDisplay">
    <view class="weui-flex">
      <view class="weui-flex__item">
        <user-say-text :content="messages.data.query" v-if="messages.type=='text'"></user-say-text>
        <user-say-image :url="messages.data.url" v-else-if="messages.type=='image'"></user-say-image>
        <user-say-allow :content="messages.data.query" v-else-if="messages.type=='allow'"></user-say-allow>
        <user-say-speech :content="messages.data" v-else-if="messages.type=='speech'"></user-say-speech>
        <user-say-checkbox-reply :content="messages.data" v-else-if="messages.type==='checkbox-reply'"></user-say-checkbox-reply>
        <user-say-radio-reply :content="messages.data" v-else-if="messages.type=='radio-reply'"></user-say-radio-reply>
        <user-say-divider :data="messages" v-else-if="messages.type=='divider'"></user-say-divider>
      </view>
      <view class="user-avatar" v-if="userAuthed">
        <open-data type="userAvatarUrl" />
      </view>
    </view>
  </block>
</template>

<script>
import userSayText from '@/components/userSay/text'
import userSayImage from '@/components/userSay/image'
import userSayAllow from '@/components/userSay/allow'
import userSaySpeech from '@/components/userSay/speech'
import userSayCheckboxReply from '@/components/userSay/checkboxReply'
import userSayRadioReply from '@/components/userSay/radioReply'
import { mapState } from 'vuex'

export default {
  props: {
    messages: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    }),
    needDisplay () {
      if (!this.messages) {
        return false
      }

      return this.messages.type === 'text' ||
        this.messages.type === 'image' ||
        this.messages.type === 'allow' ||
        this.messages.type === 'speech' ||
        this.messages.type === 'checkbox-reply' ||
        this.messages.type === 'radio-reply' ||
        this.messages.type === 'divider'
    }
  },
  components: {
    userSayText,
    userSayImage,
    userSayAllow,
    userSaySpeech,
    userSayCheckboxReply,
    userSayRadioReply
  }
}
</script>

<style>
.user-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  overflow:hidden;  
  display: block;
}
</style>
