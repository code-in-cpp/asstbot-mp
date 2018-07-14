<template>
<view>
  <i class="icon iconfont" :class="icon"></i>
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
    font-size: @font-size-small;
    color: white
  }
</style>
