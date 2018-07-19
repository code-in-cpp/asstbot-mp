<template>
  <movable-area class="move-area title-intro-box">
    <title-bar title=" "/>
      <view class="content-box">
        <text class="content-text">标题</text>
        <input class="content-input" type="text" autofocus="true" focus="true" @blur="editTitle" :value="survey.title">
      </view>
      <view class="content-box">
        <text class="content-text">简介</text>
        <input class="content-input" type="text" @blur="editIntro" :value="survey.intro">
      </view>
    <view class="btn-box">
      <button class="btn-save" @click="saveSurvey">保存</button>
      <!--<view>保存</view>-->
    </view>
    <home-button/>
  </movable-area>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        survey: state => {
          return state.currentSurvey.survey
        }
      })
    },
    methods: {
      editTitle (e) {
        if (e.mp.detail.value) {
          this.$store.commit('updateSurveyTitle', e.mp.detail.value)
        } else {
          wx.showToast({title: '请输入标题'})
        }
      },
      editIntro (e) {
        this.$store.commit('updateSurveyIntro', e.mp.detail.value)
      },
      saveSurvey () {
        if (this.survey.title) {
          this.$store.dispatch('editSurvey', this.survey)
            .then(() => {
              wx.navigateBack()
            })
        }
      }
    }
  }
</script>

<style scoped>
  .title-intro-box{
    display: flex;
    flex-direction: column;
  }
  .content-box{
    display:flex;
    padding:0 30rpx;
    height:80rpx;
    line-height:80rpx;
    background:#fff;
    margin-top: 30rpx;
  }
  .content-text{
    padding:0 20rpx;
    color:#999;
  }
  .content-input{
    height: 100%;
    line-height: 80rpx;
    flex: 1;
  }
  .btn-box{
    padding: 0 30rpx;
    flex:1;
    align-items: flex-end;
    display: flex;
    padding-bottom: 30rpx;
  }
  .btn-save{
    width: 100%;
  }
</style>
