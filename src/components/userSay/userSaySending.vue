<template>

<view class="weui-flex">
  <view class="weui-flex__item">
    <view class="outgoing right-item">
      <loading></loading>
    </view>
  </view>
  <view class="user-avatar" v-if="userAuthed">
    <open-data type="userAvatarUrl" />
  </view>
</view>
</template>

<script>
import { mapState } from 'vuex'
export default {

  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    })
  }
}
</script>

<style scoped>
.outgoing {
  width: 60rpx;
  float: right;
}
.user-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  overflow:hidden;  
  display: block;
}
</style>
