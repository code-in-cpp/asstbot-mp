<template>
<view class="page">
    <view class="header">
        <view class="header-item">问卷</view>
        <view class="header-item">谁是最了解你的朋友</view>
    </view>
        <view class="weui-cells__title">完成答卷的好友列表</view>
        <view class="weui-cells weui-cells_after-title">
            <navigator v-for="item in surveySummary" :url="'../detail/main?name='+item.name" :key="item" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <view class="weui-cell__hd">
                    <image :src="bodAvatar" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
                </view>
                <view class="weui-cell__bd">{{item.name}}</view>
                <view class="weui-cell__ft weui-cell__ft_in-access">答对 {{item.score}} 题</view>
            </navigator>
        </view>
</view>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: {
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    }),
    ...mapGetters({
      surveySummary: 'surveySummary'
    })
  },

  mounted () {
    this.$store.dispatch('querySurveyResult', 'survey-fc1d3800-7b7a-11e8-95df-55eac717ac5a')
  }
}
</script>

<style>
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
</style>