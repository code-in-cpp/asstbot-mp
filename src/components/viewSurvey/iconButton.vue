<template>
<view>
  <!--ugly code, need to refact to support other open-type-->
  <button class="btn-item" open-type="share" v-if="isShare">
    <i class="icon iconfont btn-icon" :class="icon"></i>
    <view class="btn-title"> {{title}} </view>
  </button>
  <button class="btn-item" v-else>
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
    text-align: center;
    margin-top: 0rpx;
    margin-bottom: 0rpx;
  }
  .btn-icon {
    font-size: 54rpx;
    border-radius: 50%;
    background-color: white;
    /*border: 2rpx solid;*/
    /*border-color: @btn-border-color;*/
    color: @s-color;
    align-content: center;
    text-align: center;
    line-height: 100rpx;
    height: 100rpx;
    width: 100rpx;
    display: inline-block;
    margin-top: 0rpx;
    margin-bottom: 0rpx;
  }
  .btn-item {
    align-content: center;
    text-align: center;
    margin-top: 0rpx;
    margin-bottom: 0rpx;
    background-color: transparent;
  }
  /*去按钮边框*/
  .btn-item::after{
    border: none;
  }
</style>
