<template>
<view class="page">
    <page-title :title="survey.title"/>
    <view class="header-item">
      <bod-avatar :url="survey.avatarUrl" size="80"/>
    </view>
   <view class ="content">
       <view v-for="(item, i) in getQuestions" :key="i" class="chart-view-cell" >
        <view class="chart-view-title">第{{i+1}}题：{{item.question}} 【{{item.type}}】</view>
        <view class="chart-canvas-view">
          <canvas :canvas-id="item.chartId" class="chart-canvas"></canvas>
        </view>
       </view>
   </view>
    <view class="footer bottom_button">
      <view class="weui-flex">
        <view class="weui-flex__item">
          <button class="weui-btn greybtn" type="warn" @click="deleteSurvey" size="default"><i class="icon iconfont icon-delete"></i>删除</button>
        </view>
        <view class="weui-flex__item">
          <button class="weui-btn" type="default" @click="editSurvey" size="default"><i class="icon iconfont icon-editor"></i>编辑</button>
        </view>
        <view class="weui-flex__item">
          <button class="weui-btn" open-type="share" type="primary" size="default"><i class="icon iconfont icon-share"></i>发布</button>
        </view>
      </view>
    </view>
</view>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import WxCharts from '@/utils/wxcharts'
import navBar from '@/components/navBar'
const formatTypes = {'radio': '单选', 'checkbox': '多选', 'text': '问答', 'date': '时间', 'location': '地点'}
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

    getQuestions(){
      let that = this;
      let questions = this.survey.subjects.map((subject, i) => {
        let chartId = 'column_' + (i +1)
        return {id:subject.id, question: subject.question, type: formatTypes[subject.type], chartId: chartId}
      })
      let configs = this.chartConfigs
      this.charts = configs.map( config => {
          return new WxCharts(config)
        })
      return questions
    }
  },

  components: {
    navBar
  },
  methods: {
    editSurvey () {
      let surveyId = this.surveyId
      wx.navigateTo({
        url: `/pages/surveySubjects/main?id=${surveyId}`
      })
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
    this.$store.dispatch('queryAnswerStatics', this.surveyId)
  },
  mounted () {
  }
}
</script>

<style>

.header-item {
  margin-top: 20rpx;
  text-align: center;
}

.bottom_button {
  margin: 40rpx 15rpx
}

.bottom_button .weui-btn {
  width: 210rpx;
  line-height: 2
}

.chart-canvas{
  /* height: 400rpx; */
  /* width: 320px;
  height: 200px; */
  transform-origin :left top;
  width: 640px;
  height: 420px;
  transform: scale(0.5)
}

.chart-canvas-view{
  padding-left: 40rpx;
  padding-top: 40rpx;
}

.chart-view-title{
  font-size: 28rpx;
}

.chart-view-cell {
  padding: 20rpx 30rpx;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 250px;
  flex-direction: column;
}

.chart-view-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2rpx;
  border-top: 1rpx solid #D9D9D9;
  color: #D9D9D9;
  left: 30rpx;
}

.btn {
  width: 30%;
  margin-right: 20rpx;
  /*background-color: #FFCC00;*/
  /*color: #FFF;*/
}
.greybtn{
  background-color: #ffffff;
}

.iconfont {
  display: inline-block
}

</style>
