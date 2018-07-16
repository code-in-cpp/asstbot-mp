<template>
  <view parentBox>
    <view class="_label" :style="'top: '+top_rpx+'rpx; left: '+left_rpx+'rpx;'">{{title}}</view>
  </view>

</template>

<script>
  export default {
    props: {
      top_rpx: {
        type: Number,
        default: 0
      },
      left_rpx: {
        type: Number,
        default: 100
      },
      title: {
        type: String,
        default: '100'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  ._label {
    position: absolute;
    font-size: @font-size-tiny;
    background: #666666;
    color: #ffffff;
    border-radius: 10rpx;
    padding-top: 0rpx;
    padding-left: 4rpx;
    padding-right: 4rpx;
  }
  .parentBox {
    /*position: relative;*/
  }
</style>
