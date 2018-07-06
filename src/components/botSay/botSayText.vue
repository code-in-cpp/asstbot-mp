<template>
  <view class="incoming">
    {{content}}
  </view>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style scoped>
  .userinfo{
    font-size:24rpx;
    color:#999;
    margin-top:20rpx;
  }
</style>
