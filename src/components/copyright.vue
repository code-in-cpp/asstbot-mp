<template>
  <view v-if="shouldShow" class="footer-style">
    <text class="title-style"> 小哒智能科技（上海）有限公司</text>
    <text class="desc-style"> Copyright @ 2018 xiaoda.ai</text>
  </view>
</template>

<script>
  export default {
    props: {
      shouldShow: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../static/base.less";
  .footer-style {
    /*display: inline-block;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    position:fixed;
    left:0;right:0;bottom:0;
    /*background-color: transparent;*/
    width: 750rpx;
    z-index: @copyright-z-index;
    padding: 0 0;
    margin-bottom: 20rpx;
  }
  .title-style {
    display: block;
    font-size: @font-size-tiny;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    color: @p-light-color;
    align-content: center;
    text-align: center;
  }
  .desc-style {
    padding-top: 10rpx;
    display: block;
    justify-content: center;
    align-items: center;
    font-size: 22rpx;
    color: @p-light-color;
    align-content: center;
    text-align: center;
  }
</style>
