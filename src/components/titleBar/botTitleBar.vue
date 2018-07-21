<template>
  <view style="position: relative">
    <view class="title-bg-color">
      <device-top-padding></device-top-padding>
    </view>
    <image src="../../static/image/bot-title-bar.png" class="background"></image>
    <view class="logo">
      <da-logo />
      <!-- <return-button v-else/> -->
    </view>
    <!-- <view class="title primary-color dark">{{title}}</view> -->
    <view class="avatar-wrapper">
      <view class="avatar">
        <bod-avatar :url="avatarUrl" size="50"></bod-avatar>
      </view>
    </view>
  </view>
</template>

<script>
import returnButton from '@/components/widget/returnButton'
import deviceTopPadding from '@/components/view/deviceTopPadding'
export default {
  props: {
    avatarUrl: {
      type: String,
      default: '../../static/image/avatar.png'
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayUrl () {
      return this.avatarUrl || this.avatarUrl !== null ? this.avatarUrl : '../../static/image/avatar.png'
    }
  },
  components: {
    returnButton,
    deviceTopPadding
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/base.less";
.logo {
  position: absolute;
  left: 20rpx;
  bottom: 20rpx;
  width: 195rpx;
  height: 84rpx;
}

.background {
  display: block;
  font-size: 0;
  height: 146rpx;
  width: 750rpx;
}

.avatar-wrapper {
  position: absolute;
  width: 112rpx;
  height: 112rpx;
  right: 81rpx;
  bottom: -78rpx;
  background-color: @background-color;
  border-radius: 50%;
  padding: 12rpx;
  z-index: 500;

}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: solid #25CEC2 6rpx;

  
}

.title {
  width: 400rpx;
  left: 130rpx;
  bottom: 80rpx;
  position:absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  flex: 1;
  text-align: center;
}

</style>