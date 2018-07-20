<template>
<view>
  <!--ugly code, need to refact to support other open-type-->
  <button class="btn-item" open-type="share" v-if="isShare === true">
    <i class="icon iconfont btn-icon" :class="icon"></i>
    <view class="btn-title"> {{title}} </view>
  </button>
  <button class="btn-item" v-if="isShare === false">
    <i class="icon iconfont btn-icon" :class="icon"></i>
    <view class="btn-title"> {{title}} </view>
  </button>
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
    },
    opentype: {
      type: String,
      default: ''
    }
  },
  computed: {
    isShare () {
      console.log('iconButton:' + this.opentype)
      if (this.opentype === undefined || this.opentype === null || this.opentype.length === 0) {
        return false
      }
      return true
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
    color: @s-color;
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
    background-color: #F2F2F2;
  }
  /*去按钮边框*/
  .btn-item::after{
    border: none;
  }
</style>
