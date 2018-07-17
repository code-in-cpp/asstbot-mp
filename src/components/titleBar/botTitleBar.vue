<template>
  <view style="position: relative">
    <view class="primary-color dark">
      <device-padding></device-padding>
    </view>
    <image src="../../static/image/bot-title-bar.png" class="background"></image>
    <view class="logo">
      <da-logo v-if="title.length == 0"/>
      <return-button v-else/>
    </view>
    <view class="title primary-color dark">{{title}}</view>
    <image class="avatar" :src="displayUrl"></image>
  </view>
</template>

<script>
import returnButton from '@/components/widget/returnButton'
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
      return this.avatarUrl ? this.avatarUrl : '../../static/image/avatar.png'
    }
  },
  components: {
    returnButton
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
  height: 174rpx;
  width: 750rpx;
}

.avatar {
  position: absolute;
  width: 100rpx;
  height: 100rpx;
  right: 89rpx;
  bottom: -63rpx;
  border-radius: 50%;
  border: solid #25CEC2 4rpx;
  z-index: 9999;
}

.title {
  width: 400rpx;
  left: 130rpx;
  bottom: 80rpx;
  position:absolute;
}
.title {
  flex: 1;
  text-align: center;
}

</style>