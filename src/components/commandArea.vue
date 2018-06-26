<template>
  <form report-submit="true" @submit="sendMessage">
    <view class="weui-flex">
      <view class="placeholder">
        <button v-if="!userAuthed" open-type="getUserInfo" @getuserinfo="updateUserInfo">用户</button>
      </view>
      <view class="weui-flex__item">
        <i-input type="textarea" placeholder="请输入消息" />
      </view>
      <view class="placeholder">
        <button class="input-widget" size="small" formType="submit">发送</button>
      </view>
    </view>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['text'],
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    })
  },
  methods: {
    updateUserInfo (ev) {
      this.$store.dispatch('updateUserInfo')
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}

.input-widget {
  margin: 0!important;
  height: 100%;
  max-height: 80rpx;
  color:#fff!important;
  background:#2d8cf0!important
}
</style>
