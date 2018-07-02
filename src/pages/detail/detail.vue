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
        </view>
    </view>
    <view class="page__bd">
    <view class="weui-cells__title">答题结果</view>
    <view class="weui-cells weui-cells_after-title">
        <view v-for="item in surveyAnswers" :key="item.id" class="weui-cell">
            <view class="weui-cell__bd">{{item.question}}</view>
            <view class="weui-cell__ft">{{item.value}}</view>
            <icon type="cancel" class="weui-error" size="18"></icon>
        </view>
    </view>
    </view>

</view>
</template>


<script>
import { mapState } from 'vuex'
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
    }
  },

  onLoad (option) {
    console.log(option.id)
    this.id = option.id
    this.name = option.name
    this.score = option.score
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
</style>
