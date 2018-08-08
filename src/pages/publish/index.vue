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
            <wxc-list icon="weixin" icon-color="#1cb2b9" title="转发给好友"></wxc-list>
          </button>
        </wxc-panel>
        <wxc-panel>
          <button class="share-button" @click="publish">
            <wxc-list icon="share" icon-color="#1cb2b9" title="分享到朋友圈"></wxc-list>
          </button>
        </wxc-panel>
        <wxc-popup class="J_Popup" @clickOnThis="clickOnPopup">
          <painter :customStyle="customStyle" @imgOK="onImgOk" @imgErr="onImgErr" :palette="_template" v-if="shouldShow"/>
        </wxc-popup>
      </view>
      <home-button/>
    </view>
  </movable-area>
</template>

<script>
// import { getQrcodeImageUrl } from '@/utils/qrcode'
import { savePosterToPhotosAlbum, getQrcodeImageUrl } from '@/utils/qrcode'
import { CreatedPoster } from './createdPoster'
import {VisitedPoster} from './visitedPoster'

export default {
  data: {
    surveyId: '2c0ef34080ea11e88ee1db0f184fef52',
    resultId: '7bf4603097c311e88234972f98fd44b2',
    title: '你身边有爱抬杠的人吗？',
    avatarUrl: 'https://www.xiaodamp.cn/asstbot/image/nobody.png',
    intro: '',
    responderNickName: '',
    conclusion: '',
    conclusionUrl: '',
    shareQrCode: '',
    shouldShow: false,
    shareImg: '',
    customStyle: 'margin-left:0rpx;margin-top:10rpx'
  },
  methods: {
    publish () {
      this.showPopup()
    },
    clickOnPopup () {
      console.log('clickOnPopup')
      this.shouldShow = false
      if (this.shareImg !== '') {
        savePosterToPhotosAlbum(this.shareImg)
      } else {
        wx.showToast({
          title: '图片生成失败',
          icon: 'none',
          duration: 2000
        })
      }
    },
    onImgOk (e) {
      this.shareImg = e.mp.detail.path
      console.log('onImgOk, img:', this.shareImg)
      wx.hideLoading()
    },
    onImgErr () {
      console.log('onImgErr')
      this.shareImg = ''
      wx.hideLoading()
    },
    showPopup () {
      this.shouldShow = true
      let popupComponent = this.$mp.page.selectComponent('.J_Popup')
      popupComponent && popupComponent.show()
      wx.showLoading()
    }
  },
  computed: {
    _template () {
      var poster
      if (this.conclusionUrl !== '' || this.conclusion !== '') {
        // console.log('visited poster, url: ', this.conclusionUrl)
        poster = new VisitedPoster()
        return poster.do(this.responderNickName, this.title, this.conclusion, this.conclusionUrl, this.shareQrCode)
      }
      // console.log('created poster')
      poster = new CreatedPoster()
      return poster.do(this.title, this.intro, this.shareQrCode, this.avatarUrl)
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      return {
        title: this.title,
        path: '/pages/surveyChat/main?id=' + this.surveyId,
        imageUrl: this.avatarUrl
      }
    }
    return {
      path: '/pages/index/main'
    }
  },
  onLoad: function (option) {
    console.log('onLoad, survey id:', option.id)
    if (option.title) {
      this.title = option.title
    }
    if (option.avatarUrl) {
      this.avatarUrl = option.avatarUrl
    }
    if (option.resultId) {
    // if (this.resultId) {
      this.resultId = option.resultId
      this.$store.dispatch('querySurveyResultById', this.resultId)
        .then((surveyResult) => {
          let result = surveyResult.data.result
          let index = result.conclusion
          this.responderNickName = result.responder.nickName
          if (index < result.survey.conclusions.length) {
            this.conclusion = result.survey.conclusions[index].text
            this.conclusionUrl = result.survey.conclusions[index].imageUrl
          }
          this.surveyId = result.survey.id
          this.intro = result.survey.intro
        })
    } else if (option.id) {
      this.surveyId = option.id
      this.$store.dispatch('querySurveyById', this.surveyId)
        .then((survey) => {
          this.intro = survey.intro
        })
      // console.log(JSON.stringify(option))
    } else {
      this.conclusion = ''
      this.conclusionUrl = ''
    }
    if (this.surveyId) {
      getQrcodeImageUrl(this.surveyId)
        .then(value => {
          this.shareQrCode = value
        })
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
