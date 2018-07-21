<template>
  <view class="title-bg-color title-bar">
    <device-top-padding></device-top-padding>
    <view>
      <da-logo ></da-logo>     
    </view>
  </view>
</template>

<script>
import deviceTopPadding from '@/components/view/deviceTopPadding'
export default {
  components: {
    deviceTopPadding
  }
}
</script>

<style scoped>

.title-bar {
  text-align: center;
  padding-bottom: 40rpx;
}

</style>