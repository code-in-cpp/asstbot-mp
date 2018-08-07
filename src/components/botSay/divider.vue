<template>
  <view class="weui-flex">
    <view class="weui-flex__item"></view>
    <view class="divider">
      <timestamp-item :time="timestamp"/>
    </view>
    <view class="weui-flex__item"></view>
  </view>
</template>
<script>
import timestampItem from '@/components/view/timestamp'
import util from '@/utils/index'

export default {
  data () {
    return {
      timestamp: ''
    }
  },
  // props: {
  //   message: {
  //     type: Object,
  //     default: {}
  //   }
  // },
  components: {
    timestampItem
  },

  onLoad () {
    this.timestamp = util.formatTime(new Date())
  }
}
</script>

<style lang="less" scoped>
@import "~@/../static/base";

.divider {
  background: @divider-color;
  color: @background-color;
  font-size: @font-size-tiny - 4;
  border-radius: 8rpx;
  padding-right: 8rpx;
  padding-left: 8rpx;
}
.weui-flex {
  margin-top: 50rpx;
  margin-bottom: 50rpx;
}
</style>
