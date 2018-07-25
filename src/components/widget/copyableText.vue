<template>
  <view @longpress="copyText">
    {{text}}
  </view>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    copyText () {
      wx.setClipboardData({
        data: this.text,
        success: () => {
          wx.showToast({
            title: '内容已复制'
          })
        }
      })
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>