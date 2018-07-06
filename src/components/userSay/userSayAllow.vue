<template>
  <view class="wrapper word-text right-block">
    <view class="outgoing right-item">
      {{content}}
    </view>
  </view>
</template>

<script>
  export default {
    props: ['content'],
    created () {
      console.log(this)
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row-reverse;
  }
  .word-text{
    padding-bottom: 10px;
  }
  .outgoing {
    padding:20rpx;
    border:solid #81d4f4 1rpx;
    border-radius:30rpx 30rpx 0 30rpx;
    background-color:#b3e5fc;
    font-size:28rpx;
    margin-right:10rpx;
    text-align:left;
  }
  .right-block{
    display: flex;
    flex-direction: row-reverse;
  }
  .right-item{
    max-width: 70%;
  }
</style>
