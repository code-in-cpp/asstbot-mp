<template>
<view class="video-wrapper">
  <view id="myvideo" style="postion:relative">
    <video :src="src">
    </video>
    <view class="video-mask" @click="$emit('videoEnded')">
    </view>
  </view>
</view>
</template>

<script>
export default {
  data () {
    return {
      videoContext: {}
    }
  },
  props: ['src'],
  onLoad () {
    this.videoContext = wx.createVideoContext('myVideo')
  }
}
</script>

<style>
  .video-wrapper {
    width: 100%;
    height: 100vh;
    position: fixed;
    text-align: center;
    z-index: 2;
  }

  .video-wrapper video {
    margin-top: 300rpx;
    z-index: 3000;
  }

  .video-wrapper .video-mask {
    position:absolute;
    background: rgba(90, 90, 90, 0.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2000;
  }
</style>