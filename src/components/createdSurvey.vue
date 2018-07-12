<template>
  <block>
    <block v-for="(survey, i) in surveyList" :key="i">
      <navigator :url="'/pages/display/main?id='+survey.id" class="weui-cell weui-cell_access"  hover-class="weui-cell_active">
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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      surveyList: state => state.survey.surveyList
    })
  },
  onLoad () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

<style>
.bot-info {
  min-height: 70rpx
}
</style>
