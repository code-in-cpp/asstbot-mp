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
        console.log(res)
        let model = res.model
        if (model.search('iPhone') !== -1) {
          if (res.model.search('iPhone X') !== -1) {
            this.paddingTop = 96
          } else {
            this.paddingTop = 48
          }
        } else {
          this.paddingTop = 60
        }
      }
    })
  }
}
</script>

<style>
</style>