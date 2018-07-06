<template>
<view class="page">
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
    <view class="weui-cells__title">答卷列表:</view>
    <scroll-view scroll-y="true" class="responsor-list weui-cells content">
        <navigator v-for="item in surveySummary" :url="'../detail/main?id='+item.id+'&name='+item.name+'&score='+item.score+'&avatarUrl=' + item.avatarUrl" :key="item" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
                <image :src="item.avatarUrl" class = "user-avator-icon" ></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft weui-cell__ft_in-access">{{item.score}}</view>
        </navigator>

        <view class="weui-cell" v-for="item in emptySurveyAnswer" :key="item.id">
            <view class="weui-cell__hd">
                <image :src="item.avatarUrl" class = "user-avator-icon" ></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft">{{item.score}}</view>
        </view>
    </scroll-view>

    <view class="button-sp-area">
        <button class="weui-btn btn" type="warn" @click="deleteSurvey" size="mini"> <zan-icon type="close" /> 删除</button>
        <button class="weui-btn btn greybtn" type="default" @click="editSurvey" size="mini"> <zan-icon type="edit" /> 编辑</button>
        <button class="weui-btn btn" open-type="share" type="primary" size="mini"> <i-icon type="share_fill" /> 发布</button>
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
      survey: state => {
        wx.setNavigationBarTitle({title: state.surveyResult.survey.title})
        return state.surveyResult.survey
      }
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
                wx.navigateTo({
                  url: `/pages/home/main`
                })
              })
          } else {
            console.log('用户点击取消操作')
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
.user-avator-icon{
  margin-right: 10rpx;
  vertical-align: middle;
  width:40rpx;
  height: 40rpx;
  border-radius: 50%;
}

.responsor-list{
  height: 400rpx!important;
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

.weui-cells__title{
}


.button-sp-area{
    padding-left: 40rpx;
    padding-bottom: 40rpx;
}


.btn {
  width: 30%;
  margin-right: 20rpx;
  /*background-color: #FFCC00;*/
  /*color: #FFF;*/
}
.greybtn{
  background-color: #e9e9e9;
}


</style>
