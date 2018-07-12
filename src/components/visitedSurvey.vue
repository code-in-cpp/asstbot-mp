<template>
<block>
  <block v-for="survey in replySurveys" :key="survey.id">
    <navigator :url="'/pages/detail/main?resultId='+survey.resultId+'&surveyId='+survey.id+'&score='+survey.score" class="weui-cell weui-cell_access"  hover-class="weui-cell_active">
      <view class="weui-cell__hd">
        <bod-avatar size="40" :url="survey.avatarUrl"></bod-avatar>
      </view>
      <view class="weui-cell__bd ">
        <view class="bot-info">
          <view class="weui-media-box__title">{{survey.title}}</view>
          <view class="weui-media-box__desc">{{survey.intro}}</view>
        </view>
      </view>
      <view class="weui-cell__ft weui-cell__ft_in-access"></view>
    </navigator>
  </block>
</block>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      replySurveys: 'getReplySurveys'
    })
  },
  onLoad () {
    this.$store.dispatch('querySurveyResultByUser')
  }
}
</script>

<style>
.bot-info {
  min-height: 70rpx
}
</style>