<template>
    <view class="survey_list_avatar">
      <bod-avatar :url="url" size="60"/>
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
  .survey_list_avatar {
    display: block;
    margin-left: 10rpx;
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    overflow: hidden;
  }

  .survey_list_avatar image{
    width: 100%;
    height: 100%;
  }


</style>
