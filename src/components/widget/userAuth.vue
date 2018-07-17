<template>
  <block></block>
</template>

<script>
export default {
  onLoad (option) {
    wx.getSetting({
      success: (response) => {
        console.log(response.authSetting['scope.userInfo'])
        if (!response.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/login/main'
          })
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