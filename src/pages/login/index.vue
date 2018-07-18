<template>
  <view class="page">
    <view class="content primary-color dark">
      <view>
        <image src="../../../static/image/logo-main.png" mode="widthFix"/>
      </view>
      <view class="button-area" v-if="!userAuthed">
        <button type="primary" open-type="getUserInfo" @getuserinfo="gotUserInfo">微信登录</button>
        <button @click="guestLogin">匿名登录</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data: {
    userAuthed: false,
    option: {}
  },

  methods: {
    gotUserInfo () {
      this.$store.dispatch('updateUserInfo')
        .then(() => {
          this.nextStep()
        })
    },
    guestLogin () {
      this.nextStep()
    },
    nextStep () {
      wx.navigateBack()
    }
  },

  onLoad (option) {
    wx.getSetting({
      success: (response) => {
        this.userAuthed = response.authSetting['scope.userInfo']
        if (this.userAuthed) {
          this.$store.dispatch('updateUserInfo')
            .then(() => {
              this.nextStep()
            })
        }
      }
    })
  }

}
</script>

<style lang="less" scoped>
.content {
  text-align: center;
  padding: 80rpx 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.content image {
  width: 400rpx;
}
.button-area button {
  margin: 20rpx 100rpx;
}
</style>
