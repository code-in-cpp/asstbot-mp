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
        <wxc-popup class="J_Popup" @clickOnThis="popupHide">
          <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="_template" v-if="shouldShow"/>
        </wxc-popup>
      </view>
      <home-button/>
    </view>
  </movable-area>
</template>

<script>
// import { getQrcodeImageUrl } from '@/utils/qrcode'
import { savePosterToPhotosAlbum, getQrcodeImageUrl } from '@/utils/qrcode'
// import { CreatedPoster } from './createdPoster'
import {VisitedPoster} from './visitedPoster'

export default {
  data: {
    surveyId: '2c0ef34080ea11e88ee1db0f184fef52',
    resultId: '59a47830973211e88234972f98fd44b2',
    title: '你身边有爱抬杠的人吗？',
    avatarUrl: 'https://www.xiaodamp.cn/asstbot/image/nobody.png',
    intro: '',
    conclusion: '',
    conclusionUrl: '',
    shareQrCode: '',
    hasLoaded: false,
    retrieveDone: false,
    shouldShow: false,
    shareImg: '',
    customStyle: 'margin-left:0rpx;margin-top:10rpx'
  },
  methods: {
    publish () {
      this.showPopup()
    },
    popupHide () {
      console.log('popupHide')
      this.shouldShow = false
      savePosterToPhotosAlbum(this.shareImg)
    },
    onImgOk (e) {
      console.log('onImgOk')
      this.shareImg = e.mp.detail.path
    },
    showPopup () {
      this.shouldShow = true
      let popupComponent = this.$mp.page.selectComponent('.J_Popup')
      popupComponent && popupComponent.show()
      // popupComponent && popupComponent.toggle(true)
    }
  },
  computed: {
    // _template () {
    //   var poster = new CreatedPoster()
    //   return poster.do(this.title, this.intro, this.shareQrCode)
    // }
    _template () {
      var poster = new VisitedPoster()
      return poster.do('赵永刚', this.title, this.conclusion, this.conclusionUrl, this.shareQrCode)
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
  onLoad (option) {
    console.log('onLoad, survey id:', option.id)
    if (option.title) {
      this.title = option.title
    }
    if (option.avatarUrl) {
      this.avatarUrl = option.avatarUrl
    }
    if (option.id) {
      this.surveyId = option.id
      this.$store.dispatch('querySurveyById', this.surveyId)
        .then((survey) => {
          this.intro = survey.intro
          this.retrieveDone = true
        })
      getQrcodeImageUrl(this.surveyId)
        .then(value => {
          this.shareQrCode = value
          this.hasLoaded = true
        })
      // console.log(JSON.stringify(option))
    }
    // if (option.resultId) {
    this.$store.dispatch('querySurveyResultById', this.resultId)
      .then((result) => {
        this.conclusion = result.conclusion
        console.log('survey result:', result)
      })
    // }
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
