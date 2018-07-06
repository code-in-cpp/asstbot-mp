<template>
  <view class="page">
    <view class="weui-cells__title">已创建的机器人</view>
    <view class="content">
      <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
        <view class="weui-cells weui-cells_after-title">
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
        </view>
      </scroll-view>
    </view>
    <view class="footer bottom_button">
      <button class="weui-btn" type="primary" size="default" @click="toCreateBot">创建问卷机器人</button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      logs: []
    }
  },

  computed: {
    ...mapState({
      surveyList: state => state.survey.surveyList
    })
  },

  methods: {
    toCreateBot (ev) {
      wx.navigateTo({
        url: `/pages/surveyProfile/main?action=create`
      })
    }
  },

  created () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

<style>
.bot-info {
  min-height: 70rpx
}
.avatar {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  overflow: hidden;
}
</style>
