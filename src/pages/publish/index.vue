<template>
  <movable-area class="move-area">
    
    <view class="page">
      <title-bar :title="title"/>
      <view class="content">
        <wxc-panel>
          <view class="weui-flex">
            <bod-avatar :url="avatarUrl" size="80"/>
            <view class="weui-flex__item">
              <view class="da-title survey-title">{{title}}</view>
              <view class="da-desc survey-desc">{{intro}}</view>
            </view>
          </view>
        </wxc-panel>
        <wxc-panel title="分享">
          <button open-type="share" class="share-button">
            <wxc-list icon="weixin" icon-color="black" title="转发给好友"></wxc-list>
          </button>
        </wxc-panel>
        <wxc-panel>
          <button class="share-button" @click="publish">
            <wxc-list icon="share" icon-color="black" title="分享到朋友圈"></wxc-list>
          </button>
        </wxc-panel>
        
      </view>
    </view>
  </movable-area>
</template>

<script>
import { saveQrCodeToPhotosAlbum } from '@/utils/qrcode'

export default {
  data: {
    surveyId: '',
    title: '',
    avatarUrl: '',
    intro: ''
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
      this.$store.dispatch('querySurveyById', this.surveyId)
        .then((survey) => {
          this.intro = survey.intro
        })
      // console.log(JSON.stringify(option))
    } else {
      this.surveyId = '2c0ef34080ea11e88ee1db0f184fef52'
      this.title = '你身边有爱抬杠的人吗？'
      this.avatarUrl = 'https://www.xiaodamp.cn/asstbot/image/nobody.png'
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/base.less";
.content {
  padding: 20rpx;
  flex-direction: column;
}

.weui-flex {
  margin: 20rpx 40rpx;
}
.weui-flex .weui-flex__item{
  margin-left: 20rpx;
  padding-top: 20rpx;
}
.survey-title {
  color: @p-dark-color;
}

.survey-desc {
  color: #999999;
  margin-top: 20rpx;
  -webkit-line-clamp: 2;
}

.share-button {
  text-align: start;
  background-color: white;
}

</style>
