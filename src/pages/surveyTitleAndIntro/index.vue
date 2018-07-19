<template>
  <movable-area class="move-area title-intro-box">
    <title-bar title=" "/>
      <view class="content-box">
        <text class="content-text">标题</text>
        <input class="content-input" type="text" autofocus="true" focus="true" @blur="editTitle" :value="title">
      </view>
      <view class="content-box">
        <text class="content-text">简介</text>
        <input class="content-input" type="text" @blur="editIntro" :value="intro">
      </view>
    <view class="btn-box">
      <button :disabled="!title" class="btn-save" @click="saveSurvey">保存</button>
      <!--<view>保存</view>-->
    </view>
    <home-button/>
  </movable-area>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        title: {
          type: String,
          default: ''
        },
        intro: {
          type: String,
          default: ''
        }
      }
    },
    computed: {
      ...mapState({
        survey: state => {
          console.log('survey:' + state.currentSurvey.survey)
          return state.currentSurvey.survey
        }
      })
    },
    methods: {
      editTitle (e) {
        this.title = e.mp.detail.value
      },
      editIntro (e) {
        this.intro = e.mp.detail.value
      },
      saveSurvey () {
        if (this.title) {
          this.$store.commit('updateSurveyTitle', this.title)
          this.$store.commit('updateSurveyIntro', this.intro)
          this.$store.dispatch('editSurvey', this.survey)
            .then(() => {
              wx.navigateBack()
            })
        } else {
          wx.showToast({
            title: '请输入有效标题'
          })
        }
      }
    },
    onShow () {
      this.title = this.survey.title
      this.intro = this.survey.intro
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
