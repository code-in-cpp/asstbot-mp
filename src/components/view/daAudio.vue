<template>
  <view class="image-wrapper" v-if="url">
    <audio style="margin: 10rpx 0;" :src="url" :name="data.mediaInfo?data.mediaInfo.name:''" :author="data.mediaInfo?data.mediaInfo.author:''" :poster="data.mediaInfo?data.mediaInfo.poster:''" controls></audio>
  </view>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .image-wrapper{
    text-align: center;
    font-size: 0;
    position: relative;
  }
  .image{
    display: inline-block;
    width:100%;
  }
</style>
