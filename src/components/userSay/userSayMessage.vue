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
import userSayText from '@/components/userSay/userSayText'
import userSayImage from '@/components/userSay/userSayImage'
import userSayAllow from '@/components/userSay/userSayAllow'
import userSaySpeech from '@/components/userSay/userSaySpeech'
import userSayCheckboxReply from '@/components/userSay/userSayCheckboxReply'
import userSayRadioReply from '@/components/userSay/userSayRadioReply'
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
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  overflow:hidden;  
  display: block;
}
</style>
