<template>
<view class="page">
    <view class="header">
        <view class="header-item">
        <bod-avatar :url="survey.avatarUrl" size="80"/>
        </view>
        <view class="header-item">{{survey.title}}</view>
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
    <view class="weui-cells__title">答卷列表:</view>
    <scroll-view scroll-y="true" class="responsor-list weui-cells weui-cells_after-title">
        <navigator v-for="item in surveySummary" :url="'../detail/main?id='+item.id+'&name='+item.name+'&score='+item.score" :key="item" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
                <image :src="item.avatarUrl" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft weui-cell__ft_in-access">{{item.score}}</view>
        </navigator>

        <view class="weui-cell" v-for="item in emptySurveyAnswer" :key="item.id">
            <view class="weui-cell__hd">
                <image :src="item.avatarUrl" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft">{{item.score}}</view>
        </view>
    </scroll-view>
    
    <view class="page__bd page__bd_spacing">
        <button class="weui-btn mini-btn" open-type="share" type="primary" size="mini"><i-icon type="share_fill" /> 发布</button>
        <button class="weui-btn mini-btn" type="default" @click="editSurvey" size="mini"><zan-icon type="edit" /> 编辑</button>
        <button class="weui-btn mini-btn" type="warn" @click="deleteSurvey" size="mini"><zan-icon type="close" /> 删除</button>
    </view>
</view>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: {
    surveyId: '',
    title: '',
    grids: [ { id: 0, desc: '今日提交', value: 10 }, { id: 0, desc: '提交总数', value: 4 }, { id: 0, desc: '浏览总数', value: 6 } ]
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar,
      survey: state => state.surveyResult.survey
    }),
    ...mapGetters({
      surveySummary: 'surveySummary',
      emptySurveyAnswer: 'emptySurveyAnswer',
      commitToday: 'commitToday',
      commitCount: 'commitCount',
      reviewCount: 'reviewCount'
    })
  },
  methods: {
    editSurvey () {
      wx.navigateTo({
        url: `/pages/surveySubjects/main?id=${this.surveyId}`
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
                wx.navigateBack({
                  delta: 2
                })
              })
          } else {
            console.log('用户点击辅助操作')
          }
        }
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
      console.log('surveyId:' + this.surveyId)
      this.title = option.title
    } else {
      this.surveyId = 'survey-652ea4d0-7dad-11e8-abe8-abb0bd666421'
      this.title = '测测你有多了解我？'
      console.log('error: page receive no survey id!')
    }
    this.$store.dispatch('querySurveyResult', this.surveyId)
    this.$store.dispatch('querySurveyById', this.surveyId)
  },
  mounted () {
  }
}
</script>

<style>
.responsor-list{
  height: 220px;
  border-width:medium;
  border-color:grey;
}

.middle-avatar {
  width: 140rpx!important;
  height: 140rpx!important;
  border-radius: 50%;
}

.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
}

.header-item {
  width: 100%;
  text-align: center;

}

.scroll-view_tab_comtainer {
    width: 100%;
    background-color: #F5F5F5;
    padding: 20rpx 0 0;
    white-space: nowrap;
}

.scroll-view_tab{
  display: inline-block;
}

.page__bd_spacing{
  padding-top  : 20rpx;
  padding-left : 40rpx;
  padding-right: 20rpx;
  border: 1px;
}

.weui-grid{
  height: 80px;
  padding-top  :10px;
}

.weui-grid__title{
  font-size: 24px;
  font-weight: bold;  
  text-align: center;
  color: #666666;
}

.button-sp-area{
    margin: 0 auto;
    padding-top: 15px;
    width: 60%;
}
.mini-btn{
    margin-right: 20px;
}

</style>