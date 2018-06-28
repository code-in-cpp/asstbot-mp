<template>
  <view class="wrapper">
    <image :src="url" class="outgoing">发送图片</image>
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

  .outgoing {
    height: 100px;
    width: 100px;
    border: solid 1px beige;
  }
</style>
