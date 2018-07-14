<template>
    <view class="weui-cell__hd">
      <!--<bod-avatar size="60" :url="surveyInfo.avatarUrl"></bod-avatar>-->
      <image :src="url" class="survey_list_avatar"/>
    </view>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  survey_list_avatar {
    margin-left: 20rpx;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    overflow: hidden;
  }
</style>
