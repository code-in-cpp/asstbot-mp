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
    } else {
      this.surveyId = '2c0ef34080ea11e88ee1db0f184fef52'
      this.title = '你身边有爱抬杠的人吗？'
      this.avatarUrl = 'https://www.xiaodamp.cn/asstbot/image/nobody.png'
    }
  }
}
</script>
