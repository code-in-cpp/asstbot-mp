<template>
  <view>
    <view class="incoming space">感谢您的参与，您可以单击按钮创建自己的问卷机器人</view>
    <view class="createNew form-control second-color light"><navigator url="../index/main">创建我的问卷机器人</navigator></view>
    <!--<view @click="toNewRobot" class="createNew">赶快来创建自己的机器人吧</view>-->
  </view>
</template>

<script>
  export default {
    name: 'botSayNew',
    props: ['content'],
    methods: {
      // toNewRobot () {
      //   wx.setStorage({
      //     key: 'complate',
      //     data: 'success'
      //   })
      //   wx.navigateTo({
      //     url: '../home/main'
      //   })
      // }
    }
  }
</script>

<style scoped>
.createNew{
  padding:0rpx 32rpx;
  border-radius:10rpx;
  font-size:28rpx;
  line-height:72rpx;
  text-align: center;
}

.space {
  margin-bottom: 40rpx;
}
</style>
