<template>
<view class="page">
    <view class="weui-panel__bd">
        <view class="weui-media-box__hd ">
            <image :src="bodAvatar" class="middle-avatar"/>
            <view class="responser-name" >王博</view>
        </view>
        <view class="weui-media-box__bd">
            <view class="weui-media-box__title">{{score}}</view>
            <view class="weui-media-box__desc"> 评语： {{surveyConclusion}}</view>
            <view class="weui-media-box__desc"> 时间： {{getCreateTime}}</view>
        </view>
    </view>
    <view class="page__bd">
    <view class="weui-cells__title">答题结果</view>
    <view class="weui-cells weui-cells_after-title">
        <view v-for="item in surveyAnswers" :key="item.id" class="detail-cell">
            <view class="weui-cell__bd"><bot-say-text :content="item.question"></bot-say-text></view>
            <view class="weui-cell__ft">
              <user-say-text :content="item.value"></user-say-text>
              <i-icon v-if="item.correct" type="right" color="green" size="24" />
              <i-icon v-else type="close" color="red" size="22" />
            </view>
        </view>
    </view>
    </view>
</view>
</template>

<script>
import { mapState } from 'vuex'
import userSayText from '@/components/userSay/userSayText'
import botSayText from '@/components/botSay/botSayText'
export default {
  data: {
    id: '01',
    name: '王博',
    score: ''
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    }),
    surveyAnswers () {
      return this.$store.getters.getSurveyAnswer(this.id)
    },
    surveyConclusion () {
      return this.$store.getters.getConclusion(this.id)
    },
    getCreateTime () {
      return this.$store.getters.getCreateTime(this.id)
    }
  },

  onLoad (option) {
    console.log(option.id)
    this.id = option.id
    this.name = option.name
    this.score = option.score
  },

  components: {
    userSayText,
    botSayText
  }
}
</script>

<style>

.weui-error {
  padding-left: 5pt;
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

.weui-cell__ft {
  display : flex ; 
  flex-flow: row;
  color: black;
  justify-content: flex-end;
}

.detail-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2rpx;
  border-top: 1rpx solid #D9D9D9;
  color: #D9D9D9;
  left: 30rpx;
}

</style>
