<template>
<block>
  <block v-for="replyInfo in replySurveys" :key="replyInfo.resultId">
    <navigator :url="'/pages/detail/main?resultId='+replyInfo.id+'&type=reply&score='+replyInfo.score" class="weui-cell weui-cell_access"  hover-class="weui-cell_active">
      <view class="weui-cell__hd">
        <bod-avatar size="40" :url="replyInfo.survey.avatarUrl"></bod-avatar>
      </view>
      <view class="weui-cell__bd ">
        <view class="bot-info">
          <view class="weui-media-box__title">{{replyInfo.survey.title}}</view>
          <view class="weui-media-box__desc">{{replyInfo.survey.intro}}</view>
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
