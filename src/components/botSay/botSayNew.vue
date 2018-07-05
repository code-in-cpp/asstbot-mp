<template>
  <view>
    <view>{{content}}</view>
    <view class="createNew"><navigator url="../home/main">赶快来创建自己的机器人吧</navigator></view>
  </view>
</template>

<script>
  export default {
    name: 'botSayNew',
    props: ['content']
  }
</script>

<style scoped>
.createNew{
  background:#2d8cf0;
  color:#fff;
  padding:0rpx 32rpx;
  border-radius:10rpx;
  font-size:28rpx;
  line-height:72rpx;
}
</style>
