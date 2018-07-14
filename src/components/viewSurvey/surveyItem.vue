<template>
  <view>
    <view class="weui-cell__hd">
      <view-avatar url="surveyInfo.avatarUrl"></view-avatar>
    </view>
    <view class="weui-cell__bd ">
      <view class="bot-info">
        <view class="weui-media-box__title">{{surveyInfo.title}}</view>
        <view class="weui-media-box__desc">{{surveyInfo.intro}}</view>
      </view>
    </view>
    <view class="weui-cell__ft weui-cell__ft_in-access">
    </view>
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
survey_list_avata {
  margin-left: 20rpx;
  width: 120rpx;
  height: 120rpx;
}
</style>
