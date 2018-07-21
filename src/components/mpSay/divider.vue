<template>
  <view class="weui-flex">
    <view class="weui-flex__item"></view>
    <view class="divider">
      <timestamp-item :time="message.timestamp"/>
    </view>
    <view class="weui-flex__item"></view>
  </view>
</template>

<script>
import timestampItem from '@/components/view/timestamp'

export default {
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  components: {
    timestampItem
  }
}
</script>

<style lang="less" scoped>
@import "~@/../static/base";

.divider {
  background: @divider-color;
  color: @background-color;
  font-size: @font-size-tiny - 4;
}
.weui-flex {
  margin-bottom: 20rpx;
}
</style>