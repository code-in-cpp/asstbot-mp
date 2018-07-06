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
    padding: 10px;
    border: solid #2b85e4 1px;
    border-radius: 15px 15px 0 15px;
    background-color: #519cf7;
    font-size: 28rpx;
    margin-right: 5px;
  }
  .right-block{
    display: flex;
    flex-direction: row-reverse;
  }
  .right-item{
    max-width: 70%;
  }
</style>
