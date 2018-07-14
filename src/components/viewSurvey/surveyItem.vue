<template>
  <view class="list-item">
    <view-avatar :url="surveyInfo.avatarUrl"></view-avatar>
    <view class="survey-info">
      <view class="weui-media-box__title">{{surveyInfo.title}}</view>
      <view class="weui-media-box__desc">{{surveyInfo.intro}}</view>
    </view>
    <!--<view class="weui-cell__ft weui-cell__ft_in-access">-->
    <!--</view>-->
  </view>
</template>


<script>
import viewAvatar from '@/components/viewSurvey/viewAvatar'
export default {
  props: {
    surveyInfo: {
      type: Object,
      default: {}
    }
  },
  components: {
    viewAvatar
  }
}
</script>

<style scoped>
  .list-item {
    margin-top: 10rpx;
    margin-left: 20rpx;
    width: 714rpx;
    height: 132rpx;
    border-bottom: #e9e9e9;
    display: flex;
    flex-direction: row;
  }

  .survey-info {
    flex: 1;
    margin-left: 20rpx;
  }

  /*.bot-info .weui-media-box__title{*/
    /*flex: 1;*/
   /*}*/

  /*.bot-info .weui-media-box__desc{*/
    /*flex: 1*/
  /*}*/

</style>
