<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar :title="surveyTitle"/>
      <view class="weui-panel__bd">
        <view class="weui-media-box__hd ">
          <image :src="responderAvator" class="middle-avatar"/>
          <view class="responser-name" >{{responderName}}</view>
        </view>
        <view class="weui-media-box__bd">
          <view class="weui-media-box__title" v-if="surveyType==='exam'">答对 {{score}} 题</view>
          <view class="weui-media-box__desc"> 评语： {{surveyConclusion}}</view>
          <view class="weui-media-box__desc"> 时间： {{getCreateTime}}</view>
        </view>
      </view>
      <view class="content">
        <scroll-view scroll-y="true" class="weui-cells weui-cells_after-title" style="height: 100%">
          <view v-for="item in surveyAnswers" :key="item.id" class="detail-cell">
            <view class="weui-cell__bd">
              <bot-say-text :content="item.question"></bot-say-text>
            </view>
            <view class="weui-cell__ft">
              <user-say-text :content="item.value"></user-say-text>
              <view class="answer-correct"  v-if="surveyType==='exam'">
                <i class="icon iconfont icon-right" v-if="item.correct"></i>
                <i class="icon iconfont icon-close" v-else></i>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="foot">@@@</view>
    </view>
    <home-button/>
  </movable-area>
</template>

<script>
import { mapState } from 'vuex'
import userSayText from '@/components/userSay/userSayText'
import botSayText from '@/components/botSay/botSayText'
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
    }
  },

  onLoad (option) {
    console.log(option.resultId)
    this.resultId = option.resultId
    this.score = option.score
    this.type = option.type
  },

  components: {
    userSayText,
    botSayText
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
}

.middle-avatar {
  width: 160rpx!important;
  height: 160rpx!important;
  border-radius: 50%;
}
.weui-panel__bd{
  display : flex ;
  flex-flow : row;
  padding :15px;
  border-bottom: 1rpx solid #dadada;
}

.weui-media-box__desc {
  padding-top: 20rpx;
}

.responser-name {
  padding-top: 0px;
  text-align: center;
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
  position: fixed;
  bottom: 0;
  width: 100%;
}

 .icon-right {
   font-size: 60rpx;
   color: green;
 }

 .icon-close {
   font-size: 50rpx;
   color: red;
 }

/* .detail-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2rpx;
  border-top: 1rpx solid #D9D9D9;
  color: #D9D9D9;
  left: 30rpx;
} */
  .foot{
    background: #f8f8f8;
    line-height: 80rpx;
    height:80rpx;
  }

</style>
