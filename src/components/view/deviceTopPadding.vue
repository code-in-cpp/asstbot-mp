<template>
  <block>
    <view :style="'height: '+paddingTop+'rpx'">
    </view>
  </block>
</template>

<script>
export default {
  data () {
    return {
      paddingTop: false
    }
  },

  onLoad () {
    wx.getSystemInfo({
      success: (res) => {
        this.paddingTop = res.statusBarHeight * 2
      }
    })
  }
}
</script>

<style>
</style>