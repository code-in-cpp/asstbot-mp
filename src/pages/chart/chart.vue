<template>
  <movable-area class="move-area">
    <view class="page">
      <title-bar :title="survey.title"/>
      <view class="header-item">
        <bod-avatar :url="survey.avatarUrl" size="80"/>
      </view>
      <view class = "weui-cells__title"> 答卷列表：</view>
      <view class ="body">
        <view class="responsor-list weui-cells weui-cells_after-title">
          <view v-for="(item, i) in getQuestions" :key="i" class="chart-view-cell" >
            <view class="chart-view-title">第{{i+1}}题：{{item.question}} 【{{item.type}}】</view>
            <view class="chart-canvas-view">
              <canvas :canvas-id="item.chartId" class="chart-canvas"></canvas>
            </view>
          </view>
          <button class="weui-btn" type="primary" @click="toDisplay" size="default" >返回</button>
        </view>
      </view>
    </view>
    <home-button/>
  </movable-area>

</template>


<script>
import { mapState } from 'vuex'
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
    toDisplay () {
      let surveyId = this.surveyId
      wx.navigateBack()
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
    this.$store.dispatch('querySurveyById', this.surveyId)
    this.$store.dispatch('queryAnswerStatics', this.surveyId)
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import "../../../static/base.less";
.header-item {
  margin-top: 20rpx;
  text-align: center;
}

.body {
  display: flex;
  flex-direction: column;
}

.bottom_button {
  margin: 40rpx 15rpx
}

.bottom_button .weui-btn {
  width: 210rpx;
  line-height: 2
}

.responsor-list{
  border-width:medium;
  border-color:grey;
  flex-direction: column;
}

.chart-canvas{
  /* height: 400rpx; */
  width: 640rpx;
  height: 400rpx;
  /* transform-origin :left top; */
  /* width: 640px;
  height: 420px;
  transform: scale(0.5) */
}

.chart-canvas-view{
  padding-left: 40rpx;
  padding-top: 40rpx;
}

.chart-view-title{
  font-size: @font-size-small;
}

.chart-view-cell {
  padding: 20rpx 30rpx;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 480rpx;
  display: block;
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
}
.iconfont {
  display: inline-block
}

</style>
