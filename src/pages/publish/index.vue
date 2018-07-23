<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar :title="title"/>
      <view class="header-item">
        <bod-avatar :url="avatarUrl" size="80"/>
      </view>
      <button class="weui-btn" type="primary" @click="publish">分享到朋友圈</button>
      <button class="weui-btn" type="primary" open-type="share">转发给好友</button>
    </view>
  </movable-area>
</template>

<script>
import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'

export default {
  data: {
    surveyId: '',
    title: '',
    avatarUrl: ''
  },
  methods: {
    publish () {
      saveQrCodeToPhotosAlbum(this.surveyId)
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      return {
        title: this.title,
        path: '/pages/surveyChat/main?id=' + this.id,
        imageUrl: this.avatarUrl
      }
    }
    return {
      path: '/pages/index/main'
    }
  },
  onLoad (option) {
    if (option.id) {
      this.surveyId = option.id
      this.title = option.title
      this.avatarUrl = option.avatarUrl
      console.log(JSON.stringify(option))
    } else {
      this.surveyId = '2c0ef34080ea11e88ee1db0f184fef52'
      this.title = '你身边有爱抬杠的人吗？'
      this.avatarUrl = 'https://www.xiaodamp.cn/asstbot/image/nobody.png'
    }
  }
}
</script>

<style lang="less">
@import "../../../static/base.less";
.user-avator-icon{
  margin-right: 10rpx;
  vertical-align: middle;
  width:40rpx;
  height: 40rpx;
  border-radius: 50%;
}

.responsor-list{
  border-width:medium;
  border-color:grey;
  display: flex;
  flex-direction: column;
}

.middle-avatar {
  width: 140rpx!important;
  height: 140rpx!important;
  border-radius: 50%;
}

.header-item {
  margin-top: 20rpx;
  text-align: center;
}

.weui-navbar{
  position: relative;
}

.scroll-view_tab{
  display: inline-block;
}

.weui-grid{
  height: 160rpx;
  padding-top  :20rpx;
}

.weui-grid__title{
  font-size: @font-size-big;
  font-weight: bold;
  text-align: center;
}

.weui-grid__label{
  text-align: center;
  color: #999999;
}

.bottom_button {
  margin: 40rpx 15rpx
}

.bottom_button .weui-btn {
  width: 210rpx;
  line-height: 2;
}

.btn-font {
  font-size: 32rpx;
}

.btn {
  width: 30%;
  margin-right: 20rpx;
}

.bottom-button-box{
  display: flex;
  justify-content: center;
}

.iconfont {
  display: inline-block;
  font-size:32rpx!important;
}

</style>
