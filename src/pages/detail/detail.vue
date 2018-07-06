<template>
<view class="page">
    <view class="weui-panel__bd">
        <view class="weui-media-box__hd ">
            <image :src="avatarUrl" class="middle-avatar"/>
            <view class="responser-name" >{{name}}</view>
        </view>
        <view class="weui-media-box__bd">
            <view class="weui-media-box__title">{{score}}</view>
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
                <i class="icon iconfont icon-right" v-if="item.correct"></i>
                <i class="icon iconfont icon-close" v-else></i>
              </view>
          </view>
      </scroll-view>
    </view>    
</view>
</template>

<script>
import { mapState } from 'vuex'
import userSayText from '@/components/userSay/userSayText'
import botSayText from '@/components/botSay/botSayText'
import { formatTime } from '@/utils/index'
export default {
  data: {
    id: '01',
    name: '王博',
    score: '',
    avatarUrl: ''
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
      return formatTime(new Date(this.$store.getters.getCreateTime(this.id)))
    }
  },

  onLoad (option) {
    console.log(option.id)
    this.id = option.id
    this.name = option.name
    this.score = option.score
    this.avatarUrl = option.avatarUrl
  },

  components: {
    userSayText,
    botSayText
  }
}
</script>

<style>

.icon-error {
  padding-left: 5pt;
  padding-top: 10px;
}

.icon-right {
  padding-left: 5pt;
  padding-top: 5px;
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
  flex-direction: column
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

</style>
