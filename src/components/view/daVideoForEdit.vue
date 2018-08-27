<template>
  <view class="image-wrapper" v-if="url">
    <view class="videoBox" v-if="showVideo" @click="hideVideo">
      <video direction="90" autoplay="true" :src="url" controls></video>
    </view>
    <view v-if="!showVideo" class="posterBox" @click="previewVideo">
      <image class="poster" mode="widthFix" :src="poster"></image>
      <view class="triAngle"></view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        showVideo: false
      }
    },
    props: {
      url: {
        type: String,
        default: ''
      },
      poster: {
        type: String,
        default: ''
      }
    },
    methods: {
      previewVideo () {
        this.showVideo = true
      },
      hideVideo () {
        this.showVideo = false
      },
      deleteVideo () {
        this.$emit('deleteVideo')
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
  .videoBox{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    top: 0;
    left: 0;
    z-index: 501;
    display:flex;
    align-items:center;
    justify-content:center;

  }
  .image{
    display: inline-block;
    width:100%;
  }
  .posterBox{
    position: relative;
  }
  .poster{
    background: #000;
    width: 100%;
  }
  .triAngle{
    position: absolute;
    left:0;
    top: 0;
    right: 0;
    bottom:0;
    margin: auto auto;
    border-top: 20rpx solid transparent;
    border-bottom: 20rpx solid transparent;
    border-left: 40rpx solid #fff;
    width: 0;
    height: 0;
  }
</style>
