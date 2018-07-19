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
import { mapState } from 'vuex'
export default {
  data: {
    option: {}
  },
  computed: {
    ...mapState({
      userAuthed: state => state.userProfile.authed
    })
  },
  methods: {
    gotUserInfo () {
      this.nextStep()
    },
    guestLogin () {
      this.nextStep()
    },
    nextStep () {
      this.$store.dispatch('updateUserInfo')
        .then(() => {
          this.$store.commit('setLogin')
          wx.navigateBack()
        })
    }
  },

  onLoad (option) {
    if (this.userAuthed) {
      this.$store.dispatch('updateUserInfo')
        .then(() => {
          this.nextStep()
        })
        .catch(e => {
          console.error(e)
        })
    }
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
