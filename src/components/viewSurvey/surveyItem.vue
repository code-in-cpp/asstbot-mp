<template>
  <view class = padding :class="isActive? 'active-item': '' ">
    <view class="list-item" >
      <view class="label-wrapper">
        <view-avatar :url="surveyInfo.avatarUrl"></view-avatar>
        <top-label :title="1234" left_rpx="80"></top-label>
      </view>
      <view class="survey-info">
        <view class="da-title survey-title">{{surveyInfo.title}}</view>
        <view class="da-desc survey-desc">{{surveyInfo.intro}}</view>
      </view>
    </view>
  </view>
</template>


<script>
import viewAvatar from '@/components/viewSurvey/viewAvatar'
import topLabel from '@/components/viewSurvey/topLabel'
export default {
  props: {
    surveyInfo: {
      type: Object,
      default: {}
    },
    isActive: {
      default: false,
      type: Boolean
    }
  },
  components: {
    viewAvatar,
    topLabel
  }
}
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  .padding {
    background-color: #ffffff;
    height: 160rpx;
  }

  .list-item {
    padding-top: 12rpx;
    margin-left: 10rpx;
    //margin-right: 100rpx;
    width: 730rpx;
    height: 142rpx;
    border-bottom: 2rpx solid;
    border-bottom-color: @btn-border-color;
    display: flex;
    flex-direction: row;
  }

  .survey-info {
    margin-left: 20rpx;
    margin-right: 20rpx;
    width: 560rpx;
  }

  .survey-title {
    color: @p-dark-color;
  }

  .active-item {
    background-color: #C8C7CC;
  }
  .survey-desc {
    color: #999999;
    margin-top: 20rpx;
    -webkit-line-clamp: 2;
  }

  .label-wrapper {
    position: relative;
  }
</style>
