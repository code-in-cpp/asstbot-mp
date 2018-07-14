<template>
  <view class="list-item">
    <view>
      <view-avatar :url="surveyInfo.avatarUrl"></view-avatar>
    </view>
    <view class="survey-info">
      <view class="da-title survey-title">{{surveyInfo.title}}</view>
      <view class="da-desc survey-desc">{{surveyInfo.intro}}</view>
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

<style lang="less" scoped>
  @import "../../../static/base.less";
  .list-item {
    margin-top: 10rpx;
    margin-left: 10rpx;
    margin-right: 100rpx;
    width: 730rpx;
    height: 130rpx;
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

  .survey-desc {
    color: #999999;
    margin-top: 10rpx;
    -webkit-line-clamp: 2;
  }

</style>
