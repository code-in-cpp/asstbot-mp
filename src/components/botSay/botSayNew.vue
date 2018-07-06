<template>
  <view>
    <view class="incoming">{{content}}</view>
    <view class="createNew"><navigator url="../home/main">赶快来创建自己的机器人吧</navigator></view>
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
  background:#2d8cf0;
  color:#fff;
  padding:0rpx 32rpx;
  border-radius:10rpx;
  font-size:28rpx;
  line-height:72rpx;
}
.incoming {
  padding: 10px;
  border: solid #dddee1 1px;
  border-radius: 15px 15px 15px 0;
  /*background-color: #f8f8f9;*/
  width: auto!important;
  display: inline-block;
  font-size: 28rpx;
  max-width: 90%;
  background: #fff;
}
</style>
