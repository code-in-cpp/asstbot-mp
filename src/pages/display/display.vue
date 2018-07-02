<template>
<view class="page">
    <view class="header">
        <view class="header-item">
        <image :src="bodAvatar" class="middle-avatar"/>
        </view>
        <view class="header-item">{{title}}</view>
    </view>
    <view class="page__bd">
        <view class="weui-grids">
            <block v-for="item in grids" :key="item.id">
                <navigator url="" class="weui-grid" hover-class="weui-grid_active">
                    <view class="weui-grid__label">{{item.value}}</view>
                    <view class="weui-grid__label">{{item.desc}}</view>
                </navigator>
            </block>
        </view>
    </view>
    <view class="weui-cells__title">答卷列表</view>
    <view class="weui-cells weui-cells_after-title">
        <navigator v-for="item in surveySummary" :url="'../detail/main?id='+item.id+'&name='+item.name" :key="item" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
                <image :src="bodAvatar" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
            </view>
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft weui-cell__ft_in-access">答对 {{item.score}} 题</view>
        </navigator>
    </view>
    <view class="page__bd page__bd_spacing">
        <button class="weui-btn" open-type="share" type="primary">分享</button>
        <button class="weui-btn" type="default">编辑</button>
        <button class="weui-btn" type="warn">删除</button>

        <!-- <button class="weui-btn mini-btn" type="primary" size="mini">分享</button>
        <button class="weui-btn mini-btn" type="default" size="mini">编辑</button>
        <button class="weui-btn mini-btn" type="warn" size="mini">删除</button> -->
    </view>
</view>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: {
    surveyId: '',
    title: '',
    grids: [ { id: 0, desc: '答题人数', value: 10 }, { id: 0, desc: '答对数目', value: 4 }, { id: 0, desc: '答错数目', value: 6 } ]
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    }),
    ...mapGetters({
      surveySummary: 'surveySummary'
    })
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: this.title,
      path: '/pages/index/main?id=' + this.surveyId,
      imageUrl: this.bodAvatar
    }
  },
  onLoad (option) {
    if (option.id) {
      this.surveyId = option.id
      this.title = option.title
    } else {
      this.surveyId = 'survey-652ea4d0-7dad-11e8-abe8-abb0bd666421'
      this.title = '测测你有多了解我？'
      console.log('error: page receive no survey id!')
    }
  },
  mounted () {
    this.$store.dispatch('querySurveyResult', 'survey-fc1d3800-7b7a-11e8-95df-55eac717ac5a')
    this.$store.dispatch('querySurveyById', 'survey-fc1d3800-7b7a-11e8-95df-55eac717ac5a')
  }
}
</script>

<style>
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

.page__bd_spacing{
  padding-top  : 40px;
  padding-left : 20px;
  padding-right: 20px;
  border: 1px;
}

.button-sp-area{
    margin: 0 auto;
    padding-top: 15px;
    width: 60%;
}
.mini-btn{
    margin-right: 10px;
}
</style>