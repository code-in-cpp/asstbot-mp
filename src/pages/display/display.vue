<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar :title="survey.title"/>
      <view class="header-item">
        <bod-avatar :url="survey.avatarUrl" size="80"/>
      </view>
      <view class="page__bd">
        <view class="weui-grids">
          <view class="weui-grid" hover-class="weui-grid_active">
            <view class="weui-grid__title">{{commitToday}}</view>
            <view class="weui-grid__label">今日提交</view>
          </view>
          <view class="weui-grid" hover-class="weui-grid_active">
            <view class="weui-grid__title" >{{commitCount}}</view>
            <view class="weui-grid__label">提交总数</view>
          </view>
          <view url="" class="weui-grid" hover-class="weui-grid_active">
            <view class="weui-grid__title">{{reviewCount}}</view>
            <view class="weui-grid__label">浏览总数</view>
          </view>
        </view>
      </view>
      <!-- <nav-bar :navItems="navItems" @tabActive="tabActive"></nav-bar> -->
      <view class = "weui-cells__title"> 答卷列表：</view>
      <view class="content">
        <scroll-view scroll-y="true" class="responsor-list weui-cells weui-cells_after-title">
          <navigator v-for="item in surveySummary" :url="'../detail/main?resultId='+item.id+'&type=ask&score='+item.score" :key="item" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
              <image :src="item.avatarUrl" class = "user-avator-icon" ></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft weui-cell__ft_in-access"><view  v-if="survey.type==='exam'">答对 {{item.score}} 题</view></view>
          </navigator>

          <view class="weui-cell" v-for="item in emptySurveyAnswer" :key="item.id">
            <view class="weui-cell__hd">
              <image :src="item.avatarUrl" class = "user-avator-icon" ></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft">{{item.score}}</view>
          </view>
        </scroll-view>
      </view>
      <view class="footer bottom_button">
        <view class="weui-flex bottom-button-box">
            <view class="weui-flex__item btn-style-survey">
              <button class="weui-btn btn-font" type="default" @click="selfTest" :disabled="disableShare"><i class="icon iconfont icon-live"></i>自测</button>
            </view>
            <view class="weui-flex__item btn-style-survey">
              <button class="weui-btn btn-font" type="default" @click="chartStatics" ><i class="icon iconfont icon-stealth"></i>统计</button>
            </view>
            <view class="weui-flex__item btn-style-survey">
              <button class="weui-btn btn-font" type="primary" @click="toPublishPage" :disabled="disableShare"><i class="icon iconfont icon-share"></i>分享</button>
            </view>
        </view>
      </view>
    </view>
  </movable-area>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import navBar from '@/components/navBar'
// const formatTypes = {'radio': '单选', 'checkbox': '多选', 'text': '问答', 'date': '时间', 'location': '地点'}
/* eslint-disable */
export default {
  data: {
    surveyId: '',
    title: '',
    activeIndex: 0,
    charts: []
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar,
      survey: state => state.surveyResult.curSurvey,
      chartConfigs: state => state.surveyResult.chartConfigs
    }),
    ...mapGetters({
      surveySummary: 'surveySummary',
      emptySurveyAnswer: 'emptySurveyAnswer',
      commitToday: 'commitToday',
      commitCount: 'commitCount',
      reviewCount: 'reviewCount'
    }),
    disableShare () {
      if (this.survey === undefined || this.survey === null || this.survey.subjects === undefined || this.survey.subjects === null) {
        return true
      }
      return !this.survey.subjects.length
    }
  },

  components: {
    navBar
  },
  methods: {
    selfTest () {
      wx.navigateTo({
        url: `/pages/surveyChat/main?id=${this.surveyId}&scene=test`
      })
    },
    toPublishPage () {
      wx.navigateTo({
        url: `../publish/main?id=${this.survey.id}&title=${this.survey.title}&avatarUrl=${this.survey.avatarUrl}`
      })
    },
    chartStatics() {
      wx.navigateTo({
        url: `/pages/chart/main?id=${this.surveyId}`
      })
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.survey.title,
      path: '/pages/surveyChat/main?id=' + this.surveyId,
      imageUrl: this.survey.avatarUrl
    }
  },

  onLoad (option) {
    if (option.id) {
      this.surveyId = option.id
      this.title = option.title
    } else {
      this.surveyId = 'survey-652ea4d0-7dad-11e8-abe8-abb0bd666421'
      this.title = '测测你有多了解我？'
    }
    console.log('surveyId is:', this.surveyId)
    this.$store.dispatch('querySurveyResult', this.surveyId)
    this.$store.dispatch('querySurveyById', this.surveyId)
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import "../../../static/base.less";
.user-avator-icon{
  margin-right: 10rpx;
  vertical-align: middle;
  width:40rpx;
  height: 40rpx;
  border-radius: 50%;
}

.responsor-list{
  border-width:medium;
  border-color:grey;
  display: flex;
  flex-direction: column;
}

.middle-avatar {
  width: 140rpx!important;
  height: 140rpx!important;
  border-radius: 50%;
}

.header-item {
  margin-top: 20rpx;
  text-align: center;
}

.weui-navbar{
  position: relative;
}

.scroll-view_tab{
  display: inline-block;
}

.weui-grid{
  height: 160rpx;
  padding-top  :20rpx;
}

.weui-grid__title{
  font-size: @font-size-big;
  font-weight: bold;
  text-align: center;
}

.weui-grid__label{
  text-align: center;
  color: #999999;
}

.bottom_button {
  margin: 40rpx 15rpx
}

.bottom_button .weui-btn {
  width: 210rpx;
  line-height: 2;
}

.btn-font {
  font-size: 32rpx;
}

.btn {
  width: 30%;
  margin-right: 20rpx;
}

.bottom-button-box{
  display: flex;
  justify-content: center;
}

.iconfont {
  display: inline-block;
  font-size:32rpx!important;
}

</style>
