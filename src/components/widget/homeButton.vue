<template>
  <!--<div>-->
    <!--<p class="card">-->
      <!--{{text}}-->
    <!--</p>-->
  <!--</div>-->
  <movable-view class="move-btn" inertia='true' damping='10' friction='5' x="10" y="15" direction="all" @click="toHome">
    btn
  </movable-view>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    toHome () {
      console.log(global.getApp().globalData.appOptions.path)
      wx.navigateTo({
        url: 'pages/index/main.js'
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
    width: 150rpx;
    height: 150rpx;
    text-align: center;
    line-height: 150rpx;
    border-radius: 50%;
    background: red;
    color: #fff;
    z-index: 10000;
    box-shadow:0 0 20rpx #5f0306;
  }
</style>
