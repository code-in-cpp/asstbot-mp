<template>
<view class="page">
    <view class="header">
        <view class="header-item">
        <image :src="bodAvatar" class="large-avatar"/>
        </view>
        <view class="header-item">
        <text class="title">{{bodName}}</text>
        </view>
    </view>

    <view class="page__bd">
    <view class="weui-cells__title">答题结果</view>
    <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell">
            <view class="weui-cell__bd">我的星座是哪个星座</view>
            <view class="weui-cell__ft">白羊座</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd">我最喜欢吃的是什么</view>
            <view class="weui-cell__ft">肉夹馍, 凉皮</view>
        </view>
    </view>
    </view>

</view>
</template>


<script>
import { mapState } from 'vuex'
export default {

  data: {
    bodName: '王博'
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    })
  },

  onLoad (option) {
    this.bodName = option.name
  }
}
</script>
