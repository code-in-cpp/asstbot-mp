<template>
<view class="btn-item">
  <i class="icon iconfont btn-icon" :class="icon"></i>
  <view class="btn-title"> {{title}} </view>
</view>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
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
  .btn-title {
    color: black;
    font-weight: normal;
    font-size: @font-size-middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: @p-color;
    /*height: 120rpx;*/
    /*line-height:120rpx;*/
    text-align: center;
  }
  .btn-icon {
    font-size: @font-size-big;
    border-radius: 50%;
    background-color: white;
    border: 2rpx solid;
    border-color: @btn-border-color;
    color: @p-color;
    align-content: center;
    text-align: center;
    line-height: 80rpx;
    height: 80rpx;
    width: 80rpx;
    display: inline-block;
  }
  .btn-item {
    align-content: center;
    text-align: center;
    margin-top: 20rpx;
    background-color: @background-color;
  }
</style>
