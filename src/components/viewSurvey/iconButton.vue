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
    color:  @p-color;
    font-weight: normal;
    font-size: @font-size-tiny;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*height: 120rpx;*/
    /*line-height:120rpx;*/
    text-align: center;
    margin-top: 10rpx;
  }
  .btn-icon {
    font-size: @font-size-big;
    border-radius: 50%;
    background-color: white;
    /*border: 2rpx solid;*/
    /*border-color: @btn-border-color;*/
    color: @s-dark-color;
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
