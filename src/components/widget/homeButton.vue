<template>
  <!--<div>-->
    <!--<p class="card">-->
      <!--{{text}}-->
    <!--</p>-->
  <!--</div>-->
  <movable-view class="move-btn" inertia='true' damping='10' friction='5' x="10" y="15" direction="all" @click="toHome">
    <image class="image" src="../../../static/image/avatar.png"></image>
  </movable-view>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    toHome () {
      // let url = ''
      // if (getCurrentPages().length) {
      //   let locationUrl = getCurrentPages().slice(-1)[0].route
      //   if (locationUrl.indexOf('pages/index') >= 0) {
      //     url = ''
      //   } else if (locationUrl.indexOf('pages/') >= 0) {
      //     url = '../index/main'
      //   }
      //   if (url) {
      //     wx.reLaunch({
      //       url: url
      //     })
      //   }
      // }
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
    box-shadow:0 0 20rpx #5f0306;
    overflow: hidden;
    background: #fff;
  }
  .image{
    width: 100%;
    height: 100%;
  }
</style>
