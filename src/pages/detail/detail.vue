<template>
<view class="page">
    <view class="header">
        <view class="header-item">
        <image :src="bodAvatar" class="large-avatar"/>
        </view>
        <view class="header-item">
        <text class="title">{{name}}</text>
        </view>
    </view>

    <view class="page__bd">
    <view class="weui-cells__title">答题结果</view>
    <view class="weui-cells weui-cells_after-title">
        <view v-for="item in surveyAnswers" :key="item.id" class="weui-cell">
            <view class="weui-cell__bd">{{item.question}}</view>
            <view class="weui-cell__ft">{{item.value}}</view>
        </view>
    </view>
    </view>

</view>
</template>


<script>
import { mapState } from 'vuex'
export default {
  data: {
    id: '01',
    name: '王博'
  },
  computed: {
    ...mapState({
      bodAvatar: state => state.bodProfile.avatar
    }),
    surveyAnswers () {
      return this.$store.getters.getSurveyAnswer(this.id)
    }
  },

  onLoad (option) {
    console.log(option.id)
    this.id = option.id
    this.name = option.name
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
