<template>
  <view class="wrapper word-text">
    <image v-if="url" :src="url" class="outgoing"/>
    <view  v-if="!url" class="outgoing right-item" style="height: auto;width: auto;margin-right: -10rpx">
      您已取消上传
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
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
  padding-right: 10px;
}
  .outgoing {
    height: 100px;
    width: 100px;
    border: solid 1px beige;
  }
</style>
