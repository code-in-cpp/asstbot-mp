<template>
  <view class="primary-color dark title-bar">
    <device-top-padding></device-top-padding>
    <view class="weui-flex">
      <view style="width: 174rpx;" >
        <return-button/>
      </view>
      <view class="title">
        {{title}}
      </view>
      <view style="width: 174rpx;">
      </view>      
    </view>
  </view>
</template>

<script>
import deviceTopPadding from '@/components/view/deviceTopPadding'
import returnButton from '@/components/widget/returnButton'
export default {

  props: {
    title: {
      type: String,
      default: '  '
    }
  },
  components: {
    deviceTopPadding,
    returnButton
  }
}
</script>

<style lang="less" scoped>
@import "~@/../static/base.less";
.title-bar {
  padding-bottom: 20rpx;
}

.title-bar .iconfont {
  font-size: @font-size-big ;
  font-weight: bold;
  display: block;
}

.title {
  min-height: 76rpx;
  flex: 1;
  text-align: center;
}


</style>