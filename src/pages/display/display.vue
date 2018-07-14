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
      <view class="weui-flex">
        <scroll-view scroll-x  class="scroll-button-view">
        <view class="scroll-button-item-view">
          <button class="weui-btn" type="warn" @click="deleteSurvey" size="mini"><i class="icon iconfont icon-delete"></i>删除</button>
        </view>
        <view class="scroll-button-item-view">
          <button class="weui-btn" type="default" @click="selfTest" size="mini"><i class="icon iconfont icon-stealth"></i>自测</button>
        </view>
        <view class="scroll-button-item-view">
          <button class="weui-btn" type="default" @click="chartStatics" size="mini"><i class="icon iconfont icon-stealth"></i>统计</button>
        </view>
        <view class="scroll-button-item-view">
          <button class="weui-btn" type="default" @click="editSurvey" size="mini"><i class="icon iconfont icon-editor"></i>编辑</button>
        </view>
        <view class="scroll-button-item-view">
          <button class="weui-btn" open-type="share" type="primary" size="mini"><i class="icon iconfont icon-share"></i>发布</button>
        </view>
      </scroll-view>
      </view>
    </view>
</view>
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
    navItems: ['答卷列表', '结果统计'],
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
    })
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
    selfTest () {
      wx.navigateTo({
        url: `/pages/index/main?id=${this.surveyId}&scene=test`
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
      path: '/pages/index/main?id=' + this.surveyId,
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
  width: 180rpx;
  line-height: 2
}

.button-sp-area{
  padding-left: 40rpx;
  padding-bottom: 40rpx;
}

.scroll-button-view {
  height:100rpx;
  white-space:nowrap
}

.scroll-button-item-view {
  display:inline-block;
  width:200rpx;
  margin-left:20rpx;
}

.btn {
  width: 30%;
  margin-right: 20rpx;
}

.iconfont {
  display: inline-block
}

</style>
