<template>
  <view class ="surveyTitle" :class="isActive? 'active-item': '' ">
    <view class="list-item">
      <view class="label-wrapper" @click="changeAvatar">
        <view-avatar :url="surveyInfo.avatarUrl" @click="changeAvatar"></view-avatar>
      </view>
      <view class="survey-info" @click="changeInfo">
        <view class="da-title survey-title">{{surveyInfo.title}}</view>
        <view class="da-desc survey-desc">{{surveyInfo.intro}}</view>
      </view>
      <i class="icon iconfont icon-enter iconStyle icon-width-92" @click="changeInfo"></i>
    </view>
  </view>
</template>


<script>
import viewAvatar from '@/components/viewSurvey/viewAvatar'
import Badge from '@/components/viewSurvey/Badge'
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
    Badge
  },
  methods: {
    changeInfo () {
      console.log('survey item, try to change info')
      this.$emit('changeInfo')
    },
    changeAvatar () {
      console.log('survey item, try to change avatar')
      this.$emit('changeAvatar')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../static/base.less";
  .padding {
    background-color: #ffffff;
    height: 160rpx;
    border-bottom: 2rpx solid;
    border-bottom-color: @btn-border-color;
  }
  .surveyTitle{
    background-color: #ffffff;
    height: 160rpx;
    border-bottom: 2rpx solid;
    border-bottom-color: @btn-border-color;
  }
  .list-item {
    padding-top: 12rpx;
    margin-left: 10rpx;
    //margin-right: 100rpx;
    width: 730rpx;
    height: 142rpx;
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
    //background-color: @highlight-grey-color;
  }
  .survey-desc {
    color: #999999;
    margin-top: 20rpx;
    -webkit-line-clamp: 2;
  }

  .label-wrapper {
    position: relative;
    padding-top: 10rpx;
  }

  .iconStyle {
    /*height: 100%;*/
    /*line-height: 100%;*/
    display: flex;//必须有，不然没有效果
    justify-content: center;
    align-items: center;
    color: @p-color;
    padding-right: 20rpx;
    width: 100%;
  }
  .icon-width-92{
    width: 92rpx!important;
  }
</style>
