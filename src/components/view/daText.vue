<template>
    <view class="textarea-box">
      <text class="textarea-text">{{content}}</text>
    </view>
</template>

<script>
  export default {
    props: [
      'content'
    ]
  }
</script>

<style scoped>
  .textarea-box{
    background: #fff;
    border-bottom: 1rpx solid #dadada;
  }
  .textarea-text{
    width:100%;
    line-height:64rpx;
    display:block;
    padding-left:30rpx;
    box-sizing:border-box;
  }
</style>
