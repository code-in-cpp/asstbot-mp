<template>
<block>
  <block v-if="needPadding">
    <view style="height: 68rpx;">
    </view>
  </block>
</block>
</template>

<script>
export default {
  data () {
    return {
      needPadding: false
    }
  },

  onLoad () {
    wx.getSystemInfo({
      success: (res) => {
        if (res.model.search('iPhone X') !== -1) {
          this.needPadding = true
        } else {
          this.needPadding = false
        }
      }
    })
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
