<template>
  <view class="page">
    <view class="weui-cells__title">添加</view>
    <view class="weui-cells weui-cells_after-title">
      <navigator url="/pages/surveyProfile/main?action=create" class="weui-cell weui-cell_access" hover-class="weui-cell_active" @click="createBot">
        <view class="weui-cell__hd">
          <i-icon type="add" size="28" />
        </view>
        <view class="weui-cell__bd">创建机器人</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </navigator>
    </view>
    <view class="weui-cells__title">你的机器人</view>
    <view class="weui-cells weui-cells_after-title">
      <block v-for="(survey, i) in surveyList" :key="i">
        <navigator :url="'/pages/surveySubjects/main?id='+survey.id" class="weui-cell weui-cell_access"  hover-class="weui-cell_active">
          <view class="weui-cell__hd">
            <i-icon type="editor"  size="28"/>
          </view>
          <view class="weui-cell__bd weui-media-box weui-media-box_small-appmsg">
            <view class="weui-media-box__bd ">
              <view class="weui-media-box__title">{{survey.title}}</view>
              <view class="weui-media-box__desc">{{survey.created_at}}</view>
            </view>
          </view>
          <view class="weui-cell__ft weui-cell__ft_in-access"></view>
        </navigator>
      </block>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      logs: []
    }
  },

  computed: {
    ...mapState({
      surveyList: state => state.survey.surveyList
    })
  },

  methods: {
    createBot (ev) {
      console.log(ev)
    }
  },

  created () {
    this.$store.dispatch('retrieveSurvey')
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}

.avatar {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  overflow: hidden;
}

</style>
