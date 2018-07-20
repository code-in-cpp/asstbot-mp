<template>
  <movable-view class="move-btn" inertia='true' damping='10' friction='5' x="10" y="500"  animation="true" direction="all" @click="toHome">
    <image class="image" :src="imageUrl"></image>
  </movable-view>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '../../static/image/avatar.png'
    }
  },
  props: ['text'],
  methods: {
    toHome () {
      wx.reLaunch({
        url: '../index/main'
      })
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
  .move-btn{
    width: 100rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50%;
    color: #fff;
    z-index: 10000;
    box-shadow:0 0 20rpx #25CEC2;
    overflow: hidden;
    background: #fff;
    border: 1rpx solid #25cec2;
    position: fixed!important;
  }
  .image{
    width: 100%;
    height: 100%;
  }
</style>
