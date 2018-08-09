<template>
  <block v-if="needDisplay">
    <view class="weui-flex">
      <view class="weui-flex__item">
        <user-say-text :content="messages.data.query" v-if="messages.type=='text'"></user-say-text>
        <user-say-image :url="messages.data.url" v-else-if="messages.type=='image'"></user-say-image>
        <user-say-speech :content="messages.data" v-else-if="messages.type=='speech'"></user-say-speech>
        <user-say-checkbox-reply :content="messages.data" v-else-if="messages.type==='checkbox-reply'"></user-say-checkbox-reply>
        <user-say-radio-reply :content="messages.data"  @previewImage="$store.commit('setPreviewFalse')" v-else-if="messages.type=='radio-reply'" ></user-say-radio-reply>
      </view>
      <view class="user-avatar" v-if="userAuthed">
        <open-data type="userAvatarUrl" />
      </view>
    </view>
  </block>
</template>

<script>
import userSayImage from '@/components/userSay/image'
import userSayCheckboxReply from '@/components/userSay/checkboxReply'
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
        this.messages.type === 'speech' ||
        this.messages.type === 'checkbox-reply' ||
        this.messages.type === 'radio-reply' ||
        this.messages.type === 'divider'
    }
  },
  components: {
    userSayImage,
    userSayCheckboxReply
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
