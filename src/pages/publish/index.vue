<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar :title="surveyTitle"/>
      <button class="weui-btn" type="primary" @click="publish">分享到朋友圈</button>
      <emoji-text text="你好[微笑][发怒]"></emoji-text>
      <button class="weui-btn" type="primary" open-type="share">转发</button>
    </view>
  </movable-area>
</template>

<script>
import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'
import emojiText from '@/components/emojiText'

export default {
  data: {
    surveyId: '',
    title: ''
  },
  components: {
    emojiText
  },
  methods: {
    publish () {
      saveQrCodeToPhotosAlbum(this.surveyId)
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      return {
        title: '测试转发',
        path: '/pages/surveyChat/main?id=' + '621307d08ba111e8a3241dca33486b22',
        imageUrl: 'https://www.xiaodamp.cn/asstbot/image/test-profile.png'
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
    } else {
      this.surveyId = '2c0ef34080ea11e88ee1db0f184fef52'
      this.title = '你身边有爱抬杠的人吗？'
    }
  }
}
</script>
