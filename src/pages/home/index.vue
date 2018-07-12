<template>
  <view class="page">
    <view class = "content">
      <view class="weui-tab">
        <nav-bar :navItems="items" @tabActive="tabActive"></nav-bar>
        <view class="weui-tab__panel">
            <scroll-view scroll-y='true' style="height: 100%" :scroll-into-view="scrollToView">
              <view v-if="activeIndex == 0">
                <view class="weui-cells weui-cells_after-title">
                  <created-survey />             
                </view>
              </view>
              <view v-if="activeIndex == 1">
                <view class="weui-cells weui-cells_after-title">
                  <visited-survey />
                </view>
              </view>
            </scroll-view>
        </view>
      </view>
    </view>
    <view class="footer bottom_button">
        <picker @change="updateSurveyType(surveyType[$event.mp.detail.value])" :value="exam" :range="surveyTypeName">
          <button class="weui-btn" type="primary" size="default" >创建问卷机器人</button>
        </picker>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import navBar from '@/components/navBar'
import createdSurvey from '@/components/createdSurvey'
import visitedSurvey from '@/components/visitedSurvey'

const surveyType = ['exam', 'poll', 'inquiry']
const surveyTypeName = ['答卷机器人', '投票机器人', '问卷机器人']

export default {
  data () {
    return {
      logs: [],
      surveyTypeName: surveyTypeName,
      surveyType: surveyType,
      items: ['已创建机器人', '已回复机器人'],
      activeIndex: 0
    }
  },

  components: {
    navBar,
    createdSurvey,
    visitedSurvey
  },

  computed: {
    ...mapState({
      surveyList: state => state.survey.surveyList
    }),

    ...mapGetters({
      replySurveys: 'getReplySurveys'
    })
  },

  methods: {
    toCreateBot (ev) {
      wx.navigateTo({
        url: `/pages/surveyProfile/main?action=create`
      })
    },

    tabActive (event) {
      this.activeIndex = event
    },

    updateSurveyType (select) {
      console.log(select)
      wx.navigateTo({
        url: `/pages/surveyProfile/main?action=create&surveyType=${select}`
      })
    }
  },

  created () {

  }
}
</script>

<style>

.content {
  flex-direction: column;
}

.avatar {
  border-radius: 50%;
  width: 120rpx;
  height: 120rpx;
  overflow: hidden;
}
</style>
