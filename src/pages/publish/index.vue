<template>
  <movable-area class="move-area">
    <view class="page">
      <button class="weui-btn" type="primary" @click="publish">分享到朋友圈</button>
    </view>
    <home-button/>
  </movable-area>
</template>

<script>
import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'

export default {
  data: {
    surveyId: '',
    title: ''
  },
  methods: {
    publish () {
      saveQrCodeToPhotosAlbum(this.surveyId)
    }
  },
  onLoad (option) {
    if (option.id) {
      this.surveyId = option.id
      this.title = option.title
    } else {
      this.surveyId = '2c0ef34080ea11e88ee1db0f184fef52'
      this.title = '你身边有爱抬杠的人吗？'
    }
  }
}
</script>
