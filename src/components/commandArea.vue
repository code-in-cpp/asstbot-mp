<template>
  <form report-submit="true" @submit="sendMessage">
    <view class="weui-flex">
      <view class="placeholder">
        <button class="height-line-height" v-if="!userAuthed" open-type="getUserInfo" @getuserinfo="updateUserInfo">用户</button>
      </view>
      <view class="weui-flex__item">
        <i-input class="height-line-height" type="textarea" :value="currentMessage" @change="valueChange" placeholder="请输入消息" />
      </view>
      <view class="placeholder">
        <button class="input-widget height-line-height" size="small" formType="submit">发送</button>
      </view>
    </view>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currentMessage: ''
    }
  },

  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    })
  },
  methods: {
    updateUserInfo (ev) {
      this.$store.dispatch('updateUserInfo')
    },
    valueChange (ev) {
      this.currentMessage = ev.mp.detail.detail.value
    },
    sendMessage (ev) {
      this.$store.dispatch('sendQuery', this.currentMessage)
      this.currentMessage = ''
    }
  }
}
</script>

<style>
.input-widget {
  margin: 0!important;
  height: 100%;
  max-height: 80rpx;
  color:#fff!important;
  background:#2d8cf0!important
}
  .height-line-height{
    height: 80rpx;
    line-height: 80rpx;
    box-sizing: border-box;
  }
</style>
