<template>
  <view class="posterBox">
    <image class="poster" :src="poster"></image>
    <view class="triAngle"></view>
  </view>
</template>

<script>
  export default {
    props: ['poster']
  }
</script>

<style scoped>
  .posterBox{
    position: relative;
  }
  .poster{
    max-width: 100%;
    background: #000;
    width: 100%;
  }
  .triAngle{
    position: absolute;
    left:0;
    top: 0;
    right: 0;
    bottom:0;
    margin: auto auto;
    border-top: 20rpx solid transparent;
    border-bottom: 20rpx solid transparent;
    border-left: 40rpx solid #fff;
    width: 0;
    height: 0;
  }
</style>
