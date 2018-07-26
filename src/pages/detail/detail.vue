<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar title="聊天记录"/>
      <view class="weui-panel__bd">
        <view class="weui-media-box__hd ">
          <image :src="responderAvator" class="middle-avatar"/>
          <view class="responser-name" >{{responderName}}</view>
        </view>
        <view class="weui-media-box__bd">
          <view class="weui-media-box__title">标题： {{surveyTitle}}</view>
          <view class="weui-media-box__desc"> 时间： {{getCreateTime}}</view>
        </view>
      </view>
      <view class="content">
        <scroll-view scroll-y="true" class="weui-cells weui-cells_after-title" style="height: 100%">
          <view v-for="item in surveyAnswers" :key="item.id" class="detail-cell">
            <view class="weui-cell__bd">
              <bot-say-text :content="item.question" v-if="item.question.length > 0"></bot-say-text>
            </view>
            <view class="weui-cell__bd">
              <bot-say-image :content="item.questionUrl" v-if="item.questionUrl!=null" @loadDone="imageLoadEnd"></bot-say-image>
            </view>
            <block v-if="item.userSay!=null">
              <view class="weui-cell__ft">
              <user-say-text :content="item.userSay" v-if="item.userSay.length > 0"></user-say-text>
              <view class="answer-correct"  v-if="surveyType==='exam'">
                <i class="icon iconfont icon-right" v-if="item.correct"></i>
                <i class="icon iconfont icon-close" v-else></i>
              </view>
              </view>
            </block>
            <block v-for="(result, i) in item.results" :key="i">
              <view class="weui-cell__ft">
              <user-say-text :content="result.value"></user-say-text>
              <view class="answer-correct"  v-if="surveyType==='exam' && result.correct != null">
                <i class="icon iconfont icon-right" v-if="result.correct"></i>
                <i class="icon iconfont icon-close" v-else></i>
              </view>
              </view>
              <view class="weui-cell__ft" v-if="result.imageUrl!=null&& result.imageUrl!=''">
              <user-say-image :url="result.imageUrl"></user-say-image>
              <view class="answer-correct"  v-if="surveyType==='exam' && result.correct != null">
                <i class="icon iconfont icon-right" v-if="result.correct"></i>
                <i class="icon iconfont icon-close" v-else></i>
              </view>
              </view>
            </block>
          </view>
          <view class="detail-cell weui-cell__bd" v-if="surveyType==='exam'">
            <bot-say-text :content=getResult></bot-say-text>
          </view>
          <view class="detail-cell weui-cell__bd" v-if="surveyConclusion.length > 0">
            <bot-say-text :content=getSurveyConclusion></bot-say-text>
          </view>
        </scroll-view>
      </view>
      <view class="weui-panel__footer">
        <copyright v-if="showFooter"/>
      </view>
    </view>
    <home-button/>
  </movable-area>
</template>

<script>
import { mapState } from 'vuex'
import userSayText from '@/components/userSay/userSayText'
import botSayText from '@/components/botSay/botSayText'
import botSayImage from '@/components/botSay/botSayImage'
import userSayImage from '@/components/userSay/userSayImage'
import copyright from '@/components/copyright'

import { formatTime } from '@/utils/index'
export default {
  data: {
    resultId: '01',
    name: '王博',
    score: '',
    type: 'ask'
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar,
      survey: state => state.surveyResult.curSurvey
    }),
    surveyAnswers () {
      return this.$store.getters.getSurveyAnswer(this.resultId, this.type)
    },
    surveyTitle () {
      return this.$store.getters.getSurveyResultTitle(this.resultId, this.type)
    },
    surveyConclusion () {
      return this.$store.getters.getConclusion(this.resultId, this.type)
    },
    surveyType () {
      return this.$store.getters.getSurveyResultType(this.resultId, this.type)
    },
    responderName () {
      return this.$store.getters.getResponderName(this.resultId, this.type)
    },
    responderAvator () {
      return this.$store.getters.getResponderAvator(this.resultId, this.type)
    },
    getCreateTime () {
      return formatTime(new Date(this.$store.getters.getCreateTime(this.resultId, this.type)))
    },
    showFooter () {
      // return this.$store.getters.getSurveyAnswer(this.resultId, this.type).length <= 3
      return true
    },
    getResult () {
      return '共答对' + this.score + '题'
    },
    getSurveyConclusion () {
      return '评语是：' + this.surveyConclusion
    }
  },

  onLoad (option) {
    this.resultId = option.resultId
    this.score = option.score
    this.type = option.type
    if (this.type === 'reply') {
      this.$store.dispatch('querySurveyResultByUser')
    }
  },
  methods: {
    imageLoadEnd (event) {
      this.scrollToView = ''
      this.scrollToView = 'bottom'
    }
  },
  components: {
    userSayText,
    botSayText,
    copyright,
    botSayImage,
    userSayImage
  }
}
</script>

<style>
.answer-correct {
  width: 60rpx;
}

.page{
  display: flex;
  flex-direction: column;
}
.icon-error {
  padding-left: 5pt;
  padding-top: 10px;
}
.weui-media-box__bd{
  padding-right: 30rpx;
  padding-left: 50rpx;
  padding-top: 50rpx;
  width: 70%;
}

.middle-avatar {
  width: 160rpx!important;
  height: 160rpx!important;
  border-radius: 50%;
}
.weui-panel__bd {
  display : flex ;
  flex-flow : row;
  padding :15px;
  /* border-bottom: 1rpx solid #dadada; */
}

.weui-panel__footer {
  display : flex ;
  flex-flow : row;
  border-top: 0;
  padding-top: 10rpx;
  height: 110rpx;
  background-color:#EEEEEE;
}

.weui-media-box__footer{
  /*padding-right: 30rpx;*/
  /*padding-left: 50rpx;*/
  /*padding-bottom: 20rpx;*/
  border-top: 0;
}

.weui-media-box__desc {
  padding-top: 20rpx;
}

.responser-name {
  padding-top: 0px;
  text-align: center;
  font-size: 25rpx;
}

.detail-cell {
  padding:20rpx 30rpx;
  position:relative;
  -webkit-box-align:center;
  -webkit-align-items:center;
  align-items:center;
}

.weui-cell__bd {
  display : flex ;
  flex-flow: row;
}

.weui-cell__ft {
  display : flex ;
  flex-flow: row;
  color: black;
  padding-top: 5px;
  justify-content: flex-end;
}

.weui-cells {
  background-color:#EEEEEE;
  /* height:300px; */
  /* flex:1 */
}

.content {
  flex-direction: column;
  flex:1
}

.footer {
  border-bottom: 0;
}

.icon-right {
  font-size: 60rpx;
  color: green;
}

.icon-close {
  font-size: 50rpx;
  color: red;
}
.weui-cells:after {
  border: none;
}

.foot{
  background-color:#EEEEEE;
  line-height: 80rpx;
  height:80rpx;
}
.title-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 450rpx;
  max-height: 110rpx;
}
</style>
