<template>
  <movable-area class="move-area title-intro-box">
    <title-bar title=" "/>
      <view class="content-box">
        <text class="content-text">标题</text>
        <input class="content-input" type="text" autofocus="true" focus="true" maxlength="20" @input="editTitle" :value="title">
      </view>
        <view class="weui-cell weui-cell_input weui-cell_warn" v-if="title==''">
          <view class="weui-cell__bd">
            请输入有效标题
          </view>
          <view class="weui-cell__ft">
              <icon type="warn" size="15" color="#E64340"></icon>
          </view>
        </view>
      <view class="content-box content-box-1">
        <text class="content-text">简介</text>
        <!--<input class="content-input" type="text" @blur="editIntro" :value="intro">-->
        <textarea @input="editIntro" :value="intro" maxlength="100"></textarea>
      </view>
    <view class="btn-box">
      <button :disabled="!title" class="btn-save" type="primary" @click="saveSurvey">保存</button>
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
          return state.curSurvey.survey
        }
      })
    },
    methods: {
      editTitle (e) {
        this.title = e.mp.detail.value
      },
      editIntro (e) {
        console.log('intro:' + e.mp.detail.value)
        this.intro = e.mp.detail.value
      },
      saveSurvey () {
        if (this.title) {
          this.$store.commit('updateCurSurveyTitle', this.title)
          this.$store.commit('updateCurSurveyIntro', this.intro)
          this.$store.dispatch('saveCurSurvey', this.survey)
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
  .content-box-1{
    height: auto;
    line-height: 40rpx;
    padding-top: 20rpx;
  }
  .content-text{
    padding:0 20rpx;
    color:#999;
    width: 80rpx;
    font-size: 32rpx;
  }
  .content-input{
    height: 100%;
    line-height: 80rpx;
    flex: 1;
  }
  .btn-box{
    padding: 0 80rpx;
    flex:1;
    align-items: flex-end;
    display: flex;
    padding-bottom: 40rpx;
  }
  .btn-save{
    width: 100%;
  }
</style>
