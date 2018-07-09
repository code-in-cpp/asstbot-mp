<template>
<view class="page">
    <page-title :title="survey.title"/>
    <view class="header-item">
      <bod-avatar :url="survey.avatarUrl" size="80"/>
    </view>
    <view class="page__bd">
        <view class="weui-grids">
            <navigator url="" class="weui-grid" hover-class="weui-grid_active">
                <view class="weui-grid__title">{{commitToday}}</view>
                <view class="weui-grid__label">今日提交</view>
            </navigator>
            <navigator url="" class="weui-grid" hover-class="weui-grid_active">
                <view class="weui-grid__title" >{{commitCount}}</view>
                <view class="weui-grid__label">提交总数</view>
            </navigator>
            <navigator url="" class="weui-grid" hover-class="weui-grid_active">
                <view class="weui-grid__title">{{reviewCount}}</view>
                <view class="weui-grid__label">浏览总数</view>
            </navigator>
        </view>
    </view>
    <nav-bar :navItems="navItems" @tabActive="tabActive"></nav-bar>
    <view v-if="activeIndex == 0" class="content">
      <scroll-view scroll-y="true" class="responsor-list weui-cells weui-cells_after-title">
          <navigator v-for="item in surveySummary" :url="'../detail/main?resultId='+item.id+'&surveyId='+surveyId+'&score='+item.score" :key="item" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
              <view class="weui-cell__hd">
                  <image :src="item.avatarUrl" class = "user-avator-icon" ></image>
              </view>
              <view class="weui-cell__bd">{{item.name}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access">答对 {{item.score}} 题</view>
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
   <view  v-if="activeIndex == 1" class ="content">
     <scroll-view scroll-y="true" class="responsor-list weui-cells weui-cells_after-title">
       <view v-for="item in getQuestions" :key="item" class="chart-view-cell" >
        <view class="chart-view-title">第{{item.id}}题：{{item.question}} 【{{item.type}}】</view> 
        <view class="chart-canvas-view"> 
          <canvas :canvas-id="item.chartId" class="chart-canvas"></canvas>
        </view>
       </view> 
     </scroll-view>   
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
const formatTypes = {'radio': '单选', 'checkbox': '多选', 'text': '问答'}
/* eslint-disable */
export default {
  data: {
    surveyId: '',
    title: '',
    navItems: ['答卷列表', '问题汇总'],
    activeIndex: 0,
    grids: [ { id: 0, desc: '今日提交', value: 10 }, { id: 0, desc: '提交总数', value: 4 }, { id: 0, desc: '浏览总数', value: 6 } ],
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
      let questions = this.survey.subjects.map(subject => {
        let chartId = 'column_' + subject.id
        return {id:subject.id, question: subject.question, type: formatTypes[subject.type], chartId: chartId}
      })
      let configs = this.chartConfigs
      this.charts = configs.map( config => {
          console.log('begin dram canvas .........')
          console.log(config)
          return new WxCharts(config)
        })
      console.log('questions is :')
      console.log(questions)
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
    },
    deleteSurvey () {
      console.log('deleteSurvey')
      let that = this
      wx.showModal({
        title: '您确认要删除吗？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            that.$store.dispatch('deleteSurvey', that.surveyId)
              .then(() => {
                wx.reLaunch({
                  url: `/pages/home/main`
                })
              })
          } else {
            console.log('用户点击取消操作')
          }
        }
      })
    },
    tabActive (event) {
      this.activeIndex = event
      if(this.activeIndex == 1){
        console.log('switch to charts tab')
        this.charts.map( chart => {
          console.log(chart)
          chart.updateData()
        })
      }
    },

    touchStart (e) {
      console.log(e)
      this.startTime = e.timeStamp
    },

    touchEnd (e) {
      console.log(e)
      this.endTime = e.timeStamp
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.survey.title,
      path: '/pages/index/main?id=' + this.surveyId,
      imageUrl: this.survey.avatarUrl
    }
  },

  onLoad (option) {
    if (option.id) {
      this.surveyId = option.id
      console.log('surveyId:' + this.surveyId)
      this.title = option.title
    } else {
      this.surveyId = 'survey-652ea4d0-7dad-11e8-abe8-abb0bd666421'
      this.title = '测测你有多了解我？'
      console.log('error: page receive no survey id!')
    }
    this.$store.dispatch('querySurveyResult', this.surveyId)
    this.$store.dispatch('querySurveyById', this.surveyId)
    this.$store.dispatch('queryAnswerStatics', this.surveyId)
  },
  mounted () {
  }
}
</script>

<style>
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
  font-size: 48rpx;
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
  line-height: 2
}

.button-sp-area{
  padding-left: 40rpx;
  padding-bottom: 40rpx;
}

.chart-canvas{
  /* height: 400rpx; */
  /* width: 320px;
  height: 200px; */
  transform-origin :left top;
  width: 640px;
  height: 400px;
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
